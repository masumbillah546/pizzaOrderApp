import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Star } from 'lucide-react-native';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';

const FoodDetailScreen = ({ navigation }: { navigation: any }) => {
  const ingredients = [
    'Lorem Ipsum',
    'Lorem Ipsum',
    'Lorem Ipsum',
    'Lorem Ipsum',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Custom Header --- */}
      <MobileHeader title="FOOD DETAILS" onBack={() => navigation.goBack()} />
      <GlowingSeparator />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bargar King</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Hero Image --- */}
        <Image
          source={{
            uri: 'https://www.schwartz.co.uk/-/media/project/oneweb/schwartz/recipes/recipe_image_update/march_18_2025/easy_pizza_recipe_800x800.webp?rev=217b39d7488a4aa7947174d6e475219f&vd=20250325T174436Z&extension=webp&hash=36F310B7BA2EA4491AADEC213844DF8B',
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          {/* --- Title and Price Row --- */}
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.mainTitle}>BARGUR KING</Text>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4].map(i => (
                  <Star
                    key={i}
                    size={moderateScale(14)}
                    fill="#FFD700"
                    color="#FFD700"
                  />
                ))}
                <Star size={moderateScale(14)} color="#C4C4C4" />
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>$6.50</Text>
              <Text style={styles.oldPrice}>$100</Text>
            </View>

            <TouchableOpacity style={styles.cartButton}>
              <Text style={styles.cartButtonText}>Cart</Text>
            </TouchableOpacity>
          </View>

          {/* --- Description --- */}
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remainin
          </Text>

          {/* --- Ingredients Section --- */}
          <View style={styles.ingredientsSection}>
            <Text style={styles.sectionTitle}>INGREDIENT</Text>
            {ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
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
    backgroundColor: COLORS.theme,
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  heroImage: {
    width: '100%',
    height: verticalScale(200),
  },
  contentContainer: {
    padding: moderateScale(20),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  mainTitle: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: '#333',
  },
  ratingRow: {
    flexDirection: 'row',
    marginTop: verticalScale(4),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentPrice: {
    fontSize: moderateScale(16),
    color: '#666',
    fontWeight: '500',
  },
  oldPrice: {
    fontSize: moderateScale(14),
    color: '#AAA',
    textDecorationLine: 'line-through',
    marginLeft: scale(5),
  },
  cartButton: {
    backgroundColor: '#F4A472',
    paddingHorizontal: scale(25),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(25),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  description: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: '#555',
    textAlign: 'justify',
    marginBottom: verticalScale(25),
  },
  ingredientsSection: {
    marginTop: verticalScale(5),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(10),
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  bulletPoint: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: '#444',
    marginRight: scale(10),
  },
  ingredientText: {
    fontSize: moderateScale(16),
    color: '#444',
  },
});

export default FoodDetailScreen;
