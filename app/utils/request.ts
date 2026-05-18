import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { codeMessage } from '@/constants/app';
import { CommonActions } from '@react-navigation/native';
import { API_ROUTES } from '@/constants/rest_api';
import { SERVER_URL_IDENTITY } from '@/config';
import { showFailedAlert } from '../context/AlertContext';
import { navigationRef } from '../navigation/RootNavigator';
import { ApiError, ApiResponse } from '@/types';
import { STORAGE_KEYS, AUTH_STORAGE_KEYS } from '@/constants/storage';

// 4. Type-safe status checker
function checkStatus(response: ApiResponse): ApiResponse {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const errorText =
    codeMessage[response.status] || response.message || 'Unknown error';
  const error: ApiError = new Error(errorText);
  error.name = response.status.toString();
  error.response = response;
  throw error;
}

let activeRefreshPromise: Promise<string | null> | null = null;

const clearAuthSession = async (): Promise<void> => {
  await AsyncStorage.multiRemove([
    ...AUTH_STORAGE_KEYS,
    STORAGE_KEYS.AVAILABILITY_STATUS,
  ]);
};

const redirectToAuth = async (): Promise<void> => {
  await clearAuthSession();
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    }),
  );
};

const refreshAccessToken = async (): Promise<string | null> => {
  if (activeRefreshPromise) {
    return activeRefreshPromise;
  }

  activeRefreshPromise = (async () => {
    try {
      const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const parsedToken = JSON.parse(storedToken || '{}');
      const refreshToken = parsedToken?.refresh_token;

      if (!refreshToken) {
        return null;
      }

      const response = await fetch(
        `${SERVER_URL_IDENTITY}${API_ROUTES.TOKEN_REFRESH}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        },
      );

      const payload = await response.json().catch(() => null);
      const tokens = payload?.data?.tokens;

      if (!response.ok || !payload?.success || !tokens?.access_token) {
        return null;
      }

      const nextTokens = {
        ...parsedToken,
        ...tokens,
      };

      await AsyncStorage.setItem(
        STORAGE_KEYS.AUTH_TOKEN,
        JSON.stringify(nextTokens),
      );
      return nextTokens.access_token;
    } catch {
      return null;
    } finally {
      activeRefreshPromise = null;
    }
  })();

  return activeRefreshPromise;
};

// 5. Main request wrapper function
export default async function request<T = any>(
  url: string,
  options: RequestInit,
  isToken = true,
  isFormData = false,
): Promise<T | undefined> {
  if (!isFormData) {
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...options.headers,
    };
    if (options.body && typeof options.body !== 'string') {
      options.body = JSON.stringify(options.body);
    }
  }

  const executeRequest = async (authToken?: string | null) => {
    const headers: Record<string, string> = {
      ...((options.headers || {}) as Record<string, string>),
    };

    if (isToken && authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  try {
    let storedToken: string | null = null;
    if (isToken) {
      const storedTokenRaw = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      storedToken = JSON.parse(storedTokenRaw || '{}')?.access_token || null;
    }

    let response = await executeRequest(storedToken);

    if (
      response.status === 401 &&
      isToken &&
      !url.includes(API_ROUTES.TOKEN_REFRESH)
    ) {
      const refreshedToken = await refreshAccessToken();

      if (refreshedToken) {
        response = await executeRequest(refreshedToken);
      } else {
        await redirectToAuth();
        showFailedAlert({ title: 'Session Expired' });
        return;
      }
    }

    checkStatus(response);
    return await response.json();
  } catch (error) {
    const apiError = error as ApiError;
    const status = parseInt(apiError.name, 10);

    if (status === 401) {
      await redirectToAuth();
      showFailedAlert({ title: 'Session Expired' });
    } else {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        showFailedAlert({ title: 'Internet' });
      } else {
        // if (status === 422) {}
        // showFailedAlert();
        throw apiError;
      }
    }
  }
}
