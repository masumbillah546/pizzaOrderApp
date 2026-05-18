import {NativeModules, Platform} from 'react-native';

const IS_PRODUCTION_API_BUILD = !__DEV__;
const PRODUCTION_IDENTITY_SERVER_URL =
  'https://identity-service.smarthisab.com/public/index.php/api/v1/';
const LOCAL_IDENTITY_SERVER_PATH =
  '/computerlab/services/identity-service/public/index.php/api/v1/';
const PRODUCTION_TECHNICIAN_SERVER_URL =
  'https://technician-service.smarthisab.com/public/index.php/api/v1/';
const LOCAL_TECHNICIAN_SERVER_PATH =
  '/computerlab/services/technician-service/public/index.php/api/v1/';
const PRODUCTION_TICKET_SERVER_URL =
  'https://ticket-service.smarthisab.com/public/index.php/api/v1/';
const LOCAL_TICKET_SERVER_PATH =
  '/computerlab/services/ticket-service/public/index.php/api/v1/';
const PRODUCTION_MATCHING_SERVER_URL =
  'https://matching-service.smarthisab.com/public/index.php/api/v1/';
const LOCAL_MATCHING_SERVER_PATH =
  '/computerlab/services/matching-service/public/index.php/api/v1/';
const REAL_DEVICE_HOST = '192.168.0.236';

const getDevServerHost = () => {
  const scriptURL = NativeModules?.SourceCode?.scriptURL;
  if (typeof scriptURL !== 'string' || !scriptURL) {
    return '';
  }

  const match = scriptURL.match(/^https?:\/\/([^/:]+)/i);
  return match?.[1] || '';
};

const DEV_SERVER_HOST = __DEV__ ? getDevServerHost() : '';
const DEFAULT_LOCAL_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const LOCAL_HOST = REAL_DEVICE_HOST || DEV_SERVER_HOST || DEFAULT_LOCAL_HOST;

// export const SERVER_URL_IDENTITY = IS_PRODUCTION_API_BUILD
//   ? PRODUCTION_IDENTITY_SERVER_URL
//   : `http://${LOCAL_HOST}${LOCAL_IDENTITY_SERVER_PATH}`;

// export const SERVER_URL_TECHNICIAN = IS_PRODUCTION_API_BUILD
//   ? PRODUCTION_TECHNICIAN_SERVER_URL
//   : `http://${LOCAL_HOST}${LOCAL_TECHNICIAN_SERVER_PATH}`;

// export const SERVER_URL_TICKET = IS_PRODUCTION_API_BUILD
//   ? PRODUCTION_TICKET_SERVER_URL
//   : `http://${LOCAL_HOST}${LOCAL_TICKET_SERVER_PATH}`;

// export const SERVER_URL_MATCHING = IS_PRODUCTION_API_BUILD
//   ? PRODUCTION_MATCHING_SERVER_URL
//   : `http://${LOCAL_HOST}${LOCAL_MATCHING_SERVER_PATH}`;

// export const API_BUILD_TARGET = IS_PRODUCTION_API_BUILD ? 'production' : 'local';

export const SERVER_URL_IDENTITY = PRODUCTION_IDENTITY_SERVER_URL
export const SERVER_URL_TECHNICIAN =  PRODUCTION_TECHNICIAN_SERVER_URL
export const SERVER_URL_TICKET = PRODUCTION_TICKET_SERVER_URL
export const SERVER_URL_MATCHING = PRODUCTION_MATCHING_SERVER_URL
export const API_BUILD_TARGET = 'production'

export const BUNNY_CONFIG = {
  storageZone: "computer-lab-testing",
  region: "de", // Germany
  accessKey: "93afc2b8-8988-46c7-a1f0241a2972-a72a-406d", // ⚠️ keep secret
};
