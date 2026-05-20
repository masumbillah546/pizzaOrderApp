import React, { use } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import AppText from './AppText';
import { BorderRadius, COLORS, FontSizes } from '@/constants/theme';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import Logo from './Logo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const menuItems = [
  { title: 'Main Menu', screen: 'CategoriesScreen' },
  { title: 'Food Tracking', screen: 'OrderTrackingScreen' },
  { title: 'Offer', screen: 'OfferScreen' },
  { title: 'Order Now', screen: 'HomeScreen' },
  { title: 'Cart', screen: 'CartScreen' },
  { title: 'Order History', screen: 'OrderHistoryScreen' },
  { title: 'Fedility Card', screen: 'FedilityCardScreen' },
  { title: 'Messenger', screen: 'NotificationScreen' },
  { title: 'Gallery', screen: 'GalleryScreen' },
  { title: 'Food & Table Booking', screen: 'TableBookingScreen' },
  { title: 'Settings', screen: 'CoinsScreen' },
];

type SideBarProps = {
  name: string;
  email: string;
  subscriptionLabel: string;
  lastRenewal: string;
  validTill: string;
  onClose: () => void;
  onOpenDetails: () => void;
  onLogout: () => void;
  navigation: any;
};

export default function SideBar(props: SideBarProps) {
  const [active, setActive] = React.useState(0);
  const SAI = useSafeAreaInsets();
  const handleNavigation = (item: any, index: number) => {
    setActive(index);
    props.navigation.navigate(item.screen);
  };
  return (
    <LinearGradient
      colors={[COLORS.warning[400], COLORS.theme]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.overlay}
    >
      <View
        style={[
          styles.userInfo,
          { paddingTop: SAI.top, height: moderateScale(180) + SAI.top },
        ]}
      >
        {/* <View
          style={{
            borderRadius: BorderRadius.full,
            backgroundColor: COLORS.theme,
            height: '100%',
            width: '100%',
            marginLeft: - scale(130),
          }}
        ></View> */}
        <Logo style={{ marginLeft: -scale(70) }} />
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: scale(20),
            paddingTop: verticalScale(20),
            paddingBottom: verticalScale(10),
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileScreen')}
            style={{
              width: scale(90),
              height: scale(90),
              borderRadius: scale(10),
              overflow: 'hidden',
            }}
          >
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyW1LFVLrTeSynKd6fZW2JFbbIwM3-jBJilg&s',
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: scale(10),
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <AppText
            style={{
              fontSize: FontSizes.lg,
              fontWeight: 'bold',
              color: COLORS.theme,
            }}
          >
            Jhon Doe
          </AppText>
          <AppText style={{ fontSize: FontSizes.sm, fontWeight: 'bold' }}>
            ID No: 12345
          </AppText>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {menuItems.map((item, index) => (
          <TouchableHighlight
            key={index}
            onPress={() => handleNavigation(item, index)}
            underlayColor={COLORS.white + '50'}
            style={[
              styles.item,
              active === index && { backgroundColor: COLORS.white + '50' },
            ]}
          >
            <View>
              <Text style={styles.text}>{item.title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8E0B1',
    // height: verticalScale(150),
    alignItems: 'center',
    overflow: 'hidden',
    height: moderateScale(180),
  },

  item: {
    padding: moderateScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: scale(5),
  },

  text: {
    color: COLORS.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
    textAlign: 'right',
  },
});
