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
  MinusCircle,
  PlusCircle,
  XCircle,
  Beef,
  GlassWater,
  Coffee,
  Home,
} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';

// --- Types ---
interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image: any;
  category: 'food' | 'drink' | 'hot';
}

export const CART_DATA: CartItem[] = [
  {
    id: '1',
    title: 'Margherita: tomato sauce',
    price: '$ 10',
    quantity: 1,
    image: 'https://via.placeholder.com/150',
    category: 'food',
  },
  {
    id: '2',
    title: 'Cocacola(1/2ltr)',
    price: '$ 2',
    quantity: 1,
    image: 'https://via.placeholder.com/150',
    category: 'drink',
  },
  {
    id: '3',
    title: 'Cocacola(1 pag)',
    price: '$ 2',
    quantity: 1,
    image: 'https://via.placeholder.com/150',
    category: 'hot', // Uses the coffee icon/yellow badge style from image
  },
  {
    id: '4',
    title: 'Pizza kings',
    price: '$ 2',
    quantity: 1,
    image: 'https://via.placeholder.com/150',
    category: 'food',
  },
  {
    id: '5',
    title: 'Margherita: tomato sauce',
    price: '$ 10',
    quantity: 1,
    image: 'https://via.placeholder.com/150',
    category: 'food',
  },
];

export const CartItem = ({ item }: { item: CartItem }) => {
  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case 'food':
        return <Beef color="black" size={moderateScale(20)} />;
      case 'drink':
        return <GlassWater color="black" size={moderateScale(20)} />;
      case 'hot':
        return <Coffee color="black" size={moderateScale(20)} />;
      default:
        return null;
    }
  };
  return (
    <View key={item.id} style={styles.cardContainer}>
      {/* Absolute Positioned Delete Button */}
      <TouchableOpacity style={styles.deleteButton}>
        <XCircle size={moderateScale(20)} color="#F4A472" fill="white" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://www.schwartz.co.uk/-/media/project/oneweb/schwartz/recipes/recipe_image_update/march_18_2025/easy_pizza_recipe_800x800.webp?rev=217b39d7488a4aa7947174d6e475219f&vd=20250325T174436Z&extension=webp&hash=36F310B7BA2EA4491AADEC213844DF8B',
          }}
          style={styles.itemImage}
          resizeMode="contain"
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.itemPrice}>
            Price :<Text style={styles.priceBold}> {item.price}</Text>
          </Text>
        </View>

        {/* Quantity Selector & Right Tag Column */}
        <View style={styles.rightColumn}>
          <View style={styles.quantityRow}>
            <TouchableOpacity>
              <MinusCircle size={moderateScale(20)} color="#7A7A7A" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity>
              <PlusCircle size={moderateScale(20)} color="#7A7A7A" />
            </TouchableOpacity>
          </View>

          <View style={styles.categoryBadge}>
            {renderCategoryIcon(item.category)}
          </View>
        </View>
      </View>
    </View>
  );
};

const CartScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <MobileHeader
        title="MY CART"
        onMenu={() => {}}
        leftIcon={<Home size={moderateScale(24)} color="white" />}
        onLeftPress={() => navigation.navigate('HomeScreen')}
      />
      <GlowingSeparator />
      {/* --- Header Section --- */}
      <View style={styles.header}>
        <Text style={styles.headerCount}>You have 4 item</Text>
        <Text style={styles.headerCost}>Cost : $16</Text>
      </View>

      {/* --- Cart Items List --- */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {CART_DATA.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </ScrollView>

      {/* --- Bottom Action Buttons --- */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.deliveryBtn]}
          onPress={() => navigation.navigate('ConfirmCartScreen')}
        >
          <Text style={styles.btnText}>DILEVERY</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.pickupBtn]}
          onPress={() => navigation.navigate('ConfirmCartScreen')}
        >
          <Text style={styles.btnText}>PICK UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    backgroundColor: COLORS.theme,
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    position: 'relative',
  },
  headerCount: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  headerCost: {
    color: '#333333',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginTop: verticalScale(5),
  },
  listContainer: {
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(100), // Spacing for absolute footer
  },
  cardContainer: {
    position: 'relative',
    marginBottom: verticalScale(20),
  },
  card: {
    backgroundColor: '#FDFDFD',
    borderRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: '#EFEFEF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  deleteButton: {
    position: 'absolute',
    top: verticalScale(-8),
    right: scale(-6),
    zIndex: 10,
  },
  itemImage: {
    width: scale(65),
    height: scale(65),
    borderRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#222',
  },
  itemPrice: {
    fontSize: moderateScale(12),
    color: '#555',
    marginTop: verticalScale(6),
  },
  priceBold: {
    fontWeight: 'bold',
  },
  rightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: scale(65),
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: moderateScale(14),
    color: '#F4A472',
    fontWeight: '600',
    marginHorizontal: scale(8),
  },
  categoryBadge: {
    backgroundColor: '#FFCC00',
    width: scale(55),
    height: verticalScale(24),
    borderTopLeftRadius: moderateScale(4),
    borderBottomLeftRadius: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(-10), // Flushes it right to the edge of the card
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(20),
  },
  actionButton: {
    flex: 0.47,
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  deliveryBtn: {
    backgroundColor: '#F4A472',
  },
  pickupBtn: {
    backgroundColor: '#FFCC00',
  },
  btnText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default CartScreen;
