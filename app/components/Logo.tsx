import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
// import AppLogo from '@/assets/logo/logo-full.svg';
// import AppLogoWhite from '@/assets/logo/logo-full-white.svg';
import { moderateScale } from '@/utils/ScreenSize';
import AppText from './AppText';
import { COLORS, FontSizes } from '@/constants/theme';

interface Props {
  size?: number;
  style?: StyleProp<ViewStyle>;
  type?: string;
}

export default function Logo({ size = 200, style, type }: Props) {
  return (
    <View style={[styles.logo(size), style]}>
      <AppText style={{ color: COLORS.white, fontSize: FontSizes.lg }}>
        BESTFOOD
      </AppText>
      <AppText style={{ color: COLORS.white, fontSize: FontSizes.xxxl }}>
        Food
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: (size: number) => ({
    width: moderateScale(size),
    height: moderateScale(size),
    borderRadius: moderateScale(size) / 2,
    backgroundColor: COLORS.theme + '98',
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
