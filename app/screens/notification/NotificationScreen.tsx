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
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';

// --- Types ---
interface MessageItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  image: any;
  actionType?: 'details' | 'track';
  isSpecial?: boolean;
}

const MESSAGE_DATA: MessageItem[] = [
  {
    id: '1',
    title: 'New Pizza : tomato sauce',
    description:
      'Tomato sauce, mozzarella, mushrooms, ham, eggs, artichoke, cocktail sausages, green olives.',
    date: '5 May 2017',
    image: 'https://via.placeholder.com/150', // Replace with your local assets
    actionType: 'details',
  },
  {
    id: '2',
    title: 'Buy One Get One',
    description: 'If you Buy a pizza you get one free( 30 May to 30 June)',
    date: '5 May 2017',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Happy Birth day to you',
    date: '3 May 2017',
    image: 'https://via.placeholder.com/150', // Character icon from mockup
  },
  {
    id: '4',
    title: 'Offer for You',
    description: 'If you Buy a pizza you get one free( 30 May to 30 June)',
    date: '3 May 2017',
    image: 'https://via.placeholder.com/150',
    isSpecial: true,
  },
  {
    id: '5',
    title: 'We get your Order',
    description: 'Your Item ID : Pizza-12345',
    date: '38 Min Ago',
    image: 'https://via.placeholder.com/150',
    actionType: 'track',
  },
];

const NotificationScreen = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* --- Header Section --- */}
      <MobileHeader title="MESSAGE" onMenu={() => {}} />
      <GlowingSeparator />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>You have 4 Message</Text>
        <Text style={styles.headerSubtitle}>4 Unread</Text>
      </View>

      {/* --- Notification Scroll List --- */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {MESSAGE_DATA.map(item => (
          <View key={item.id} style={styles.card}>
            {/* Left Thumbnail Profile */}
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/054/680/000/non_2x/pizza-slice-with-colorful-toppings-and-crispy-crust-high-resolution-food-photography-free-png.png',
              }}
              style={styles.thumbImage}
              resizeMode="cover"
            />

            {/* Middle Content Details */}
            <View style={styles.contentContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.msgTitle}>{item.title}</Text>
                {item.isSpecial && (
                  <View style={styles.specialBadge}>
                    <Text style={styles.specialText}>Special</Text>
                  </View>
                )}
              </View>

              {item.description && (
                <Text style={styles.msgDesc} numberOfLines={2}>
                  {item.description}
                </Text>
              )}

              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            {/* Right Context Actions */}
            {item.actionType && (
              <View style={styles.actionColumn}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ChatScreen')}
                  style={[
                    styles.actionButton,
                    item.actionType === 'track'
                      ? styles.trackBtn
                      : styles.detailsBtn,
                  ]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionButtonText}>
                    {item.actionType === 'track' ? 'Track' : 'Details'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
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
    backgroundColor: COLORS.theme, // UI Theme orange
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  headerSubtitle: {
    color: '#333333',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginTop: verticalScale(4),
  },
  listContainer: {
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(20),
  },
  card: {
    backgroundColor: '#FAFAFA',
    borderRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: '#EAEAEA',
    flexDirection: 'row',
    padding: moderateScale(12),
    marginBottom: verticalScale(15),
    alignItems: 'center',
    // Shadow definition matching the UI layout
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  thumbImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: moderateScale(2),
  },
  contentContainer: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  msgTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#000000',
  },
  specialBadge: {
    backgroundColor: '#FFCC00', // Yellow accent color
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(4),
    marginLeft: scale(8),
  },
  specialText: {
    color: '#000000',
    fontSize: moderateScale(10),
    fontWeight: 'bold',
  },
  msgDesc: {
    fontSize: moderateScale(11),
    color: '#555555',
    marginTop: verticalScale(4),
    lineHeight: moderateScale(15),
  },
  dateText: {
    fontSize: moderateScale(9),
    color: '#888888',
    marginTop: verticalScale(4),
    fontWeight: '500',
  },
  actionColumn: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: scale(10),
  },
  actionButton: {
    width: scale(65),
    height: verticalScale(24),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsBtn: {
    backgroundColor: '#F4A472', // Orange theme accent
  },
  trackBtn: {
    backgroundColor: '#F4A472', // Mockup keeps both layout buttons matching orange profiles
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(11),
    fontWeight: '700',
  },
});

export default NotificationScreen;
