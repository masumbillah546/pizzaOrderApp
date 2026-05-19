import React, { useState } from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//
import {
  InputField,
  Logo,
  AppText,
  ScreenContainer,
  ButtonLarge,
} from '@/components';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { BorderRadius, COLORS, FontSizes, Spacing } from '@/constants/theme';
import AuthService from '@/services/AuthService';
import { handleFormErrors } from '@/utils/helpers';

import BG_Image from '@/assets/images/splash.png';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().required('Please enter email address.'),
        password: yup.string().required('Please enter password.'),
      }),
    ),
  });

  const handleLogin = async (values: any) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const loginRes = await AuthService.login({
        ...values,
        session_type: 'mobile_app',
        app_type: 'technician',
      });

      if (!loginRes?.success) {
        throw loginRes;
      }
    } catch (e: any) {
      const response = await e?.response?.json();

      if (response?.errors) {
        handleFormErrors(response.errors, setError);
      } else {
        // showFailedAlert();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={BG_Image}
      style={{ flex: 1, backgroundColor: COLORS.white }}
      resizeMode="cover"
    >
      <ScreenContainer contentStyle={styles.container} title="LOGIN NOW">
        <Logo style={styles.logoContainer} size={180} />
        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                onChangeText={onChange}
                // label={'Email/Phone'}
                placeholder="Enter Email/Phone"
                value={value}
                keyboardType="email-address"
                error={errors.email?.message}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                onChangeText={onChange}
                // label={'Password'}
                placeholder="Enter Password"
                value={value}
                error={errors.password?.message}
                isPassword
              />
            )}
            name="password"
          />
        </View>

        <View style={styles.btnsContainer}>
          <ButtonLarge
            variant="warning"
            style={styles.btn}
            title={'Login'}
            onPress={handleSubmit(handleLogin)}
          />

          <AppText style={styles.orText}>Or</AppText>
          <ButtonLarge
            style={styles.btn}
            title={'Register'}
            onPress={() => navigation.navigate('RegisterScreen')}
          />
        </View>
      </ScreenContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    gap: verticalScale(30),
  },
  logoContainer: {
    marginVertical: verticalScale(15),
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: scale(30),
    gap: verticalScale(15),
  },

  btnsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    // height: moderateScale(46),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  orText: {
    textAlign: 'center',
    verticalAlign: 'middle',
    marginBottom: verticalScale(10),
    color: COLORS.white,
    backgroundColor: '#444444',
    height: moderateScale(30),
    width: moderateScale(30),
    lineHeight: moderateScale(30),
    borderRadius: BorderRadius.full,
  },
});
