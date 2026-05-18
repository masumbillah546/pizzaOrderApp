import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_TYPES } from '@/constants/app';
import { encodeQuery } from '../utils/helpers';
import request from '../utils/request';
import { API_ROUTES } from '@/constants/rest_api';
import { SERVER_URL_TECHNICIAN } from '@/config';
import { STORAGE_KEYS } from '@/constants/storage';

type TechnicianMediaUploadInput = {
  uri: string;
  fileCopyUri?: string | null;
  name?: string;
  type?: string;
};

type TechnicianMediaUploadOptions = {
  onProgress?: (progressPercent: number) => void;
  retries?: number;
};

export default class TechnicianService {
  static baseUrl = SERVER_URL_TECHNICIAN;

  static getDevices = async (query?: string) => {
    const queryParam = encodeQuery(query);
    const response = await request(
      this.baseUrl + API_ROUTES.GET_DEVICE_CATEGORIES + queryParam,
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static getServices = async (query?: string) => {
    const queryParam = encodeQuery(query);
    const response = await request(
      this.baseUrl + API_ROUTES.GET_SERVICE_CATEGORIES + queryParam,
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static getRegions = async (query?: any) => {
    const queryParam = encodeQuery(query);
    const response = await request(
      this.baseUrl + API_ROUTES.GET_REGIONS + queryParam,
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static getCities = async (query?: any) => {
    const queryParam = encodeQuery(query);
    const response = await request(
      this.baseUrl + API_ROUTES.GET_CITIES + queryParam,
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static async putBusinessType(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.PUT_TECHNICIAN_BUSINESS_TYPE,
      {
        method: FETCH_TYPES.PUT,
        body,
      },
    );
    return response;
  }

  static async putSkills(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.PUT_TECHNICIAN_SKILL,
      {
        method: FETCH_TYPES.PUT,
        body,
      },
    );
    return response;
  }

  static async putArea(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.PUT_TECHNICIAN_AREA,
      {
        method: FETCH_TYPES.PUT,
        body,
      },
    );
    return response;
  }

  static getOnboardingState = async (query?: string) => {
    const queryParam = encodeQuery(query);
    const response = await request(
      this.baseUrl + API_ROUTES.GET_TECHNICIAN_STATE + queryParam,
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static getOnboardingTerms = async (query?: any) => {
    const queryParam = encodeQuery(query);
    const response = await request(
      this.baseUrl + API_ROUTES.GET_ONBOARDING_TERMS + queryParam,
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static async postOnboardTerms(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.POST_ONBOARDING_TERMS,
      {
        method: FETCH_TYPES.POST,
        body,
      },
    );
    return response;
  }

  static async postOnboardSubmit(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.POST_TECHNICIAN_SUBMIT,
      {
        method: FETCH_TYPES.POST,
        body,
      },
    );
    return response;
  }

  static async postDocuments(body: any) {
    const response = await request(
      this.baseUrl +
        API_ROUTES.POST_PROFESSIONAL_DOCUMENTS.replace(
          '{{professional_entity_id}}',
          body.professional_entity_id,
        ),
      {
        method: FETCH_TYPES.POST,
        body,
      },
    );
    return response;
  }


  static async putProfile(body: any) {
    // const formData = new FormData();
    // if (password) {
    //   formData.append('password', password);
    // }
    // if (photo) {
    //   formData.append('photo', {
    //     uri: photo,
    //     name: 'profile_picture.jpg',
    //     type: 'image/jpeg',
    //   });
    // }

    const option = {
      method: FETCH_TYPES.PUT,
      body,
    };

    const response = await request(
      this.baseUrl + API_ROUTES.PUT_TECHNICIAN_TYPE,
      option,
    );
    return response;
  }

  static async uploadMedia(
    file: TechnicianMediaUploadInput,
    body: {
      scope: 'technician_document' | 'technician_profile_photo' | 'technician_shop_logo';
      technician_profile_id?: string;
      professional_entity_id?: string;
      document_type_code?: string;
    },
    options: TechnicianMediaUploadOptions = {},
  ) {
    const formData = new FormData();
    formData.append('file', normalizeUploadFile(file) as any);
    formData.append('scope', body.scope);

    if (body.technician_profile_id) {
      formData.append('technician_profile_id', body.technician_profile_id);
    }

    if (body.professional_entity_id) {
      formData.append('professional_entity_id', body.professional_entity_id);
    }

    if (body.document_type_code) {
      formData.append('document_type_code', body.document_type_code);
    }

    return uploadMultipartWithProgress(
      this.baseUrl + API_ROUTES.POST_TECHNICIAN_MEDIA_UPLOAD,
      formData,
      options,
    );
  }
}

function normalizeUploadFile(file: TechnicianMediaUploadInput) {
  const fileUri =
    typeof file?.fileCopyUri === 'string' && file.fileCopyUri.trim()
      ? file.fileCopyUri.trim()
      : file?.uri?.trim();

  if (!fileUri) {
    throw new Error('Attachment file URI is missing.');
  }

  return {
    uri: fileUri,
    name: (file?.name || 'upload').trim(),
    type: (file?.type || 'application/octet-stream').trim(),
  };
}

async function uploadMultipartWithProgress(
  url: string,
  formData: FormData,
  options: TechnicianMediaUploadOptions,
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
