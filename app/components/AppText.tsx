import React from 'react';
import {
  StyleProp,
  TextProps,
  Text,
  TextStyle,
  StyleSheet,
} from 'react-native';
import { COLORS, FontSizes } from '@/constants/theme';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export default function AppText({
  children,
  style,
  numberOfLines,
  ...props
}: AppTextProps) {
  return (
    <Text
      style={[
        styles.text,
        style,
        { lineHeight: (style?.fontSize || FontSizes.sm) * 1.6 },
      ]}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.neutral[800],
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * 1.6, // 1.5
    fontFamily: 'Poppins-Regular',
  },
});
