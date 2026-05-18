import React from 'react';
import {
  TouchableOpacity,
  Text,
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
import AppText from './AppText';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'ghost'
  | 'default';

type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export default function Button({
  title,
  onPress,
  variant = 'default',
  size = 'medium',
  icon,
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  contentContainerStyle,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle: StyleProp<ViewStyle> = [
      styles.button,
      styles[size],
      fullWidth && styles.fullWidth,
    ];

    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryButton);
        if (disabled) baseStyle.push(styles.disabledPrimary);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryButton);
        if (disabled) baseStyle.push(styles.disabledSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.outlineButton);
        if (disabled) baseStyle.push(styles.disabledOutline);
        break;
      case 'danger':
        baseStyle.push(styles.dangerButton);
        if (disabled) baseStyle.push(styles.disabledDanger);
        break;
      case 'ghost':
        baseStyle.push(styles.ghostButton);
        if (disabled) baseStyle.push(styles.disabledGhost);
        break;

      default:
        baseStyle.push(styles.defaultButton);
        if (disabled) baseStyle.push(styles.disabledDefault);
        break;
    }

    if (style) baseStyle.push(style);
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle: StyleProp<TextStyle> = [
      styles.text,
      styles[`${size}Text`],
    ];

    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryText);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryText);
        break;
      case 'outline':
        baseStyle.push(styles.outlineText);
        if (disabled) baseStyle.push(styles.disabledOutlineText);
        break;
      case 'danger':
        baseStyle.push(styles.dangerText);
        break;
      case 'ghost':
        baseStyle.push(styles.ghostText);
        if (disabled) baseStyle.push(styles.disabledGhostText);
        break;

      default:
        baseStyle.push(styles.primaryText);
        break;
    }

    if (textStyle) baseStyle.push(textStyle);
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline' || variant === 'ghost'
              ? COLORS.primary[500]
              : COLORS.white
          }
          size="small"
        />
      ) : (
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          {title && <AppText style={getTextStyle()}>{title}</AppText>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  },
  fullWidth: {
    width: '100%',
  },
  // Button sizes
  small: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  medium: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 44,
  },
  large: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 52,
  },
  // Text sizes
  smallText: {
    fontSize: FontSizes.sm,
  },
  mediumText: {
    fontSize: FontSizes.md,
  },
  largeText: {
    fontSize: FontSizes.lg,
  },
  // Button variants
  defaultButton: {
    backgroundColor: COLORS.theme,
  },
  primaryButton: {
    backgroundColor: '#FFC107', // COLORS.primary[500],
  },
  secondaryButton: {
    backgroundColor: COLORS.accent[500],
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary[500],
  },
  dangerButton: {
    backgroundColor: COLORS.error[500],
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  // Text variants
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary[500],
  },
  dangerText: {
    color: COLORS.white,
  },
  ghostText: {
    color: COLORS.primary[500],
  },
  // Disabled states
  disabledDefault: {
    backgroundColor: COLORS.primary[300],
  },
  disabledPrimary: {
    backgroundColor: COLORS.primary[200],
  },
  disabledSecondary: {
    backgroundColor: COLORS.accent[200],
  },
  disabledOutline: {
    borderColor: COLORS.neutral[400],
  },
  disabledOutlineText: {
    color: COLORS.neutral[400],
  },
  disabledDanger: {
    backgroundColor: COLORS.error[200],
  },
  disabledGhost: {
    opacity: 0.5,
  },
  disabledGhostText: {
    color: COLORS.neutral[400],
  },
});
