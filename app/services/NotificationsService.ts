import {SERVER_URL_USER} from '../config';
import request from '../utils/request';
import {API_ROUTES} from '@/constants/rest_api';

export default class NotificationsService {
  static async getNotifications(params: any) {
    const response = await request(
      SERVER_URL_USER + API_ROUTES.GET_NOTIFICATIONS,
      {
        method: 'POST',
        body: params,
      },
    );
    return response;
  }

  static async delete_notification(params: any) {
    const response = await request(
      SERVER_URL_USER + API_ROUTES.DELETE_NOTIFICATION,
      {
        method: 'POST',
        body: params,
      },
    );
    return response;
  }

  static async sendNotificationSeenUpdate(notification_id: number | string) {
    const response = await request(
      SERVER_URL_USER + API_ROUTES.SEEN_NOTIFICATION,
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
