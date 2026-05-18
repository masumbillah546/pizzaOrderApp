import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Container, AppText, Logo, Button, Row } from '@/components';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { COLORS, FontSizes } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: any;
};

const IntroScreen = ({ navigation }: Props) => {
  // useEffect(() => {
  //   TechnicianService.getOnboardingState().then(res => {});
  // }, []);
  return (
    <Container style={styles.container} keyboardAware={false}>
      <Logo style={styles.logoContainer} />
      <AppText style={styles.title}>Welcome to Computer Lab</AppText>
      <AppText style={styles.subtitle}>
        Computer Lab connects skilled technicians with customers who need fast,
        reliable, and transparent repairs. By joining our certified network, you
        become part of a trusted ecosystem where professionalism, quality, and
        visibility are rewarded.
      </AppText>

      <View>
        <Button
          title={'I already have a account'}
          onPress={() => {
            navigation.navigate('LoginScreen');
            AsyncStorage.setItem('AppInitialized', 'true');
          }}
          style={styles.continueBtn}
          textStyle={styles.btnText}
        />
        <Button
          title={'Become a Computer Lab Technician'}
          onPress={() => {
            navigation.navigate('BusinessType');
            AsyncStorage.setItem('AppInitialized', 'true');
          }}
          style={styles.continueBtn}
          textStyle={styles.btnText}
          variant="outline"
        />
      </View>
      <View style={{ marginTop: 'auto' }}>
        <AppText style={[styles.subtitle, { textAlign: 'center' }]}>
          by clicking continue you agree to the Computer Lab{' '}
          <AppText
            style={{ color: COLORS.theme, fontWeight: '500' }}
            // onPress={() => navigation.navigate('LoginScreen')}
          >
            trams & Condition
          </AppText>
        </AppText>
      </View>
    </Container>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    gap: verticalScale(10),
  },
  logoContainer: {
    // marginTop: verticalScale(20),
    // marginBottom: verticalScale(50),
  },
  title: {
    color: COLORS.neutral[800],
    fontSize: FontSizes.lg,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.neutral[600],
    fontSize: FontSizes.xs,
  },
  continueBtn: {
    marginVertical: verticalScale(5),
  },
  btnText: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
});
