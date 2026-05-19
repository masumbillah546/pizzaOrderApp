import { View, StyleSheet } from 'react-native';
import { AppText } from '@/components';
import { moderateScale } from '@/utils/ScreenSize';
import { COLORS, FontSizes } from '@/constants/theme';
import { Hamburger } from 'lucide-react-native/icons';
import { useCartStore } from '@/stores/cartStore';

const CartCounter = () => {
  const totalItem = useCartStore(state => state.total);

  return (
    <View style={{ position: 'relative' }}>
      <Hamburger color={COLORS.white} size={moderateScale(24)} />
      {totalItem > 0 && (
        <View style={styles.indicator}>
          <AppText style={styles.counter}>{totalItem}</AppText>
        </View>
      )}
    </View>
  );
};

export default CartCounter;

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    right: -moderateScale(5),
    top: -moderateScale(5),
    backgroundColor: 'red',
    borderRadius: moderateScale(8),
    width: moderateScale(16),
    height: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    color: 'white',
    fontSize: moderateScale(10),
    lineHeight: FontSizes.xs,
  },
});
