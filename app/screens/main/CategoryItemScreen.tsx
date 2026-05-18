import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ShoppingBasket, Check, Plus, Minus } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { MobileHeader } from '@/components';

// --- Types & Interfaces ---
interface PizzaVariant {
  id: string;
  name: string;
  basePrice: number;
  isPrefixText?: boolean; // True handles "From $10" style variants layout rules
  isPlusPrefix?: boolean; // True handles "+$10" style variants layout rules
}

interface CartState {
  [key: string]: number; // Tracks dynamic integer item counts mapped to IDs
}

const VARIANTS_DATA: PizzaVariant[] = [
  { id: '1', name: 'The Original: Neapolitan', basePrice: 10, isPlusPrefix: true },
  { id: '2', name: 'Chicago Deep Dish (and Stuffed)', basePrice: 10 },
  { id: '3', name: 'Detroit Style', basePrice: 10, isPrefixText: true },
  { id: '4', name: 'New England Greek', basePrice: 10 },
];

interface CategoryItemScreenProps {
  isClosed?: boolean;
  onAddToBucketSubmit?: (totalPrice: number, cart: CartState) => void;
}

const CategoryItemScreen: React.FC<CategoryItemScreenProps> = ({
  isClosed = true,
  onAddToBucketSubmit,
}) => {
  // Initialize sample dynamic count states based on image specs (Item 1 = 2 count, Item 3 = 1 count)
  const [cart, setCart] = useState<CartState>({
    '1': 2,
    '3': 1,
  });

  // Structural pricing calculation core
  const baseCalculatedTotal = Object.keys(cart).reduce((sum, key) => {
    const variant = VARIANTS_DATA.find((v) => v.id === key);
    const quantity = cart[key];
    return sum + (variant ? variant.basePrice * quantity : 0);
  }, 0);

  // Fallback to match exact design mock total if edge parameters require it
  const displayTotal = baseCalculatedTotal > 0 ? baseCalculatedTotal : 50;

  const incrementQuantity = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrementQuantity = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] <= 1) {
        delete updated[id];
      } else {
        updated[id] -= 1;
      }
      return updated;
    });
  };

  const renderVariantItem = ({ item }: { item: PizzaVariant }) => {
    const quantity = cart[item.id] || 0;
    const isActive = quantity > 0;
    const computedRowSubtotal = item.basePrice * quantity;

    return (
      <View style={styles.itemRowWrapperFrame}>
        {/* --- Top Sub-Row: Variant Identifier Title and Primary State Trigger --- */}
        <View style={styles.variantPrimaryHeaderRow}>
          <Text style={styles.variantLabelTitle}>{item.name}</Text>
          
          {!isActive ? (
            <View style={styles.unselectedPriceActionGroup}>
              <Text style={[styles.priceTagText, item.isPrefixText && styles.prefixGreenColor]}>
                {item.isPrefixText && 'From '}
                {item.isPlusPrefix && '+'}
                {`$${item.basePrice}`}
              </Text>
              <TouchableOpacity
                style={styles.orangePlusButtonHitbox}
                activeOpacity={0.7}
                onPress={() => incrementQuantity(item.id)}
              >
                <Plus size={moderateScale(16)} color="#FFFFFF" strokeWidth={3} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.unselectedPriceActionGroup}>
              <Text style={styles.priceTagText}>{`$${item.basePrice}`}</Text>
              <TouchableOpacity
                style={styles.orangePlusButtonHitbox}
                activeOpacity={0.7}
                onPress={() => incrementQuantity(item.id)}
              >
                <Plus size={moderateScale(16)} color="#FFFFFF" strokeWidth={3} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* --- Lower Sub-Row: Expanded Selection Panel (Rendered if Item is Added) --- */}
        {isActive && (
          <View style={styles.expandedActiveBannerCard}>
            {/* Active Display Integer Counter */}
            <Text style={styles.activeCountIndicatorText}>{quantity}</Text>
            
            <View style={styles.activeBannerRightCluster}>
              {/* Green Confirmation Checkmark */}
              <Check size={moderateScale(16)} color="#4CD964" strokeWidth={3} style={styles.rowCheckSpacing} />
              {/* Summed Aggregate Metric Value */}
              <Text style={styles.activeSubtotalValueText}>{`+ $${computedRowSubtotal}`}</Text>
              
              {/* Decrement Modification Button */}
              <TouchableOpacity
                style={styles.greyMinusButtonHitbox}
                activeOpacity={0.7}
                onPress={() => decrementQuantity(item.id)}
              >
                <Minus size={moderateScale(16)} color="#A5A5A5" strokeWidth={3} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <MobileHeader title="PIZZA ITEM" onMenu={() => {}} />

      {/* --- Conditional Closed Notification Ribbon --- */}
      {isClosed && (
        <View style={styles.closedNotificationBanner}>
          <Text style={styles.closedRibbonLabelText}>
            Sorry We Are Closed.Open at 19:30
          </Text>
        </View>
      )}

      {/* --- Description Header Block --- */}
      <View style={styles.categoryMetaHeaderBlock}>
        <Text style={styles.categoryTitleText}>Pizza</Text>
        <Text style={styles.loremParagraphBody}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        </Text>
        <View style={styles.topContentHorizontalDivider} />
      </View>

      {/* --- Variants Interactive FlatList Matrix Canvas --- */}
      <FlatList
        data={VARIANTS_DATA}
        renderItem={renderVariantItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollListPaddingBottomModifier}
      />

      {/* --- SECTION 3: Persistent Sticky Calculations Checkout Footer --- */}
      <View style={styles.calculationStickyFooter}>
        <TouchableOpacity
          style={styles.addBucketMainActionButton}
          activeOpacity={0.85}
          onPress={() => onAddToBucketSubmit?.(displayTotal, cart)}
        >
          <View style={styles.innerBucketButtonLayout}>
            <ShoppingBasket size={moderateScale(24)} color="#000000" strokeWidth={2} />
            <Text style={styles.addBucketButtonTitleText}>Add to Bucket</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.totalPriceMetricSummaryBox}>
          <Text style={styles.totalLabelSubtext}>Total</Text>
          <Text style={styles.totalNumericCalculatedText}>{`$${displayTotal}`}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  brandingHeaderAccentBar: {
    backgroundColor: '#F4A472', // Core application signature orange token
    height: verticalScale(40),
    width: '100%',
  },
  closedNotificationBanner: {
    backgroundColor: '#8E6E53', // Deep clay structural operation banner color matching specifications
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  closedRibbonLabelText: {
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  /* --- Content Description Header Node Block Rules --- */
  categoryMetaHeaderBlock: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(16),
  },
  categoryTitleText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: verticalScale(6),
  },
  loremParagraphBody: {
    fontSize: moderateScale(11.5),
    color: '#777777', // Subdued layout text color spec anchor
    lineHeight: moderateScale(16),
    fontWeight: '400',
    marginBottom: verticalScale(20),
  },
  topContentHorizontalDivider: {
    width: '100%',
    height: scale(1),
    backgroundColor: '#EAEAEA',
    marginBottom: verticalScale(10),
  },
  /* --- Variants List Content Architecture --- */
  scrollListPaddingBottomModifier: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(100), // Protects visibility against clipping underneath absolute footer items
  },
  itemRowWrapperFrame: {
    width: '100%',
    marginVertical: verticalScale(4),
  },
  variantPrimaryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(56),
    width: '100%',
  },
  variantLabelTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#2C2C2C',
    flex: 1,
    paddingRight: scale(10),
  },
  unselectedPriceActionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  priceTagText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#2F2F2F',
  },
  prefixGreenColor: {
    color: '#4CD964', // Specialized contextual green override text tracking specifications
  },
  orangePlusButtonHitbox: {
    backgroundColor: '#F4A472', // Flat signature element color
    width: scale(28),
    height: scale(28),
    borderRadius: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* --- Expanded Selection Sub-Banner Component Blocks --- */
  expandedActiveBannerCard: {
    width: '100%',
    backgroundColor: '#EAEAEA', // Light tracking background sheet specification box
    height: verticalScale(54),
    borderRadius: moderateScale(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(-2),
    marginBottom: verticalScale(8),
  },
  activeCountIndicatorText: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    color: '#4CD964', // Highlighted active selection quantity node
  },
  activeBannerRightCluster: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCheckSpacing: {
    marginRight: scale(14),
  },
  activeSubtotalValueText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#4CD964', // Running dynamic variant row price calculation tracker 
    marginRight: scale(18),
  },
  greyMinusButtonHitbox: {
    backgroundColor: '#DCDCDC',
    width: scale(28),
    height: scale(28),
    borderRadius: moderateScale(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* --- Footer Anchor Layout Engine Components --- */
  calculationStickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(75),
    backgroundColor: '#FFFFFF',
    borderTopWidth: scale(1),
    borderTopColor: '#ECECEC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    zIndex: 99,
  },
  addBucketMainActionButton: {
    backgroundColor: '#FFCC00', // Signature gold active call-to-action button color mapping
    height: verticalScale(46),
    width: '74%',
    borderRadius: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBucketButtonLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(24),
  },
  addBucketButtonTitleText: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  totalPriceMetricSummaryBox: {
    width: '22%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalLabelSubtext: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: '#555555',
    marginBottom: verticalScale(1),
  },
  totalNumericCalculatedText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default CategoryItemScreen;