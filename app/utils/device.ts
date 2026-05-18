import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {STORAGE_KEYS} from '@/constants/storage';

const createDeviceId = (): string => {
  const ts = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 12);
  return `${Platform.OS}-${ts}-${random}`;
};

export const getOrCreateDeviceUniqueId = async (): Promise<string> => {
  const stored = await AsyncStorage.getItem(STORAGE_KEYS.DEVICE_UNIQUE_ID);
  if (stored) {
    return stored;
  }

  const generated = createDeviceId();
  await AsyncStorage.setItem(STORAGE_KEYS.DEVICE_UNIQUE_ID, generated);
  return generated;
};

export const getStoredUserDeviceId = async (): Promise<string | null> => {
  return AsyncStorage.getItem(STORAGE_KEYS.USER_DEVICE_ID);
};

export const setStoredUserDeviceId = async (
  userDeviceId?: string | null,
): Promise<void> => {
  if (userDeviceId) {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DEVICE_ID, userDeviceId);
    return;
  }

  await AsyncStorage.removeItem(STORAGE_KEYS.USER_DEVICE_ID);
};

export const getStoredDeviceRegistrationFingerprint = async (): Promise<
  string | null
> => {
  return AsyncStorage.getItem(STORAGE_KEYS.DEVICE_REGISTRATION_FINGERPRINT);
};

export const setStoredDeviceRegistrationFingerprint = async (
  fingerprint?: string | null,
): Promise<void> => {
  if (fingerprint) {
    await AsyncStorage.setItem(
      STORAGE_KEYS.DEVICE_REGISTRATION_FINGERPRINT,
      fingerprint,
    );
    return;
  }

  await AsyncStorage.removeItem(STORAGE_KEYS.DEVICE_REGISTRATION_FINGERPRINT);
};

export const getPushToken = async (): Promise<string | null> => {
  return AsyncStorage.getItem(STORAGE_KEYS.FCM_TOKEN);
};

export const setPushToken = async (
  pushToken?: string | null,
): Promise<void> => {
  const normalized = typeof pushToken === 'string' ? pushToken.trim() : '';
  if (normalized) {
    await AsyncStorage.setItem(STORAGE_KEYS.FCM_TOKEN, normalized);
    return;
  }

  await AsyncStorage.removeItem(STORAGE_KEYS.FCM_TOKEN);
};

export const buildDeviceRegistrationPayload = async () => {
  const platform = Platform.OS === 'ios' ? 'ios' : 'android';
  const constants = (Platform as any).constants || {};
  const model = constants.Model || null;
  const manufacturer = constants.Brand || constants.Manufacturer || null;
  const osVersion = `${Platform.Version}`;
  const deviceUniqueId = await getOrCreateDeviceUniqueId();
  const pushToken = await getPushToken();

  return {
    device_unique_id: deviceUniqueId,
    platform,
    device_model: model,
    device_manufacturer: manufacturer,
    os_version: osVersion,
    app_version: '1.0.0',
    push_provider: pushToken ? 'fcm' : undefined,
    push_token: pushToken || undefined,
    push_environment: pushToken ? (__DEV__ ? 'sandbox' : 'production') : undefined,
  };
};

export const createDeviceRegistrationFingerprint = (
  payload: Record<string, any>,
) => {
  return JSON.stringify({
    device_unique_id: payload?.device_unique_id || '',
    platform: payload?.platform || '',
    app_version: payload?.app_version || '',
    push_provider: payload?.push_provider || '',
    push_token: payload?.push_token || '',
    push_environment: payload?.push_environment || '',
  });
};
