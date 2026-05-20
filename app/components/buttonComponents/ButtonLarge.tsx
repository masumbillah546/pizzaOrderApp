import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  COLORS,
  FontFamily,
  BorderRadius,
  Spacing,
  FontSizes,
} from '@/constants/theme';
import AppText from '../AppText';
import { verticalScale } from '@/utils/ScreenSize';

interface ButtonProps {
  title?: string;
  variant?: 'primary' | 'warning';
  onPress: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function ButtonLarge({
  title,
  variant = 'primary',
  onPress,
  icon,
  disabled = false,
  loading = false,
  style,
  textStyle,
  contentContainerStyle,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button(variant), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} size="small" />
      ) : (
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          {title && <AppText style={[styles.text, textStyle]}>{title}</AppText>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: (variant: string) => ({
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(50),
    backgroundColor: variant === 'primary' ? COLORS.theme : COLORS.warning[400],
    width: '100%',
    maxWidth: '80%',
  }),
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  iconContainer: {
    // marginRight: Spacing.sm,
  },
  text: {
    // fontFamily: FontFamily.heading.medium,
    textAlign: 'center',
    fontSize: FontSizes.md,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
