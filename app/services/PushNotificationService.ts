import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {setPushToken} from '@/utils/device';

const IOS_ALLOWED_AUTH_STATUSES = new Set([
  messaging.AuthorizationStatus.AUTHORIZED,
  messaging.AuthorizationStatus.PROVISIONAL,
]);

export default class PushNotificationService {
  static async prepareMessaging(): Promise<void> {
    await messaging().registerDeviceForRemoteMessages();
    await messaging().setAutoInitEnabled(true);
  }

  static async syncCurrentPushToken(): Promise<string | null> {
    try {
      await this.prepareMessaging();

      if (Platform.OS === 'ios') {
        const status = await messaging().requestPermission();
        const enabled = IOS_ALLOWED_AUTH_STATUSES.has(status);

        if (!enabled) {
          await setPushToken(null);
          return null;
        }
      }

      const token = (await messaging().getToken())?.trim() || null;
      await setPushToken(token);
      return token;
    } catch (error) {
      console.warn('[push] token sync failed', error);
      return null;
    }
  }

  static subscribeToTokenRefresh(
    listener?: (token: string | null) => Promise<void> | void,
  ): () => void {
    return messaging().onTokenRefresh(token => {
      (async () => {
        const normalized = token?.trim() || null;
        await setPushToken(normalized);
        await listener?.(normalized);
      })().catch(error => {
        console.warn('[push] token refresh failed', error);
      });
    });
  }
}
