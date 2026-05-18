import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ShoppingBasket } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { MobileHeader } from '@/components';

// --- Types & Dummy Data ---
interface MenuCategory {
  id: string;
  name: string;
  itemCount: number; // 0 means unselected/no basket counts
}

const MENU_DATA: MenuCategory[] = [
  { id: '1', name: 'Pizza', itemCount: 2 },
  { id: '2', name: 'Chicken', itemCount: 0 },
  { id: '3', name: 'Beef', itemCount: 2 },
  { id: '4', name: 'Marton', itemCount: 0 },
  { id: '5', name: 'Bread', itemCount: 0 },
  { id: '6', name: 'Drink', itemCount: 0 },
  { id: '7', name: 'Salad', itemCount: 0 },
  { id: '8', name: 'Extra', itemCount: 0 },
  { id: '9', name: 'Thai', itemCount: 0 },
];

interface CategoriesScreenProps {
  isClosed?: boolean;
  onCategorySelect?: (categoryName: string) => void;
  navigation?: any;
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  isClosed = true,
  onCategorySelect,
  navigation,
}) => {
  const renderCategoryRow = ({ item }: { item: MenuCategory }) => (
    <TouchableOpacity
      style={styles.categoryRowItem}
      activeOpacity={0.7}
      onPress={() => {
        onCategorySelect?.(item.name);
        navigation.navigate('CategoryItemScreen', { category: item.name });
      }}
    >
      <View style={styles.leftLabelContainer}>
        {/* Yellow Circle Bullet Point Accent Indicator */}
        <View style={styles.yellowBulletBadge} />
        <Text style={styles.categoryTitleText}>{item.name}</Text>
      </View>

      {/* Conditional Basket Metadata Render */}
      {item.itemCount > 0 && (
        <View style={styles.basketBadgeWrapper}>
          <ShoppingBasket
            size={moderateScale(18)}
            color="#4CD964"
            strokeWidth={2}
          />
          <Text style={styles.basketItemCountText}>{item.itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* <StatusBar backgroundColor="#F4A472" barStyle="light-content" /> */}
      <MobileHeader title="CATEGORIES" onMenu={() => {}} />

      {/* --- SECTION 2: Conditional Closed Alert Banner Bar --- */}
      {isClosed && (
        <View style={styles.closedAnnouncementBar}>
          <Text style={styles.closedBannerText}>
            Sorry We Are Closed.Open at 19:30
          </Text>
        </View>
      )}

      {/* --- SECTION 3: Dynamic Category Main Board Wrapper --- */}
      <View style={styles.menuContentBody}>
        <Text style={styles.sectionHeaderTitle}>Our Menu</Text>

        {/* --- Unique Ribbon Metric Badge Overlays --- */}
        <View style={styles.ribbonContainerRow}>
          <View style={styles.ribbonLeftBlock}>
            <Text style={styles.ribbonMetricText}>$1.00 Delivery</Text>
            <Text style={styles.ribbonMetricText}>$8 Min. Order</Text>
          </View>
          {/* Arrow Wedge Point Triangle CSS segment cut */}
          <View style={styles.ribbonArrowTriangleCut} />
        </View>

        {/* Supporting description tracking context parameters */}
        <Text style={styles.menuContextSubtitle}>Our delivered Menu Here</Text>

        {/* --- SECTION 4: Categories List Canvas Array --- */}
        <FlatList
          data={MENU_DATA}
          renderItem={renderCategoryRow}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainerPadding}
          ItemSeparatorComponent={() => <View style={styles.rowDividerLine} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  brandMainHeader: {
    backgroundColor: '#F4A472', // Core signature application brand pastel orange theme color
    height: verticalScale(40),
    width: '100%',
  },
  /* --- Closed Structural Status Ribbon Styles --- */
  closedAnnouncementBar: {
    backgroundColor: '#8E6E53', // Deep pastel brown tone specifying operational closure limits
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  closedBannerText: {
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  /* --- Core Layout Structural Form Components --- */
  menuContentBody: {
    flex: 1,
    paddingTop: verticalScale(20),
  },
  sectionHeaderTitle: {
    fontSize: moderateScale(19),
    // fontWeight: 'CEB',
    color: '#000000',
    paddingHorizontal: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(12),
  },
  /* --- Unique Vector Arrow Cut Ribbon Badge Styles --- */
  ribbonContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(24),
    marginBottom: verticalScale(16),
  },
  ribbonLeftBlock: {
    backgroundColor: '#9E7453', // Deep clay brown metrics overlay badge fill
    flexDirection: 'row',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(5),
    alignItems: 'center',
    gap: scale(16),
  },
  ribbonMetricText: {
    color: '#EFE7DF', // Pastel light bronze metadata text
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  ribbonArrowTriangleCut: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: verticalScale(13),
    borderBottomWidth: verticalScale(13),
    borderLeftWidth: scale(14),
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#9E7453', // Links fluidly into ribbon core container matrix block
  },
  menuContextSubtitle: {
    fontSize: moderateScale(13),
    color: '#555555',
    paddingHorizontal: scale(24),
    marginBottom: verticalScale(10),
    fontWeight: '500',
  },
  /* --- FlatList Categorical Item Rows Mapping Engine --- */
  listContainerPadding: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(20),
  },
  categoryRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(52),
    width: '100%',
  },
  leftLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yellowBulletBadge: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#FFCC00', // Signature active design selection bullet token
    marginRight: scale(14),
  },
  categoryTitleText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#333333',
    letterSpacing: 0.1,
  },
  /* --- Basket Count Visual Metrics Elements --- */
  basketBadgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    paddingRight: scale(10),
  },
  basketItemCountText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#4CD964', // Active functional green count tracking marker
    width: scale(14),
    textAlign: 'center',
  },
  rowDividerLine: {
    width: '100%',
    height: scale(1),
    backgroundColor: '#ECECEC',
  },
});

export default CategoriesScreen;
