import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { DollarSign } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';

interface CheckoutSummaryHeroProps {
  itemCount?: number;
  totalAmount?: number;
  onCheckoutSubmit?: () => void;
  onChangeOrderPress?: () => void;
}

const CheckoutSummaryHero: React.FC<CheckoutSummaryHeroProps> = ({
  itemCount = 10,
  totalAmount = 60,
  onCheckoutSubmit,
  onChangeOrderPress,
}) => {
  return (
    <View style={styles.outerMasterContainer}>
      {/* --- SECTION 1: Top Brand Pastel Orange Aesthetic Accent Strip --- */}
      <View style={styles.brandPastelOrangeStrip} />

      {/* --- SECTION 2: Core Yellow Dashboard Summary Matrix Board --- */}
      <View style={styles.yellowHeroDashboardCanvas}>
        
        {/* Decorative Absolute Background Watermark Elements */}
        <View style={[styles.watermarkWrapperPosition, styles.leftWatermarkPosition]}>
          <DollarSign size={moderateScale(54)} color="#E2B734" strokeWidth={2.5} opacity={0.35} />
        </View>
        <View style={[styles.watermarkWrapperPosition, styles.rightWatermarkPosition]}>
          <DollarSign size={moderateScale(64)} color="#E2B734" strokeWidth={2.5} opacity={0.35} />
        </View>

        {/* Quantized Order Items Sub-Header Parameter String */}
        <Text style={styles.orderMetadataItemCounterText}>
          Total Order <Text style={styles.parenthesesItemWeightText}>{`(${itemCount} Items)`}</Text>
        </Text>

        {/* Grand Total Value Representation Frame */}
        <Text style={styles.grandTotalNumericalDisplayText}>{`$${totalAmount}`}</Text>

        {/* Core Screen Context Direct Action Trigger Button */}
        <TouchableOpacity
          style={styles.greenCheckoutMainActionButton}
          activeOpacity={0.85}
          onPress={onCheckoutSubmit}
        >
          <Text style={styles.checkoutActionBtnLabelText}>Go to Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* --- SECTION 3: Structured Metadata Content Header Separator Row --- */}
      <View style={styles.orderSummaryContextHeaderRow}>
        <Text style={styles.sectionTitleAnchorLabelText}>ORDER SUMMARY</Text>
        
        {/* Inline Secondary Modification Parameter Action Button */}
        <TouchableOpacity
          style={styles.greenChangeOrderInlineButton}
          activeOpacity={0.7}
          onPress={onChangeOrderPress}
        >
          <Text style={styles.changeActionLabelText}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerMasterContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  brandPastelOrangeStrip: {
    backgroundColor: '#F4A472', // Core pastel orange application branding token profile
    height: verticalScale(14),
    width: '100%',
  },
  /* --- Yellow Interactive Summary Dashboard Canvas Layout --- */
  yellowHeroDashboardCanvas: {
    backgroundColor: '#FFCC33', // Vivid layout gold-yellow background fill matrix matching specifications
    width: '100%',
    alignItems: 'center',
    paddingTop: verticalScale(22),
    paddingBottom: verticalScale(26),
    paddingHorizontal: scale(24),
    position: 'relative',
    overflow: 'hidden',
  },
  /* --- Watermark Structural Accent Graphics CSS Profiles --- */
  watermarkWrapperPosition: {
    position: 'absolute',
    transform: [{ rotate: '15deg' }],
    zIndex: 1,
  },
  leftWatermarkPosition: {
    left: scale(-4),
    bottom: verticalScale(12),
  },
  rightWatermarkPosition: {
    right: scale(-2),
    top: verticalScale(14),
  },
  /* --- Hero Text Readouts Core Typographical Elements --- */
  orderMetadataItemCounterText: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#262626',
    zIndex: 5,
    letterSpacing: 0.1,
  },
  parenthesesItemWeightText: {
    fontWeight: '400',
    color: '#444444',
  },
  grandTotalNumericalDisplayText: {
    fontSize: moderateScale(48),
    fontWeight: 'bold',
    color: '#262626',
    marginVertical: verticalScale(6),
    zIndex: 5,
  },
  /* --- Core Platform Primary Button Metrics --- */
  greenCheckoutMainActionButton: {
    backgroundColor: '#00B300', // Signature active rich green action CTA indicator
    width: '100%',
    height: verticalScale(48),
    borderRadius: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 1.5,
  },
  checkoutActionBtnLabelText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  /* --- Sub-Header Content Matrix Contextual Row Styles --- */
  orderSummaryContextHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(24),
    height: verticalScale(64),
    borderBottomWidth: scale(1),
    borderBottomColor: '#F5F5F5',
  },
  sectionTitleAnchorLabelText: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    color: '#2C3E50',
    letterSpacing: 0.4,
  },
  greenChangeOrderInlineButton: {
    backgroundColor: '#00B300', // Symmetrically balances core brand buttons
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeActionLabelText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '700',
    letterSpacing: 0.1,
  },
});

export default CheckoutSummaryHero;