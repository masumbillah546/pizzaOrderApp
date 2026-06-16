import React, { useEffect } from 'react';
import { Keyboard, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import MainHeader from '../components/MainHeader';
//
import {
  NotificationScreen,
  NotificationsCenterScreen,
  ProfileScreen,
  HomeScreen,
  SearchScreen,
  Support,
  PersonalInfo,
  PasswordScreen,
  FoodDetailScreen,
  CartScreen,
  GalleryScreen,
  OfferScreen,
  EditProfileScreen,
  ChatScreen,
  OrderHistoryScreen,
  OrderTrackingScreen,
  TableBookingScreen,
  FedilityCardScreen,
  CategoriesScreen,
  CategoryItemScreen,
  BuyingOptionScreen,
  OrderDetailsScreen,
  TableFoodScreen,
  ConfirmCartScreen,
  CheckoutScreen,
  PickupTimeScreen,
  EventsScreen,
  AboutScreen,
  ProductsScreen,
  BookingHistoryScreen,
} from '@/screens';
//
import { COLORS, FontSizes } from '@/constants/theme';
import { scale, verticalScale } from '../utils/ScreenSize';
import NavigationHeader from '@/components/NavigationHeader';
import { screenOptionsAuth } from './AuthStack';
import WebViewScreen from '@/screens/user/WebViewScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SideBar } from '@/components';

const Stack = createNativeStackNavigator();
type DrawerParamList = {
  Home: undefined;
  Profile: { userId: string };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const screenOptions = (): any => ({
  headerShown: true,
  headerTintColor: COLORS.black,
  headerStyle: {
    backgroundColor: COLORS.theme,
    elevation: 0,
    shadowOpacity: 0,
    height: verticalScale(45),
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: COLORS.white,
    alignItems: 'center',
    fontSize: FontSizes.sm_header,
    fontWeight: '500',
  },
  header: (props: any) => <NavigationHeader {...props} />,
});

export const languageSheetRefMain = React.createRef<any>();
export const acceptJobSheetRefMain = React.createRef<any>();
export const acceptedOfferSheet = React.createRef<any>();

export default function DrawerStack() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     acceptedOfferSheet.current?.expand();
  //   }, 10000);
  // }, []);

  return (
    <Drawer.Navigator
      drawerContent={props => <SideBar {...props} />}
      screenOptions={{
        // header: (props: DrawerHeaderProps) => <HomePageHeader {...props} />,
        drawerStyle: {
          width: scale(260), // <-- your desired width in pixels
          backgroundColor: '#fff', // optional background color
        },
        drawerPosition: 'right',
        headerShown: false,
      }}

      // screenOptions={screenOptionsAuth}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        // options={{ title: 'Messages' }}
      />
    </Drawer.Navigator>
  );
}

export default function MainStack() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     acceptedOfferSheet.current?.expand();
  //   }, 10000);
  // }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Keeps headers hidden globally just like your drawer config
      }}
    >
      <Stack.Screen name="HomeScreen" component={DrawerStack} />
      <Stack.Screen name="FoodDetailScreen" component={FoodDetailScreen} />
      <Stack.Screen name="BuyingOptionScreen" component={BuyingOptionScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ConfirmCartScreen" component={ConfirmCartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="PickupTimeScreen" component={PickupTimeScreen} />
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="OfferScreen" component={OfferScreen} />
      <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} />
      <Stack.Screen name="BookingHistoryScreen" component={BookingHistoryScreen} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen name="FedilityCardScreen" component={FedilityCardScreen} />
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen name="CategoryItemScreen" component={CategoryItemScreen} />
      <Stack.Screen
        name="OrderTrackingScreen"
        component={OrderTrackingScreen}
      />
      <Stack.Screen name="TableBookingScreen" component={TableBookingScreen} />
      <Stack.Screen name="TableFoodScreen" component={TableFoodScreen} />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Message Details',
        }}
      />
      <Stack.Screen
        name="NotificationsCenter"
        component={NotificationsCenterScreen}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Personal Info' }}
      />
      <Stack.Screen
        name="ProfileEditScreen"
        component={EditProfileScreen}
        options={{ title: 'Personal Info' }}
      />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="SupportScreen"
        component={Support}
        options={{ title: 'Support' }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: 'Find your Location' }}
      />
      <Stack.Screen
        name="HowToUseScreen"
        component={WebViewScreen}
        options={{ title: 'How To Use' }}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={WebViewScreen}
        options={{ title: 'Privacy & Policy' }}
      />
    </Stack.Navigator>
  );
}
