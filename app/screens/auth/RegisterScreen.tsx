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
  Row,
} from '@/components';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { BorderRadius, COLORS, FontSizes, Spacing } from '@/constants/theme';
import AuthService from '@/services/AuthService';
import { handleFormErrors } from '@/utils/helpers';

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      dob: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        first_name: yup.string().required('Please enter first name.'),
        last_name: yup.string().required('Please enter last name.'),
        email: yup.string().required('Please enter email address.'),
        password: yup.string().required('Please enter password.'),
        dob: yup.string().required('Please enter date of birth.'),
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
      <Logo style={styles.logoContainer} size={150} />
      <View style={styles.formContainer}>
        <Row style={{ gap: scale(10), width: '100%' }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                onChangeText={onChange}
                // label={'Email/Phone'}
                placeholder="First Name"
                value={value}
                error={errors.email?.message}
                containerStyle={{ flex: 1 }}
              />
            )}
            name="first_name"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                onChangeText={onChange}
                // label={'Email/Phone'}
                placeholder="Last Name"
                value={value}
                error={errors.email?.message}
                containerStyle={{ flex: 1 }}
              />
            )}
            name="last_name"
          />
        </Row>
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

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              onChangeText={onChange}
              // label={'Email/Phone'}
              placeholder="Birth_date"
              value={value}
              keyboardType="email-address"
              error={errors.email?.message}
            />
          )}
          name="dob"
        />
      </View>

      <View style={styles.btnsContainer}>
        <ButtonLarge
          style={styles.btn}
          title={'Next'}
          onPress={() => navigation.navigate('Verify')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
