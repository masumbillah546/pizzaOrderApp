import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';
import { CART_DATA, CartItem } from './CartScreen';

// --- Types ---

interface ReceiptRowProps {
  label: string;
  value: string;
}

const ReceiptRow = ({ label, value }: ReceiptRowProps) => {
  return (
    <View style={styles.rowContainer}>
      {/* Left Label */}
      <Text style={styles.labelText}>{label}</Text>

      {/* The Dynamic Dotted Connector */}
      <View style={styles.dottedLine} />

      {/* Right Value */}
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const OrderDetailsScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      <MobileHeader title="ORDER DETAIL" onBack={() => navigation.goBack()}  />
      <GlowingSeparator />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Your Order ID : <Text style={styles.boldText}>D5FX2</Text>
        </Text>
      </View>

      {/* --- Cart Items List --- */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {CART_DATA.map(item => (
          <CartItem key={item.id} item={item} isDetails={true}/>
        ))}
      </ScrollView>
      <View style={styles.recieptContainer}>
        <ReceiptRow label="You Cart" value="5 Item" />
        <ReceiptRow label="Total Price" value="$60" />
        <ReceiptRow label="Payment Method" value="Cash" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: COLORS.theme, // Primary Brand Orange
    paddingVertical: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(15),
    fontWeight: '400',
  },
  boldText: {
    fontWeight: 'bold',
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(100), // Spacing for absolute footer
  },
  recieptContainer: {
    backgroundColor: '#424242', // Dark grey background matching your image
    justifyContent: 'center',
    padding: scale(24),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Aligns the text bottoms with the dots perfectly
    marginVertical: verticalScale(10),
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  dottedLine: {
    flex: 1, // Takes up all available space between text elements
    borderStyle: 'dotted',
    borderBottomWidth: 2,
    borderColor: '#A1A1A1', // Color of the dots
    marginRight: scale(10), // Space between text and the dots
    marginBottom: verticalScale(4), // Tiny offset to align with text base baseline
  },
  valueText: {
    color: '#E08543', // Orange/Peach color from your design
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default OrderDetailsScreen;
