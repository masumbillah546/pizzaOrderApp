import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import {
  LoginScreen,
  VerifyScreen,
  VerifyCodeScreen,
  IntroScreen,
  RegisterScreen,
} from '@/screens/auth';
import { COLORS, FontSizes } from '@/constants/theme';
import { verticalScale } from '@/utils/ScreenSize';
import NavigationHeader from '@/components/NavigationHeader';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PasswordScreen } from '@/screens';

const Stack = createNativeStackNavigator();

export const screenOptionsAuth = ({
  navigation,
}: {
  navigation: any;
}): any => ({
  headerShown: true,
  headerTintColor: COLORS.black,
  // underlayColor: COLORS.white,
  headerStyle: {
    backgroundColor: COLORS.white,
    elevation: 0,
    shadowOpacity: 0,
    height: verticalScale(45),
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: COLORS.neutral[700],
    alignItems: 'center',
    fontSize: FontSizes.sm_header,
    fontWeight: '500',
  },
  header: (props: any) => <NavigationHeader {...props} />,
});

export const languageSheetRefAuth = React.createRef<any>();

export default function AuthStack() {
  const SAI = useSafeAreaInsets();

  // useEffect(() => {
  //   if (SAI.top === 0) {
  //     StatusBar.setBarStyle('dark-content');
  //     StatusBar.setBackgroundColor(COLORS.white);
  //   } else {
  //     StatusBar.setBarStyle('light-content');
  //     StatusBar.setBackgroundColor(COLORS.theme);
  //   }
  // }, [SAI.top]);

  return (
    <Stack.Navigator
      // initialRouteName="LoginScreen"
      screenOptions={screenOptionsAuth}
    >
      {/* <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyCode"
        component={VerifyCodeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Verify"
        component={VerifyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}
