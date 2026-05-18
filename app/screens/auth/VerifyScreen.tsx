import React, { useState } from 'react';
import { StyleSheet, Keyboard, View, TouchableOpacity } from 'react-native';
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
import PhoneCallIcon from '@/assets/icons/phone-call.svg';

export default function VerifyScreen({ navigation }: { navigation: any }) {
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
    <ScreenContainer contentStyle={styles.container} title="REGISTER NOW">
      <View style={styles.logoContainer}>
        <View style={styles.circle1}>
          <View style={styles.circle2}>
            <PhoneCallIcon width={moderateScale(50)} height={moderateScale(50)} />
          </View>
        </View>
        <AppText style={styles.title}>Verify your phone number</AppText>
      </View>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              onChangeText={onChange}
              // label={'Email/Phone'}
              placeholder="Country Code"
              value={value}
              keyboardType="phone-pad"
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
              placeholder="Phone Number"
              value={value}
              keyboardType="phone-pad"
              error={errors.password?.message}
            />
          )}
          name="password"
        />
        <View style={styles.btnsContainer}>
          <ButtonLarge
            style={styles.btn}
            title={'Next'}
            onPress={() => navigation.navigate('VerifyCode')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 0,
    // gap: verticalScale(30),
  },
  logoContainer: {
    height: '45%',
    gap: verticalScale(15),
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle1: {
    height: moderateScale(150),
    width: moderateScale(150),
    borderRadius: moderateScale(75),
    borderWidth: moderateScale(5),
    borderColor: COLORS.neutral[100] + '80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle2: {
    height: moderateScale(120),
    width: moderateScale(120),
    borderRadius: moderateScale(60),
    borderWidth: moderateScale(5),
    borderColor: COLORS.neutral[100] + '80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  formContainer: {
    height: '55%',
    paddingTop: verticalScale(30),
    paddingHorizontal: scale(30),
    gap: verticalScale(15),
    // backgroundColor: COLORS.red,
  },

  btnsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(50),
  },

  btn: {},
});
