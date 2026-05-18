import { Linking } from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import { navigationRef } from '@/navigation/RootNavigator';

export const linking = {
  prefixes: ['pizza://'],
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url !== null) {
      return url;
    }
    return 'pizza://MainStack';
  },
  config: {
    screens: {
      SplashScreen: 'open',
      MainStack: {
        screens: {},
      },
    },
  },
};

export const openLink = (notification: any) => {
  const link = notification?.data?.link;
  Linking.openURL(link);
};

export function openGlobalDrawer() {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  }
}
