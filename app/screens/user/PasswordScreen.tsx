import React from 'react';
import { StyleSheet, Keyboard, View, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//
import { InputField, Container, AppText } from '@/components';
import Button from '@/components/Button';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import AuthService from '@/services/AuthService';
import { handleFormErrors, passwordValidationRegex } from '@/utils/helpers';
import { useAlert, useAuth } from '@/hooks';
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from 'lucide-react-native';
import { COLORS, FontSizes } from '@/constants/theme';

export default function PasswordScreen({ route, navigation }: any) {
  const { otp_challenge_id, otp_code, forChangePassword } = route.params || {};

  const { logout } = useAuth();
  const { showSuccessAlert, showFailedAlert } = useAlert();
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
    setError,
    watch,
  } = useForm({
    defaultValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        current_password: yup
          .string()
          [forChangePassword ? 'required' : 'notRequired'](
            'Please enter current password.',
          ),
        password: yup
          .string()
          .required('Please enter password.')
          .min(8, 'Must Contain 8 Characters'),
        // .matches(
        //   passwordValidationRegex,
        //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
        // ),
        password_confirmation: yup
          .string()
          .required('Please enter confirm password.')
          .oneOf([yup.ref('password')], 'Passwords must match'),
      }),
    ),
  });

  const handleChange = async (values: any) => {
    Keyboard.dismiss();
    setLoading(true);

    try {
      let response;
      if (forChangePassword) {
        response = await AuthService.setPassword(values);
      } else {
        response = await AuthService.resetPassword({
          ...values,
          otp_challenge_id,
          otp_code,
          session_type: 'mobile_app',
          app_type: 'technician',
        });
      }

      if (response.success) {
        formReset();
        logout();
        showSuccessAlert();
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      } else {
        showFailedAlert();
      }
    } catch (e) {
      const response = await e?.response?.json();
      if (response.errors) {
        handleFormErrors(response.errors, setError);
      } else {
        showFailedAlert();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View style={styles.body}>
        {/* Header Section */}
        <View style={styles.header}>
          <View
            style={[styles.iconBox, { backgroundColor: `${COLORS.theme}10` }]}
          >
            <ShieldCheck size={moderateScale(32)} color={COLORS.theme} />
          </View>
          <AppText style={styles.title}>
            {forChangePassword ? 'Change Password' : 'Reset Password'}
          </AppText>
          <AppText style={styles.subtitle}>
            {forChangePassword
              ? 'Your new password must be different from previous used passwords.'
              : 'Choose a strong password to protect your account.'}
          </AppText>
        </View>

        {forChangePassword && (
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                value={value}
                onChangeText={onChange}
                label={'Current Password'}
                placeholder="••••••••"
                error={errors.current_password?.message}
                isPassword
                leftIcon={
                  <Lock size={moderateScale(20)} color={COLORS.neutral[500]} />
                }
              />
            )}
            name={'current_password'}
          />
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              value={value}
              onChangeText={onChange}
              label={'New Password'}
              placeholder="••••••••"
              error={errors.password?.message}
              isPassword
              leftIcon={
                <Lock size={moderateScale(20)} color={COLORS.neutral[500]} />
              }
            />
          )}
          name={'password'}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              value={value}
              onChangeText={onChange}
              label={'Confirm Password'}
              placeholder="••••••••"
              error={errors.password_confirmation?.message}
              isPassword
              leftIcon={
                <Lock size={moderateScale(20)} color={COLORS.neutral[500]} />
              }
            />
          )}
          name={'password_confirmation'}
        />

        {/* Password Requirements */}
        <View style={styles.requirements}>
          <RequirementItem
            text="At least 8 characters"
            met={watch('password').length >= 8}
            color={COLORS.theme}
          />
          <RequirementItem
            text="Contains a number or symbol"
            met={/\d/.test(watch('password'))}
            color={COLORS.theme}
          />
        </View>
      </View>

      <View style={{ marginVertical: verticalScale(20) }}>
        <Button
          loading={loading}
          onPress={handleSubmit(handleChange)}
          style={styles.btn}
          title={forChangePassword ? 'Update Password' : 'Reset Password'}
          textStyle={styles.btnText}
        />
        {!forChangePassword && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'AuthStack' }],
              });
            }}
          >
            <ArrowLeft size={moderateScale(18)} color="#667085" />
            <AppText style={styles.backText}>Back to log in</AppText>
          </TouchableOpacity>
        )}
      </View>
    </Container>
  );
}

const RequirementItem = ({ text, met, color }) => (
  <View style={styles.requirementRow}>
    <CheckCircle2 size={moderateScale(14)} color={met ? color : '#D0D5DD'} />
    <AppText style={[styles.requirementText, met && { color: '#101828' }]}>
      {text}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginVertical: verticalScale(15),
  },
  iconBox: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(15),
  },
  title: {
    fontSize: FontSizes.xxl,
    lineHeight: FontSizes.xxl * 1.5,
    fontWeight: '700',
    color: '#101828',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    color: '#667085',
    textAlign: 'center',
  },
  requirements: {
    marginVertical: verticalScale(15),
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },
  requirementText: {
    fontSize: moderateScale(12),
    color: '#667085',
    marginLeft: scale(8),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(24),
  },
  backText: {
    color: '#667085',
    fontWeight: '600',
    marginLeft: scale(8),
  },
  btn: {
    height: moderateScale(52),
  },
  btnText: {
    fontWeight: '700',
  },
});
