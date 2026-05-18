import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextInputProps,
  TextProps,
  TextStyle,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import {
  COLORS,
  FontFamily,
  FontSizes,
  BorderRadius,
  Spacing,
} from '@/constants/theme';
import { moderateScale, verticalScale } from '@/utils/ScreenSize';
import AppText from './AppText';

interface InputFieldProps extends TextInputProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  error?: string;
  leftIcon?: any;
  rightIcon?: any;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  required?: boolean;
}

export default function InputField({
  label,
  labelStyle,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputContainerStyle,
  isPassword = false,
  value,
  required = false,
  onChangeText,
  style,
  ...rest
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getBorderColor = () => {
    if (error) return COLORS.error[500];
    if (isFocused) return COLORS.primary[500];
    return '#444444' //COLORS.neutral[900];
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <AppText style={[styles.label, labelStyle]}>
          {label} {required && <AppText style={styles.errorText}>*</AppText>}
        </AppText>
      )}

      <View
        style={[
          styles.inputContainer,
          { borderColor: getBorderColor() },
          inputContainerStyle,
          isFocused && styles.focusedInput,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            style,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || isPassword) && styles.inputWithRightIcon,
          ]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={COLORS.neutral[400]}
          secureTextEntry={isPassword && !showPassword}
          {...rest}
        />

        {isPassword ? (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff size={moderateScale(20)} color={COLORS.neutral[900]} />
            ) : (
              <Eye size={moderateScale(20)} color={COLORS.neutral[900]} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && (
            <View style={styles.rightIconContainer}>{rightIcon}</View>
          )
        )}
      </View>

      {error && <AppText style={styles.errorText}>{error}</AppText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10, //Spacing.md,
    width: '100%',
  },
  label: {
    color: COLORS.neutral[700],
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#444444', // COLORS.neutral[900],
    // borderRadius: BorderRadius.sm,
    backgroundColor: COLORS.white,
    height: moderateScale(46),
    // maxHeight: 65, //textarea issue
  },
  focusedInput: {
    borderColor: COLORS.theme,
    borderBottomWidth: 2,
  },
  input: {
    flex: 1,
    lineHeight: FontSizes.sm * 1.5,
    fontFamily: 'Poppins-Regular',
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: COLORS.neutral[800],
    height: '100%',
    paddingHorizontal: Spacing.md,
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
    // backgroundColor: COLORS.neutral[50],
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: Spacing.xs,
  },
  leftIconContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
  },
  rightIconContainer: {
    paddingHorizontal: Spacing.sm,
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.neutral[50],
  },
  errorText: {
    fontSize: FontSizes.xs,
    color: COLORS.error[500],
    // marginTop: 4, //Spacing.sm,
  },
});
