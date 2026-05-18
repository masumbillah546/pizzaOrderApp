export const API_ROUTES = {

  // Authentication
  LOGIN: 'auth/login/password',
  REGISTER_EMAIL: 'auth/register/email',
  VERIFY_OTP: 'auth/otp/verify',
  REQUEST_OTP: 'auth/otp/request',
  TOKEN_REFRESH: 'auth/token/refresh',
  REFERRAL_MY_CODE: 'auth/referrals/my-code',
  REFERRAL_STATUS: 'auth/referrals/status',
  APPLY_REFERRAL: 'auth/referrals/apply',
  SET_PASSWORD: 'auth/password/set',
  FORGOT_PASSWORD: 'auth/password/forgot/request',
  RESET_PASSWORD: 'auth/password/forgot/reset',
  LOGOUT: 'auth/logout',
  DEVICE_REGISTER: 'devices/register',
  GET_USER_NOTIFICATIONS: 'auth/notifications',
  GET_USER_NOTIFICATION_DETAIL: 'auth/notifications/{{notification_id}}',
  POST_USER_NOTIFICATION_READ: 'auth/notifications/{{notification_id}}/read',

  // // notification
  // GET_NOTIFICATIONS: 'get_all_notifications',
  // DELETE_NOTIFICATION: 'delete_notification',
  // SEEN_NOTIFICATION: 'seen-notification',

};
