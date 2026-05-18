import { SERVER_URL_IDENTITY } from '@/config';
import request from '../utils/request';
import { FETCH_TYPES } from '@/constants/app';
import { API_ROUTES } from '@/constants/rest_api';
import {
  buildDeviceRegistrationPayload,
  createDeviceRegistrationFingerprint,
  getStoredDeviceRegistrationFingerprint,
  getStoredUserDeviceId,
  setStoredDeviceRegistrationFingerprint,
  setStoredUserDeviceId,
} from '@/utils/device';

export default class AuthService {
  static baseUrl = SERVER_URL_IDENTITY;

  static async login(body: any) {
    const token = false;
    const option = {
      method: FETCH_TYPES.POST,
      body: body,
    };
    const response = await request(
      this.baseUrl + API_ROUTES.LOGIN,
      option,
      token,
    );
    return response;
  }

  static async register(body: any) {
    const token = false;
    const option = {
      method: FETCH_TYPES.POST,
      body: body,
    };
    const response = await request(
      this.baseUrl + API_ROUTES.REGISTER_EMAIL,
      option,
      token,
    );
    return response;
  }

  static logout = async () => {
    const userDeviceId = await getStoredUserDeviceId();
    const option = {
      method: FETCH_TYPES.POST,
      body: userDeviceId ? {user_device_id: userDeviceId} : undefined,
    };
    const response = await request(this.baseUrl + API_ROUTES.LOGOUT, option);
    return response;
  };

  static forgot_password_request = async (body: any) => {
    const option = {
      method: FETCH_TYPES.POST,
      body: body,
    };
    const response = await request(
      this.baseUrl + API_ROUTES.FORGOT_PASSWORD,
      option,
      false,
    );
    return response;
  };

  static setPassword = async (body: any) => {
    const option = {
      method: FETCH_TYPES.POST,
      body: body,
    };
    const response = await request(
      this.baseUrl + API_ROUTES.SET_PASSWORD,
      option,
    );
    return response;
  };

  static resetPassword = async (body: any) => {
    const option = {
      method: FETCH_TYPES.POST,
      body: body,
    };
    const response = await request(
      this.baseUrl + API_ROUTES.RESET_PASSWORD,
      option,
    );
    return response;
  };

  // static sendOTP = async (body: any) => {
  //   const option = {
  //     method: FETCH_TYPES.POST,
  //     body: body,
  //   };
  //   const response = await request(this.baseUrl + API_ROUTES.SEND_OTP, option);
  //   return response;
  // };

  static otp_verification = async (body: any) => {
    const option = {
      method: FETCH_TYPES.POST,
      body: body,
    };
    const response = await request(
      this.baseUrl + API_ROUTES.VERIFY_OTP,
      option,
    );
    return response;
  };

  static request_otp = async (body: any) => {
    const option = {
      method: FETCH_TYPES.POST,
      body: body,
    };
    const response = await request(
      this.baseUrl + API_ROUTES.REQUEST_OTP,
      option,
    );
    return response;
  };

  static apply_referral = async (body: any) => {
    const option = {
      method: FETCH_TYPES.POST,
      body: body,
    };
    const response = await request(
      this.baseUrl + API_ROUTES.APPLY_REFERRAL,
      option,
    );
    return response;
  };

  static getReferralStatus = async () => {
    const option = {
      method: FETCH_TYPES.GET,
    };
    return request(this.baseUrl + API_ROUTES.REFERRAL_STATUS, option);
  };

  static getMyReferralCode = async () => {
    const option = {
      method: FETCH_TYPES.GET,
    };
    return request(this.baseUrl + API_ROUTES.REFERRAL_MY_CODE, option);
  };

  static applyReferral = async (body: any) => {
    return this.apply_referral(body);
  };

  static registerDevice = async (body: any) => {
    const option = {
      method: FETCH_TYPES.POST,
      body,
    };

    return request(this.baseUrl + API_ROUTES.DEVICE_REGISTER, option);
  };

  static async registerCurrentDevice() {
    const body = await buildDeviceRegistrationPayload();
    const fingerprint = createDeviceRegistrationFingerprint(body);
    const storedFingerprint = await getStoredDeviceRegistrationFingerprint();

    if (storedFingerprint === fingerprint) {
      return {
        success: true,
        skipped: true,
        data: {
          user_device_id: await getStoredUserDeviceId(),
        },
      };
    }

    const response = await this.registerDevice(body);
    const userDeviceId = response?.data?.user_device_id;

    if (userDeviceId) {
      await setStoredUserDeviceId(userDeviceId);
    }

    if (response?.success) {
      await setStoredDeviceRegistrationFingerprint(fingerprint);
    }

    return response;
  }

  static async syncCurrentDeviceRegistration() {
    return this.registerCurrentDevice();
  }
}
