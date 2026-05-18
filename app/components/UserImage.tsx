import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
//
import Image from './Image';
import Spinner from './Spinner';
import {COLORS} from '@/constants/theme';
import {moderateScale} from '../utils/ScreenSize';

const placeholder = null //require('@/assets/icons/avatar-default-icon.png');
interface UserImageProps {
  size?: number;
  onPress?: () => void;
  uri?: string;
  disabled?: boolean;
  loading?: boolean;
}
export default function UserImage({
  size = 28,
  onPress,
  uri = '',
  disabled = false,
  loading = false,
}: UserImageProps) {
  const [error, setError] = React.useState<boolean>(false);
  const [imageSource, setImageSource] = React.useState<string>(uri);

  React.useEffect(() => {
    setImageSource(uri);
    setError(false);
  }, [uri]);

  const handError = () => {
    setError(true);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}>
      <Image
        resizeMode="cover"
        rounded
        size={size}
        source={imageSource && !error ? {uri: imageSource} : placeholder}
        onError={handError}
        onLoad={img => {
          if (img.nativeEvent.source.height === 1) {
            setError(true);
          }
        }}
      />
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            zIndex: 1,
            backgroundColor: COLORS.black_opacity,
            height: moderateScale(size),
            width: moderateScale(size),
            borderRadius: moderateScale(size) / 2,
          }}>
          <Spinner color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
