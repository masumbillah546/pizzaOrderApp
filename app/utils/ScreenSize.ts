import { Dimensions } from 'react-native';

export default class ScreenSize {
    static SW = Dimensions.get('window').width;
    static SH = Dimensions.get('window').height;
}

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number) => (ScreenSize.SW / guidelineBaseWidth) * size;

export const verticalScale = (size : number) => (ScreenSize.SH / guidelineBaseHeight) * size;

export const moderateScale = (size: number , factor = 0.5) => size + (scale(size) - size) * factor;

export const moderateVerticalScale = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;
