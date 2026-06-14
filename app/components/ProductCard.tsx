import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
// import { PrimaryButton } from '@/components/PrimaryButton';
import { AppText, QuantitySelector } from '@/components';
import { moderateScale, verticalScale } from '@/utils/ScreenSize';
import { useCartStore } from '@/stores/cartStore';
import { Product } from '@/stores/types';

function ProductCard({ navigation, item }: { navigation: any; item: Product }) {
  const quantity = useCartStore(
    state =>
      state.products.find(product => product.id === item.id)?.quantity ?? 0,
  );
  const addToCart = useCartStore(state => state.addToCart);
  const updateProductQuantity = useCartStore(
    state => state.updateProductQuantity,
  );
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const handleCart = (qty: number) => {
    // console.log(qty)
    if (quantity === 0) {
      addToCart({ ...item, quantity: qty });
    } else {
      updateProductQuantity(item.id, qty);
    }
  };
  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <View style={styles.productCard}>
      <Pressable
        onPress={() => {
          navigation.navigate('FoodDetailScreen', { productId: item.id });
        }}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <AppText numberOfLines={1} style={styles.productName}>
          {item.name}
        </AppText>
        <AppText style={styles.productPrice}>
          ${item.price}{' '}
          {item.oldPrice && (
            <AppText style={styles.discount}>${item.oldPrice}</AppText>
          )}
        </AppText>
        {/* <AppText style={styles.productPrice}>${item.price} {item.currency}</AppText> */}
      </Pressable>
      {/* {quantity > 0 ? (
        <View style={styles.cartButton}>
          <QuantitySelector quantity={quantity} onChange={handleCart} />
        </View>
      ) : (
        <PrimaryButton
          label="Add to Cart"
          onPress={() => handleCart(1)}
          style={styles.cartButton}
        />
      )} */}
      <View style={styles.cartButton}>
        <QuantitySelector
          quantity={quantity}
          onChange={handleCart}
          onDelete={handleRemove}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: '47.5%',
    borderRadius: moderateScale(12),
    backgroundColor: '#FFFFFF',
    padding: moderateScale(12),
    // ...Shadows.medium,
  },

  productImage: {
    width: '100%',
    height: verticalScale(98),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(10),
    backgroundColor: '#F1F3FF',
  },

  productName: {
    color: '#202632',
    fontWeight: '500',
    // textAlign: 'center',
  },

  productPrice: {
    color: '#D39149',
    fontWeight: '700',
    // textAlign: 'center',
    marginTop: verticalScale(4),
  },

  discount: {
    color: '#6f737c',
    fontWeight: '500',
    // textAlign: 'center',
    marginTop: verticalScale(4),
    textDecorationLine: 'line-through',
  },

  cartButton: {
    marginTop: verticalScale(12),
    alignItems: 'center',
    // minHeight: moderateScale(45),
    justifyContent: 'center',
  },
});

export default React.memo(ProductCard);
