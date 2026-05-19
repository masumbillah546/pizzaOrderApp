import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
//
import { COLORS, FontSizes, Shadows } from '@/constants/theme';
import { moderateScale, verticalScale } from '@/utils/ScreenSize';
import { AppText, ButtonLarge, Logo } from '@/components';
import { navigationRef } from '@/navigation/RootNavigator';
import BG_Image from '@/assets/images/splash.png';

const SplashScreen = ({ navigation, isLoading = false }) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
      source={BG_Image}
    >
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
