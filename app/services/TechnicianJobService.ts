import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_TYPES } from '@/constants/app';
import { SERVER_URL_TICKET } from '@/config';
import { API_ROUTES } from '@/constants/rest_api';
import { STORAGE_KEYS } from '@/constants/storage';
import { encodeQuery } from '@/utils/helpers';
import request from '@/utils/request';

type WorkProofUploadInput = {
  uri: string;
  fileCopyUri?: string | null;
  name?: string;
  type?: string;
};

type WorkProofUploadOptions = {
  onProgress?: (progressPercent: number) => void;
  retries?: number;
  ticket_id?: string;
};

export default class TechnicianJobService {
  static baseUrl = SERVER_URL_TICKET;

  static getJobs = async (query?: Record<string, any>) => {
    const queryParam = encodeQuery(query);
    const response = await request(
      this.baseUrl + API_ROUTES.GET_TECHNICIAN_JOBS + queryParam,
      {
        method: FETCH_TYPES.GET,
      },
    );

    return response;
  };

  static getJobDetails = async (ticketId: string) => {
    const response = await request(
      `${this.baseUrl + API_ROUTES.GET_TECHNICIAN_JOBS}/${ticketId}`,
      {
        method: FETCH_TYPES.GET,
      },
    );

    return response;
  };

  static startJob = async (ticketId: string) => {
    const response = await request(
      this.baseUrl +
        API_ROUTES.POST_TECHNICIAN_JOB_START.replace(
          '{{ticket_id}}',
          ticketId,
        ),
      {
        method: FETCH_TYPES.POST,
      },
    );

    return response;
  };

  static completeJob = async (ticketId: string) => {
    const response = await request(
      this.baseUrl +
        API_ROUTES.POST_TECHNICIAN_JOB_COMPLETE.replace(
          '{{ticket_id}}',
          ticketId,
        ),
      {
        method: FETCH_TYPES.POST,
        body: {},
      },
    );

    return response;
  };

  static completeJobWithSettlement = async (
    ticketId: string,
    body: {
      customer_payable_amount?: number;
      currency?: string;
      warranty_duration_days?: number;
      attachments?: Array<{
        media_upload_id?: string;
        file_url?: string;
        file_type?: 'image' | 'video';
      }>;
    },
  ) => {
    const response = await request(
      this.baseUrl +
        API_ROUTES.POST_TECHNICIAN_JOB_COMPLETE.replace(
          '{{ticket_id}}',
          ticketId,
        ),
      {
        method: FETCH_TYPES.POST,
        body,
      },
    );

    return response;
  };

  static getEarnings = async (query?: Record<string, any>) => {
    const queryParam = encodeQuery(query);
    const response = await request(
      this.baseUrl + API_ROUTES.GET_TECHNICIAN_JOB_EARNINGS + queryParam,
      {
        method: FETCH_TYPES.GET,
      },
    );

    return response;
  };

  static async uploadWorkProofMedia(
    file: WorkProofUploadInput,
    options: WorkProofUploadOptions = {},
  ) {
    const formData = new FormData();
    formData.append('file', normalizeUploadFile(file) as any);
    formData.append('scope', 'work_proof');

    if (options.ticket_id) {
      formData.append('ticket_id', options.ticket_id);
    }

    return uploadMultipartWithProgress(
      this.baseUrl + API_ROUTES.POST_TICKET_MEDIA_UPLOAD,
      formData,
      options,
    );
  }
}

function normalizeUploadFile(file: WorkProofUploadInput) {
  const fileUri =
    typeof file?.fileCopyUri === 'string' && file.fileCopyUri.trim()
      ? file.fileCopyUri.trim()
      : file?.uri?.trim();

  if (!fileUri) {
    throw new Error('Attachment file URI is missing.');
  }

  return {
    uri: fileUri,
    name: (file?.name || 'work-proof').trim(),
    type: (file?.type || 'application/octet-stream').trim(),
  };
}

async function uploadMultipartWithProgress(
  url: string,
  formData: FormData,
  options: WorkProofUploadOptions,
): Promise<any> {
  const maxAttempts = Math.max(1, (options.retries ?? 1) + 1);
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await sendUploadRequest(url, formData, options.onProgress);
    } catch (error) {
      lastError = error;
      if (attempt >= maxAttempts) {
        throw error;
      }
    }
  }

  throw lastError;
}

async function sendUploadRequest(
  url: string,
  formData: FormData,
  onProgress?: (progressPercent: number) => void,
): Promise<any> {
  const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  const accessToken = JSON.parse(storedToken || '{}')?.access_token || null;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Accept', 'application/json');

    if (accessToken) {
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    }

    xhr.upload.onprogress = event => {
      if (!onProgress || !event.lengthComputable) {
        return;
      }

      onProgress(Math.min(100, Math.round((event.loaded / event.total) * 100)));
    };

    xhr.onerror = () => reject(new Error('Upload failed. Please try again.'));
    xhr.ontimeout = () =>
      reject(new Error('Upload timed out. Please try again.'));
    xhr.timeout = 120000;

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      const rawResponse = xhr.responseText || '';
      let parsedResponse: any = null;

      if (rawResponse) {
        try {
          parsedResponse = JSON.parse(rawResponse);
        } catch {
          parsedResponse = null;
        }
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(100);
        resolve(parsedResponse);
        return;
      }

      const message =
        parsedResponse?.message ||
        (xhr.status >= 500 ? 'Server error.' : 'Upload failed.');
      reject(new Error(message));
    };

    xhr.send(formData);
  });
}
