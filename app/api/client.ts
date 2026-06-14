export type ApiConfig = {
  apiBaseUrl: string;
  token?: string | null;
};

export class ApiError extends Error {
  status: number;

  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

export function normalizeApiBaseUrl(url: string): string {
  const trimmed = url.trim().replace(/\/+$/, '');
  if (!trimmed) {
    return '';
  }

  if (/\/api\/v\d+$/i.test(trimmed)) {
    return trimmed;
  }

  if (/\/api$/i.test(trimmed)) {
    return `${trimmed}/v1`;
  }

  return `${trimmed}/api/v1`;
}

export async function apiRequest<T>(
  config: ApiConfig,
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const baseUrl = normalizeApiBaseUrl(config.apiBaseUrl);
  if (!baseUrl) {
    throw new Error('Set an API base URL before calling the backend.');
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as unknown) : null;

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String((payload as { message?: unknown }).message ?? 'Request failed.')
        : 'Request failed.';

    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}
