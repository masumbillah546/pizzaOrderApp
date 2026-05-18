export const STORAGE_KEYS = {
  APP_INITIALIZED: 'AppInitialized',
  AUTH_TOKEN: 'authToken',
  APP_DATA: 'appData',
  USER_DATA: 'userData',
  USER_DEVICE_ID: 'userDeviceId',
  DEVICE_REGISTRATION_FINGERPRINT: 'deviceRegistrationFingerprint',
  DEVICE_UNIQUE_ID: 'deviceUniqueId',
  FCM_TOKEN: 'fcmToken',
  AVAILABILITY_STATUS: 'availability_status',
} as const;

export const AUTH_STORAGE_KEYS = [
  STORAGE_KEYS.AUTH_TOKEN,
  STORAGE_KEYS.APP_DATA,
  STORAGE_KEYS.USER_DATA,
  STORAGE_KEYS.USER_DEVICE_ID,
  STORAGE_KEYS.DEVICE_REGISTRATION_FINGERPRINT,
] as const;
