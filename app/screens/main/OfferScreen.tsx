import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';

// --- Types ---
interface OfferItem {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  date: string;
  promoText: string;
  image: any;
}

const OFFERS_DATA: OfferItem[] = [
  {
    id: '1',
    title: 'BARGUR KING',
    price: '$6.50',
    oldPrice: '$100',
    date: '10 MAY 2017',
    promoText: '25% OFF',
    image: 'https://via.placeholder.com/150', // Replace with local assets
  },
  {
    id: '2',
    title: 'BARGUR KING',
    price: '$6.50',
    date: '10 MAY 2017',
    promoText: 'BUY ONE GET ONE',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'BARGUR KING',
    price: '$6.50',
    date: '10 MAY 2017',
    promoText: 'BUY ONE GET ONE',
    image: 'https://via.placeholder.com/150', // Duplicated to match image mockup scroll list
  },
];

const OffersScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MobileHeader title="OFFER" onMenu={() => {}} />

      {/* --- Header Section --- */}
      <View style={styles.header}>
        <GlowingSeparator />
        <Text style={styles.headerTitle}>4 Message is Unread</Text>
      </View>

      {/* --- Promotion Cards List --- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        {OFFERS_DATA.map(item => (
          <View key={item.id} style={styles.cardContainer}>
            {/* --- Image Banner with Overlay Text & Button --- */}
            <ImageBackground
              source={{
                uri: 'https://www.schwartz.co.uk/-/media/project/oneweb/schwartz/recipes/recipe_image_update/march_18_2025/easy_pizza_recipe_800x800.webp?rev=217b39d7488a4aa7947174d6e475219f&vd=20250325T174436Z&extension=webp&hash=36F310B7BA2EA4491AADEC213844DF8B',
              }}
              style={styles.bannerImage}
              resizeMode="cover"
            >
              {/* Optional translucent tint to improve text visibility if needed */}
              <View style={styles.overlayContainer}>
                <Text style={styles.promoText}>{item.promoText}</Text>

                <TouchableOpacity style={styles.cartButton}>
                  <Text style={styles.cartButtonText}>Cart</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>

            {/* --- Details Footer --- */}
            <View style={styles.detailsBlock}>
              <View style={styles.titlePriceRow}>
                <Text style={styles.mainTitle}>{item.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.currentPrice}>{item.price}</Text>
                  {item.oldPrice && (
                    <Text style={styles.oldPrice}>{item.oldPrice}</Text>
                  )}
                </View>
              </View>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: COLORS.theme, // UI Theme orange
    paddingBottom: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  scrollPadding: {
    paddingBottom: verticalScale(20),
  },
  cardContainer: {
    width: '100%',
    marginBottom: verticalScale(1), // Clean divider gap between the blocks
  },
  bannerImage: {
    width: '100%',
    height: verticalScale(180),
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // Light overlay to balance photo exposure
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoText: {
    color: '#FFFFFF',
    fontSize: moderateScale(28),
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cartButton: {
    backgroundColor: '#FFCC00', // Deep Yellow/Gold from mockup
    paddingHorizontal: scale(45),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(20),
    marginTop: verticalScale(10),
  },
  cartButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  detailsBlock: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  titlePriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#333333',
    marginRight: scale(10),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#444444',
  },
  oldPrice: {
    fontSize: moderateScale(13),
    color: '#999999',
    textDecorationLine: 'line-through',
    marginLeft: scale(6),
  },
  dateText: {
    fontSize: moderateScale(10),
    color: '#666666',
    fontWeight: '600',
    marginTop: verticalScale(4),
  },
});

export default OffersScreen;
