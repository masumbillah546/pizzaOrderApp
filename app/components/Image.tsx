import {
  Dimensions,
  PixelRatio,
  Image as RNImage,
  ImageProps as RNImageProps,
} from 'react-native';
import {moderateScale} from '../utils/ScreenSize';
import {COLORS} from '@/constants/theme';
const SW = Dimensions.get('window').width;
const pixelRatio = PixelRatio.get();

// Calculate actual pixel resolution
const screenWidthInPixels = SW * pixelRatio;
interface ImageProps extends RNImageProps {
  rounded?: boolean;
  size?: number;
  source: {uri: string};
}
export default function Image({
  rounded = false,
  size = 100,
  source,
  ...rest
}: ImageProps) {
  return (
    <RNImage
      resizeMode="contain"
      style={{
        height: moderateScale(size),
        width: moderateScale(size),
        borderRadius: rounded ? moderateScale(size) / 2 : 0,
        backgroundColor: COLORS.image_background,
      }}
      {...rest}
      // source={{
      //   uri: source.uri,
      //   // uri: source.uri + '&width=' + screenWidthInPixels,
      // }}
      source={source}
    />
  );
}
