import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
} from 'react-native';
//
import { COLORS, FontSizes, Shadows } from '@/constants/theme';
import ScreenSize, { moderateScale, verticalScale } from '@/utils/ScreenSize';
import { AppText, ButtonLarge, Logo } from '@/components';
import { navigationRef } from '@/navigation/RootNavigator';
import BG_Image from '@/assets/images/splash.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SplashScreen = ({ navigation, isLoading = false }) => {
  const [loading, setLoading] = React.useState(false);
  const sai = useSafeAreaInsets();

  // React.useEffect(() => {
  //   StatusBar.setHidden(true);
  //   return () => {
  //     StatusBar.setHidden(false);
  //   };
  // }, []);

  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
      source={BG_Image}
    >
      <View
        style={{
          height: sai.top,
          backgroundColor: COLORS.theme,
          width: ScreenSize.SW,
        }}
      />
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      {isLoading ? (
        <ActivityIndicator
          style={{ marginVertical: verticalScale(50) }}
          color={COLORS.theme}
          size="large"
        />
      ) : (
        <ButtonLarge
          variant="warning"
          style={{
            marginBottom: verticalScale(50),
            ...Shadows.large,
          }}
          onPress={() => {
            // setLoading(!loading);
            // navigation.replace('Auth');
            navigationRef.current?.navigate('Auth');
          }}
          title="Start"
        />
      )}
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
