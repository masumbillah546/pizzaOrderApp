import {DEFAULT_API_BASE_URL} from '../config/env';
import request from '../utils/request';
import {API_ROUTES} from '@/constants/rest_api';

export default class NotificationsService {
  static async getNotifications(params: any) {
    const response = await request(
      DEFAULT_API_BASE_URL + API_ROUTES.GET_NOTIFICATIONS,
      {
        method: 'POST',
        body: params,
      },
    );
    return response;
  }

  static async delete_notification(params: any) {
    const response = await request(
      DEFAULT_API_BASE_URL + API_ROUTES.DELETE_NOTIFICATION,
      {
        method: 'POST',
        body: params,
      },
    );
    return response;
  }

  static async sendNotificationSeenUpdate(notification_id: number | string) {
    const response = await request(
      DEFAULT_API_BASE_URL + API_ROUTES.SEEN_NOTIFICATION,
      {
        method: 'POST',
        body: {
          notification_id,
        } as any,
      },
    );
    return response;
  }
}
