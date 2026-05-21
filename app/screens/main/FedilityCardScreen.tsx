import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Check, X, Pizza } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';

import BG_Image from '@/assets/images/splash.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// --- Types ---
interface FedilityCardScreenProps {
  purchasedCount?: number;
  targetCount?: number;
}

const FedilityCardScreen: React.FC<FedilityCardScreenProps> = ({
  purchasedCount = 7, // Extracted from "You have buy 7 Pizzas" label
  targetCount = 10, // Extracted from "Buy 10 Pizza" metric
}) => {
  const remainingCount = Math.max(0, targetCount - purchasedCount);

  // Helper arrays to map dynamic icon background watermarks across the layout context
  const watermarkRows = Array.from({ length: 6 });
  const stampsArray = Array.from({ length: targetCount });

  return (
    <SafeAreaView style={styles.screenContainer}>
      <MobileHeader title="FEDILITY CARD" onMenu={() => {}} />
      <GlowingSeparator />

      {/* --- HEADER BLOCK --- */}
      <View style={styles.promoHeaderBar}>
        <Text style={styles.headerPrimaryText}>
          Buy {targetCount} Pizza and Get Free 1
        </Text>
        <Text style={styles.headerSecondaryText}>
          You have buy {purchasedCount} Pizzas
        </Text>
      </View>

      {/* --- CORE CONTENT BODY AREA --- */}
      <ImageBackground style={styles.mainCoreBody} source={BG_Image}>
        {/* Curved Reward Announcement Title */}
        <Text style={styles.freeCurveLabelText}>Free!!!</Text>

        {/* Central Reward Hero Display Graphic Element */}
        <View style={styles.heroGraphicContainer}>
          <Pizza
            size={moderateScale(160)}
            color="#F4A472"
            strokeWidth={1.5}
            style={styles.pizzaMainGraphic}
          />
          {/* Decorative Vector Arrow path indicating stamp card interaction points */}
          <View style={styles.curvedArrowMarkerContainer}>
            <Text style={styles.vectorDashedArrow}>➔</Text>
          </View>
        </View>

        {/* --- STAMP GRID PANEL BOARD --- */}
        <View style={styles.stampCardGridContainer}>
          <View style={styles.stampsFlexWrapBox}>
            {stampsArray.map((_, index) => {
              const isStamped = index < purchasedCount;
              return (
                <View key={index} style={styles.stampSlotBadgeWrapper}>
                  {isStamped ? (
                    /* Completed Active Stamp Style Node Component */
                    <View
                      style={[
                        styles.stampBaseBubble,
                        styles.activeStampCompletedShadow,
                      ]}
                    >
                      <View style={styles.greenCheckBadgeCircle}>
                        <Check
                          size={moderateScale(16)}
                          color="#FFFFFF"
                          strokeWidth={4}
                        />
                      </View>
                    </View>
                  ) : (
                    /* Unused/Empty Inactive Stamp Placeholder Style Node Component */
                    <View
                      style={[
                        styles.stampBaseBubble,
                        styles.inactiveStampPlaceholder,
                      ]}
                    >
                      <View style={styles.grayCrossBadgeCircle}>
                        <X
                          size={moderateScale(16)}
                          color="red"
                          strokeWidth={4}
                        />
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* --- BOTTOM PROGRESS STATUS READOUT --- */}
        <Text style={styles.progressStatusLabelText}>
          Remaining{' '}
          <Text style={styles.progressCounterHighlight}>{remainingCount}</Text>{' '}
          To Get One Free
        </Text>
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
    paddingVertical: verticalScale(14),
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
  freeCurveLabelText: {
    fontSize: moderateScale(38),
    fontWeight: '900',
    color: '#F4A472', // Matches primary food text tone
    transform: [{ rotate: '-6deg' }],
    marginBottom: verticalScale(5),
    letterSpacing: 0.5,
  },
  heroGraphicContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(25),
  },
  pizzaMainGraphic: {
    transform: [{ rotate: '-5deg' }],
  },
  curvedArrowMarkerContainer: {
    position: 'absolute',
    bottom: verticalScale(-10),
    right: scale(-20),
    transform: [{ rotate: '-70deg' }],
  },
  vectorDashedArrow: {
    fontSize: moderateScale(32),
    color: '#FFCC00',
    letterSpacing: 2,
  },
  /* --- Loyalty Card Selector Board Styles --- */
  stampCardGridContainer: {
    width: '100%',
    backgroundColor: '#FFCC00', // Signature gold card frame alignment field specifications
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(45),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  stampsFlexWrapBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stampSlotBadgeWrapper: {
    width: '18%', // Renders exactly 5 items per line grid matrix configuration elements
    alignItems: 'center',
    marginVertical: verticalScale(8),
  },
  stampBaseBubble: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(1.5),
  },
  activeStampCompletedShadow: {
    borderColor: '#4CD964', // Success green border trace line logic anchor
    borderStyle: 'dashed',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
  },
  inactiveStampPlaceholder: {
    borderColor: '#A0A0A0', // Gray dashed layout boundary style fallback rules
    borderStyle: 'dashed',
    backgroundColor: '#EAEAEA',
  },
  greenCheckBadgeCircle: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: '#4CD964',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayCrossBadgeCircle: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: '#A8B0BC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* --- Progress Info Readout Block --- */
  progressStatusLabelText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  progressCounterHighlight: {
    color: '#F4A472', // Prominent orange target progress indicator metrics
    fontSize: moderateScale(23),
    fontWeight: '900',
  },
});

export default FedilityCardScreen;
