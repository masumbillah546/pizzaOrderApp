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

export default function MainStack() {
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
      <Drawer.Screen
        name="FoodDetailScreen"
        component={FoodDetailScreen}
        // options={{ title: 'Messages' }}
      />
      <Drawer.Screen
        name="BuyingOptionScreen"
        component={BuyingOptionScreen}
        // options={{ title: 'Messages' }}
      />
      <Drawer.Screen
        name="CartScreen"
        component={CartScreen}
        // options={{ title: 'Messages' }}
      />
      <Drawer.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        // options={{ title: 'Messages' }}
      />
      <Drawer.Screen
        name="OfferScreen"
        component={OfferScreen}
        // options={{ title: 'Messages' }}
      />

      <Drawer.Screen
        name="OrderHistoryScreen"
        component={OrderHistoryScreen}
        // options={{ title: 'Messages' }}
      />

      <Drawer.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
        // options={{ title: 'Messages' }}
      />

      <Drawer.Screen
        name="FedilityCardScreen"
        component={FedilityCardScreen}
        // options={{ title: 'Messages' }}
      />

      <Drawer.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        // options={{ title: 'Messages' }}
      />

      <Drawer.Screen
        name="CategoryItemScreen"
        component={CategoryItemScreen}
        // options={{ title: 'Messages' }}
      />

      <Drawer.Screen
        name="OrderTrackingScreen"
        component={OrderTrackingScreen}
        // options={{ title: 'Messages' }}
      />

      <Drawer.Screen
        name="TableBookingScreen"
        component={TableBookingScreen}
        // options={{ title: 'Messages' }}
      />

      <Drawer.Screen
        name="TableFoodScreen"
        component={TableFoodScreen}
        // options={{ title: 'Messages' }}
      />

      <Drawer.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={_props => ({
          title: 'Message Details',
        })}
      />
      <Drawer.Screen
        name="NotificationsCenter"
        component={NotificationsCenterScreen}
        options={{ title: 'Notifications' }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Personal Info' }}
      />
      <Drawer.Screen
        name="ProfileEditScreen"
        component={EditProfileScreen}
        options={{ title: 'Personal Info' }}
      />

      <Drawer.Screen
        name="ChatScreen"
        component={ChatScreen}
        // options={{ title: 'Messages' }}
      />

      <Drawer.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{ title: '' }}
      />
      <Drawer.Screen
        name="SupportScreen"
        component={Support}
        options={{ title: 'Support' }}
      />
      <Drawer.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: 'Find your Location' }}
      />

      <Drawer.Screen
        name="HowToUseScreen"
        component={WebViewScreen}
        options={{ title: 'How To Use' }}
      />
      <Drawer.Screen
        name="PrivacyPolicyScreen"
        component={WebViewScreen}
        options={{ title: 'Privacy & Policy' }}
      />
      <Drawer.Screen
        name="AboutScreen"
        component={WebViewScreen}
        options={{ title: 'About App' }}
      />
    </Drawer.Navigator>
  );
}
