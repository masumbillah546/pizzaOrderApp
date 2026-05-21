import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SplashScreen } from '@/screens';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { COLORS } from '@/constants/theme';

enableScreens(true);

const Stack = createNativeStackNavigator();
export const navigationRef = React.createRef<any>();

export default function RootNavigator() {
  const [bootstrapped, setBootstrapped] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your real auth check state

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.transparent} translucent />
      <NavigationContainer ref={navigationRef} onReady={() => {}}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            initialParams={{ isLoading: true }}
          />
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Main" component={MainStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
