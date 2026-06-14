import { Platform } from 'react-native';

const IS_REAL_DEVICE = true; // set to false when using emulator
// Update this LAN host whenever your development machine's Wi-Fi IP changes.
// const LOCAL_NETWORK_HOST = 'http://192.168.0.236:8000';
export const TESTING_API_HOST = 'https://columbiaapis.godlyface.com';
export const PRODUCTION_API_HOST = 'https://apicolumbia.codeandapp.com';
const LOCAL_NETWORK_HOST = PRODUCTION_API_HOST;

const DEFAULT_HOST = Platform.select({
  android: IS_REAL_DEVICE ? LOCAL_NETWORK_HOST : 'http://10.0.2.2:8000',
  ios: IS_REAL_DEVICE ? LOCAL_NETWORK_HOST : 'http://127.0.0.1:8000',
  default: LOCAL_NETWORK_HOST,
});

export const DEFAULT_API_BASE_URL = `${DEFAULT_HOST}/api/v1`;
export const TESTING_API_BASE_URL = `${TESTING_API_HOST}/api/v1`;
export const PRODUCTION_API_BASE_URL = `${PRODUCTION_API_HOST}/api/v1`;
export const MOBILE_APP_SCHEME = 'nypdcolumbia';
export const APP_VERSION = '0.0.1';
