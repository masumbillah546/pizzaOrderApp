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
import { Timer } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { COLORS } from '@/constants/theme';
import OrderSuccessModal from '@/components/modals/OrderSuccessModal';
import RattingModal from '@/components/modals/RattingModal';
import { GlowingSeparator, MobileHeader } from '@/components';

// --- Types ---
interface OrderItem {
  id: string;
  orderId: string;
  itemCount: number;
  statusText: string;
  isActive: boolean;
  image: any;
}

const ORDER_HISTORY_DATA: OrderItem[] = [
  {
    id: '1',
    orderId: 'D5FX2',
    itemCount: 2,
    statusText: 'Running (10 Min left)',
    isActive: true,
    image: 'https://via.placeholder.com/150', // Replace with your local assets
  },
  {
    id: '2',
    orderId: 'DgIX2',
    itemCount: 2,
    statusText: "Order's Done",
    isActive: false,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    orderId: 'DgIX2',
    itemCount: 2,
    statusText: "Order's Done",
    isActive: false,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    orderId: 'DgIX2',
    itemCount: 2,
    statusText: "Order's Done",
    isActive: false,
    image: 'https://via.placeholder.com/150',
  },
];

const OrderHistoryScreen = ({ navigation }: { navigation: any }) => {
  const [isOrderSuccessModalVisible, setIsOrderSuccessModalVisible] =
    React.useState(false);
  const [isRattingModalVisible, setIsRattingModalVisible] =
    React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <MobileHeader title="ORDER HISTORY" onMenu={() => {}} />
      <GlowingSeparator />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order list and status</Text>
      </View>

      {/* --- Scrollable Order List --- */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {ORDER_HISTORY_DATA.map(item => (
          <View key={item.id} style={styles.card}>
            {/* Left Thumbnail Image */}
            <Image
              source={{
                uri: 'https://www.schwartz.co.uk/-/media/project/oneweb/schwartz/recipes/recipe_image_update/march_18_2025/easy_pizza_recipe_800x800.webp?rev=217b39d7488a4aa7947174d6e475219f&vd=20250325T174436Z&extension=webp&hash=36F310B7BA2EA4491AADEC213844DF8B',
              }}
              style={styles.itemImage}
              resizeMode="cover"
            />

            {/* Central Information Block */}
            <View style={styles.detailsContainer}>
              <Text style={styles.orderIdText}>
                Your Order ID :{' '}
                <Text style={styles.idHighlight}>{item.orderId}</Text> (
                {item.itemCount} item)
              </Text>

              <View style={styles.statusRow}>
                <Timer
                  size={moderateScale(14)}
                  color="#555555"
                  style={styles.timerIcon}
                />
                <Text style={styles.statusDescription}>{item.statusText}</Text>
              </View>
            </View>

            {/* Right Action Buttons Column */}
            <View style={styles.actionsContainer}>
              {item.isActive ? (
                <>
                  <TouchableOpacity
                    style={[styles.btn, styles.orangeBtn]}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('OrderDetailsScreen')}
                  >
                    <Text style={styles.btnText}>Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, styles.yellowBtn]}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('OrderTrackingScreen')}
                  >
                    <Text style={styles.btnText}>Status</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.btn, styles.greyBtn]}
                  activeOpacity={0.8}
                  onPress={() => setIsRattingModalVisible(true)}
                >
                  <Text style={styles.btnText}>Rate us</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <OrderSuccessModal visible={false} orderId="D5FX2" onClose={() => {}} />
      <RattingModal
        visible={isRattingModalVisible}
        onClose={() => setIsRattingModalVisible(false)}
        onSubmit={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: COLORS.theme, // UI Brand Orange
    paddingVertical: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
  },
  card: {
    backgroundColor: '#FAFAFA',
    borderRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(12),
    marginBottom: verticalScale(15),
    // Drop shadow styling matching mockup definition
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemImage: {
    width: scale(55),
    height: scale(55),
    borderRadius: moderateScale(2),
  },
  detailsContainer: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'center',
  },
  orderIdText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#333333',
  },
  idHighlight: {
    color: '#D9383A', // Direct red highlight signature from image_0da5a2.png
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(6),
  },
  timerIcon: {
    marginRight: scale(4),
  },
  statusDescription: {
    fontSize: moderateScale(11),
    color: '#555555',
    fontWeight: '500',
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(85),
  },
  btn: {
    width: '100%',
    height: verticalScale(24),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  orangeBtn: {
    backgroundColor: '#F4A472',
    marginBottom: verticalScale(6),
  },
  yellowBtn: {
    backgroundColor: '#FFCC00',
  },
  greyBtn: {
    backgroundColor: '#A8A8A8',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: moderateScale(11),
    fontWeight: '700',
  },
});

export default OrderHistoryScreen;
