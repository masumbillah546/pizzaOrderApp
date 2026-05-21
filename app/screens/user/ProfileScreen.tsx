import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Svg, { Path, Defs, ClipPath, Image as SvgImage } from 'react-native-svg';

import { MapPin, ChevronRight, Clock } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';
import ProfilePhoto from './components/ProfilePhoto';

const ProfileScreen = ({ navigation }) => {
  const menuItems = ['PROFILE EDIT', 'MY HISTORY', 'FEDILITY PROFILE'];

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Header Section --- */}
      <MobileHeader title="PROFILE" onMenu={() => {}} />
      <GlowingSeparator />
      <View style={styles.header}>
        <Text style={styles.headerName}>John Doe</Text>
        <Text style={styles.headerEmail}>johndoe@mail.com</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Hero Banner Background --- */}
        <ImageBackground
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/003/031/750/small/dark-blue-wide-background-with-radial-blurred-gradient-vector.jpg',
          }} // Dark brown gradient asset or fallback background color
          style={styles.bannerContainer}
          tintColor={'black'}
        >
          <ProfilePhoto navigation={navigation} />

          {/* Location Identifier */}
          <View style={styles.locationRow}>
            <MapPin size={moderateScale(18)} color="#F4A472" />
            <Text style={styles.locationText}>Mirpu-11,Dhaka</Text>
          </View>

          {/* Absolute Position Status Badge */}
          <View style={styles.statusBadge}>
            <Clock size={moderateScale(16)} color="#556B2F" />
            <Text style={styles.statusText}>Processing</Text>
          </View>
        </ImageBackground>

        {/* --- Content Body --- */}
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>About me</Text>
          <Text style={styles.aboutText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has
          </Text>

          {/* --- Navigation List --- */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuButton}
                onPress={() => navigation.navigate('ProfileEditScreen')}
              >
                <Text style={styles.menuButtonText}>{item}</Text>
                <ChevronRight size={moderateScale(24)} color="#FFFFFF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  headerName: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  headerEmail: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
  },
  bannerContainer: {
    backgroundColor: '#2A1A0A', // Dark brown backup color matching background
    height: verticalScale(200),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(12),
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginLeft: scale(6),
  },
  statusBadge: {
    position: 'absolute',
    right: 0,
    top: '40%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderTopLeftRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  statusText: {
    color: '#333333',
    fontSize: moderateScale(12),
    fontWeight: '700',
    marginLeft: scale(6),
  },
  body: {
    padding: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#333333',
    marginBottom: verticalScale(6),
  },
  aboutText: {
    fontSize: moderateScale(13),
    lineHeight: moderateScale(18),
    color: '#333333',
    textAlign: 'justify',
    marginBottom: verticalScale(20),
  },
  menuContainer: {
    marginTop: verticalScale(5),
  },
  menuButton: {
    backgroundColor: COLORS.theme,
    height: verticalScale(52),
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    marginBottom: verticalScale(12),
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default ProfileScreen;
