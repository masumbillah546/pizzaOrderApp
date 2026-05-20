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
import {
  Utensils,
  Hamburger,
  Martini,
  ChevronRight,
  Star,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { ButtonLarge, CartCounter, MobileHeader } from '@/components';
import { Shadows } from '@/constants/theme';

// --- Types ---
interface FoodItem {
  id: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  isSpecial?: boolean;
}

export const FOOD_DATA: FoodItem[] = [
  {
    id: '1',
    title: 'Margherita: tomato sauce',
    description:
      'Tomato sauce, mozzarella, mushrooms, ham, eggs, artichoke, cocktail sausages, green olives.',
    price: '$ 10',
    rating: 4,
    image: 'https://via.placeholder.com/150', // Replace with your local assets
  },
  {
    id: '2',
    title: 'Maruti-101',
    description: '10% Alcohol, Energy Drinks',
    price: '$ 10',
    rating: 4,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Irish Coffee',
    description: 'With Fress coffee Bins',
    price: '$ 10',
    rating: 4,
    image: 'https://via.placeholder.com/150',
    isSpecial: true,
  },
  {
    id: '4',
    title: 'Cup Cake',
    description: 'With Fress coffee Bins',
    price: '$ 10',
    rating: 4,
    image: 'https://via.placeholder.com/150',
  },
];

export const PizzaCard = ({ item }: { item: FoodItem }) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FoodDetailScreen');
      }}
      key={item.id}
      style={styles.card}
    >
      <Image
        source={{
          uri: 'https://www.schwartz.co.uk/-/media/project/oneweb/schwartz/recipes/recipe_image_update/march_18_2025/easy_pizza_recipe_800x800.webp?rev=217b39d7488a4aa7947174d6e475219f&vd=20250325T174436Z&extension=webp&hash=36F310B7BA2EA4491AADEC213844DF8B',
        }}
        style={styles.foodImage}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.foodTitle}>{item.title}</Text>
        <Text style={styles.foodDesc} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map(s => (
            <Star
              key={s}
              size={moderateScale(14)}
              fill={s <= item.rating ? '#FFD700' : 'transparent'}
              color={s <= item.rating ? '#FFD700' : '#C4C4C4'}
            />
          ))}
        </View>

        <Text style={styles.priceText}>
          Price :<Text style={styles.priceBold}>{item.price}</Text>
        </Text>

        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyText}>Buy</Text>
        </TouchableOpacity>
      </View>

      {item.isSpecial && (
        <View style={styles.specialBadge}>
          <Text style={styles.specialText}>Todays{'\n'}Spacial</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const FoodCategoriesHeader = () => {
  return (
    <View style={styles.header}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={[styles.categoryBtn, styles.activeCategory]}>
          <Utensils color="black" size={moderateScale(24)} />
          <Text style={styles.categoryTextActive}>All Food</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBtn}>
          <Hamburger color="black" size={moderateScale(24)} />
          <Text style={styles.categoryText}>First Food</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryBtn}>
          <Martini color="black" size={moderateScale(24)} />
          <Text style={styles.categoryText}>Hard Drinks</Text>
        </TouchableOpacity>
      </ScrollView>
      <ChevronRight
        color="black"
        size={moderateScale(20)}
        style={styles.arrowIcon}
      />
    </View>
  );
};

const MenuPage = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <MobileHeader
        title="MY FOOD"
        // onBack={() => {}}
        onMenu={() => {}}
        // onRightPress={() => {}}
        // onLeftPress={() => {}}
        // rightIcon={null}
        // rightLabel={null}
        // leftIcon={null}
        // leftLabel={null}
        leftIcon={<CartCounter />}
        onLeftPress={() => navigation.navigate('CartScreen')}
      />
      {/* --- Category Header --- */}
      <FoodCategoriesHeader />

      {/* --- Product List --- */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {FOOD_DATA.map(item => (
          <PizzaCard key={item.id} item={item} />
        ))}
      </ScrollView>
      <ButtonLarge
        variant="warning"
        style={{
          marginBottom: verticalScale(30),
          ...Shadows.large,
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          opacity: 0.8,
        }}
        onPress={() => navigation.navigate('BuyingOptionScreen')}
        title="Buy Now!!"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#E69165',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: verticalScale(5),
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    height: verticalScale(50),
  },
  activeCategory: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
  categoryText: {
    color: 'white',
    fontSize: moderateScale(16),
    marginLeft: scale(8),
  },
  categoryTextActive: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginLeft: scale(8),
  },
  arrowIcon: {
    paddingRight: scale(10),
  },
  listContainer: {
    padding: moderateScale(15),
    paddingBottom: verticalScale(100),
    flexGrow: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    padding: moderateScale(10),
    marginBottom: verticalScale(10),
    // Shadow for iOS/Android
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  foodImage: {
    width: scale(130),
    height: scale(130),
    borderRadius: moderateScale(4),
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: scale(12),
  },
  foodTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#000',
  },
  foodDesc: {
    fontSize: moderateScale(12),
    color: '#666',
    marginVertical: verticalScale(4),
  },
  ratingRow: {
    flexDirection: 'row',
    marginVertical: verticalScale(4),
  },
  priceText: {
    fontSize: moderateScale(14),
    color: '#333',
  },
  priceBold: {
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#F4A472',
    width: scale(60),
    height: verticalScale(25),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  buyText: {
    color: 'white',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  specialBadge: {
    position: 'absolute',
    right: scale(10),
    top: 0,
    backgroundColor: '#F4A472',
    padding: scale(5),
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  specialText: {
    color: 'white',
    fontSize: moderateScale(8),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MenuPage;
