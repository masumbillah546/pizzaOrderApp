import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { StyleSheet } from 'react-native';

export const COLORS = {
  theme: '#F79963',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  input_border: '#BFBFBF',
  theme_light: '#8ADC8F',
  theme_lighter: '#c1d3e7ff',
  placeholder: '',
  active_bg: '#2E90FB10',
  image_background: 'grey',
  shadow_color: '#000',
  inactive: '#898A8D',
  inactive_2: '#ECECEC',
  inactive_txt: '#888888',
  disabled: '#D4D4D4',
  red: '#F2412D',
  black_opacity: '#00000080',
  success: '#00B515',
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#007AFF', // Primary blue (Apple)
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  accent: {
    50: '#E0F2F1',
    100: '#B2DFDB',
    200: '#80CBC4',
    300: '#4DB6AC',
    400: '#26A69A',
    500: '#34C759', // Success green (Apple)
    600: '#00897B',
    700: '#00796B',
    800: '#00695C',
    900: '#004D40',
  },
  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FF9500', // Warning orange (Apple)
    600: '#FFB300',
    700: '#FFA000',
    800: '#FF8F00',
    900: '#FF6F00',
  },
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#FF3B30', // Error red (Apple)
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

export const Spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(48),

  // icon sizes
  iconSm: moderateScale(16),
  iconMd: moderateScale(24),
  iconLg: moderateScale(32),

  // layout
  buttonHeight: moderateScale(48),
  inputHeight: moderateScale(46),
  screenPadding: moderateScale(16),
  pageContainerHorizontal: moderateScale(16),
  pageContainerVertical: verticalScale(16),

  maxWidth: 500,
};

export const FontSizes = {
  xs: moderateScale(12),
  sm_header: moderateScale(14),
  sm: moderateScale(13),
  md: moderateScale(16),
  lg: moderateScale(18),
  xl: moderateScale(20),
  xxl: moderateScale(24),
  xxxl: moderateScale(30),
};

export const FontFamily = {
  heading: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
  body: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
  },
};

export const typography = StyleSheet.create({
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
  },

  heading: {
    fontSize: FontSizes.xxxl,
    fontWeight: '600',
  },

  body: {
    fontSize: FontSizes.md,
  },

  caption: {
    fontSize: FontSizes.sm,
  },
});

export const BorderRadius = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(24),
  full: moderateScale(9999),
};

export const Shadows = StyleSheet.create({
  small: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: moderateScale(2),
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(6),
    elevation: moderateScale(4),
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: verticalScale(8) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(12),
    elevation: moderateScale(8),
  },
});

// theme/layout.ts
export const layout = StyleSheet.create({
  flex1: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
  },

  column: {
    flexDirection: 'column',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  justifyBetween: {
    justifyContent: 'space-between',
  },

  justifyAround: {
    justifyContent: 'space-around',
  },

  alignCenter: {
    alignItems: 'center',
  },

  alignStart: {
    alignItems: 'flex-start',
  },

  alignEnd: {
    alignItems: 'flex-end',
  },

  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
  },

  button: {
    height: Spacing.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },

  input: {
    height: Spacing.inputHeight,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
});
