import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';

import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { ButtonLarge, GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';

import BG_Image from '@/assets/images/splash.png';

// --- Types ---
interface BuyingOptionScreenProps {
  purchasedCount?: number;
  targetCount?: number;
}

const BuyingOptionScreen: React.FC<BuyingOptionScreenProps> = ({
  purchasedCount = 7, // Extracted from "You have buy 7 Pizzas" label
  targetCount = 10, // Extracted from "Buy 10 Pizza" metric
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <MobileHeader title="BUY NOW" onMenu={() => {}} />

      {/* --- HEADER BLOCK --- */}
      <View style={styles.promoHeaderBar}>
        <GlowingSeparator />
        <Text style={styles.headerPrimaryText}>Choose your Method</Text>
        <Text style={styles.headerSecondaryText}>
          Delivery cost will be added
        </Text>
      </View>

      {/* --- CORE CONTENT BODY AREA --- */}
      <ImageBackground style={styles.mainCoreBody} source={BG_Image}>
        <View style={styles.btnsContainer}>
          <ButtonLarge
            variant="warning"
            style={styles.btn}
            title={'Delivery'}
            onPress={() => navigation.navigate('TableFoodScreen')}
          />

          <ButtonLarge
            style={styles.btn}
            title={'Pickup'}
            onPress={() => navigation.navigate('TableFoodScreen')}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  /* --- Promo Header Box Styles --- */
  promoHeaderBar: {
    backgroundColor: COLORS.theme, // Exact application orange theme profile color token
    paddingBottom: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerPrimaryText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
    marginBottom: verticalScale(4),
    letterSpacing: 0.1,
  },
  headerSecondaryText: {
    color: '#333333', // Exact charcoal black header secondary text accent matching mockup specification Rules
    fontSize: moderateScale(15),
    fontWeight: '700',
  },
  /* --- Content Elements Rules --- */
  mainCoreBody: {
    flexGrow: 1,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(30),
  },
  btnsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    // height: moderateScale(46),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
});

export default BuyingOptionScreen;
