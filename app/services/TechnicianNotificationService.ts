import {SERVER_URL_IDENTITY} from '@/config';
import request from '@/utils/request';
import {FETCH_TYPES} from '@/constants/app';
import {API_ROUTES} from '@/constants/rest_api';

const withNotificationId = (template: string, notificationId: string) =>
  template.replace('{{notification_id}}', notificationId);

export default class TechnicianNotificationService {
  static baseUrl = SERVER_URL_IDENTITY;

  static async getNotifications(params?: {
    limit?: number;
    include_archived?: boolean;
  }) {
    const searchParams = new URLSearchParams();

    if (typeof params?.limit === 'number') {
      searchParams.set('limit', `${params.limit}`);
    }

    if (typeof params?.include_archived === 'boolean') {
      searchParams.set(
        'include_archived',
        params.include_archived ? '1' : '0',
      );
    }

    const queryString = searchParams.toString();

    return request(
      `${this.baseUrl}${API_ROUTES.GET_USER_NOTIFICATIONS}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        method: FETCH_TYPES.GET,
      },
    );
  }

  static async getNotification(notificationId: string) {
    return request(
      `${this.baseUrl}${withNotificationId(
        API_ROUTES.GET_USER_NOTIFICATION_DETAIL,
        notificationId,
      )}`,
      {
        method: FETCH_TYPES.GET,
      },
    );
  }

  static async markNotificationRead(notificationId: string) {
    return request(
      `${this.baseUrl}${withNotificationId(
        API_ROUTES.POST_USER_NOTIFICATION_READ,
        notificationId,
      )}`,
      {
        method: FETCH_TYPES.POST,
      },
    );
  }
}
