import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MapPin, ChevronDown, Info, Twitter, Facebook } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { MobileHeader } from '@/components';

interface AboutScreenProps {
  onLocationChangePress?: () => void;
  onInfoBadgePress?: () => void;
  onSocialMediaPress?: (platform: 'twitter' | 'google' | 'facebook') => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({
  onLocationChangePress,
  onInfoBadgePress,
  onSocialMediaPress,
  navigation
}) => {
  // Hardcoded location indicator string reflecting the design layout spec
  const [currentLocation] = useState<string>('Mirpu-11,Dhaka');

  // Simplified custom icon component to precisely render the classic Google Plus circle
  const GooglePlusIcon = ({ size = 24 }: { size?: number }) => (
    <View style={[styles.googlePlusCircleCircle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.googlePlusCustomIconText}>G+</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
     <MobileHeader title="ABOUT US" onBack={() => navigation.goBack()} />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollCanvasContainer}
      >
        {/* --- SECTION 1: Kitchen Interior Landscape Hero Graphic Banner --- */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600' }}
          style={styles.heroKitchenImageBanner}
          resizeMode="cover"
        />

        {/* --- SECTION 2: Explanatory Restaurant Description Text Block --- */}
        <View style={styles.textDetailsWrapperFrame}>
          <Text style={styles.loremParagraphBodyText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
          </Text>
        </View>

        {/* --- SECTION 3: Operations & Location Selector Meta Cluster --- */}
        <View style={styles.operationalMetaCardBlock}>
          
          {/* Picker Action Interactive Header Row */}
          <View style={styles.locationSelectorInteractiveHeaderRow}>
            <TouchableOpacity 
              style={styles.locationButtonHitboxRow}
              activeOpacity={0.7}
              onPress={onLocationChangePress}
            >
              <MapPin size={moderateScale(22)} color="#F4A472" strokeWidth={2.5} style={styles.locationMarkerGap} />
              <Text style={styles.currentLocationLabelStringText}>{currentLocation}</Text>
              <ChevronDown size={moderateScale(18)} color="#F4A472" strokeWidth={3} style={styles.chevronGapModifier} />
            </TouchableOpacity>

            {/* Info Auxiliary Circular Tooltip Trigger */}
            <TouchableOpacity activeOpacity={0.6} onPress={onInfoBadgePress}>
              <Info size={moderateScale(20)} color="#F4A472" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {/* Operational Hours / Closing Schedules Framework Layout Rows */}
          <View style={styles.hoursScheduleGridLinesBox}>
            <Text style={styles.scheduleKeyLabelText}>
              Closing Day <Text style={styles.scheduleSeparatorText}>-</Text> <Text style={styles.closingDayHighlightedValueText}>Every Tuesday</Text>
            </Text>
            <Text style={styles.scheduleKeyLabelText}>
              Open <Text style={styles.scheduleSeparatorText}>:</Text> <Text style={styles.openHoursValueText}>9AM-10 PM</Text>
            </Text>
          </View>
        </View>

        {/* --- SECTION 4: Static Coordinate Mapping Component Sheet Canvas --- */}
        <View style={styles.mapCanvasOuterFrameContainer}>
          {/* Static Map visual mockup matching layout features */}
          <Image
            source={{ uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/90.3900,23.7900,12,0/500x300?access_token=mock' }}
            style={styles.staticMockupMapGraphicElement}
            resizeMode="cover"
          />
        </View>

        {/* --- SECTION 5: Social Channels Integration Footer Grid Layout --- */}
        {/* <View style={styles.socialMediaChannelsFooterLayoutRow}>
          <Text style={styles.socialChannelsIndicatorLabelText}>Social Media :</Text>
          
          <View style={styles.interactiveIconClusterGroup}>
            <TouchableOpacity 
              style={[styles.socialPillCircleShape, styles.twitterBlueBrandBackground]}
              activeOpacity={0.75}
              onPress={() => onSocialMediaPress?.('twitter')}
            >
              <Twitter size={moderateScale(18)} color="#FFFFFF" fill="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.75}
              onPress={() => onSocialMediaPress?.('google')}
            >
              <GooglePlusIcon size={moderateScale(34)} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.socialPillCircleShape, styles.facebookBlueBrandBackground]}
              activeOpacity={0.75}
              onPress={() => onSocialMediaPress?.('facebook')}
            >
              <Facebook size={moderateScale(18)} color="#FFFFFF" fill="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View> */}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollCanvasContainer: {
    paddingBottom: verticalScale(32),
  },
  /* --- Kitchen Hero Graphic Core Bounds --- */
  heroKitchenImageBanner: {
    width: '100%',
    height: verticalScale(240),
    backgroundColor: '#EAEAEA',
  },
  /* --- Explanatory Paragraph Content Typography --- */
  textDetailsWrapperFrame: {
    paddingHorizontal: scale(22),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(14),
  },
  loremParagraphBodyText: {
    fontSize: moderateScale(12.5),
    color: '#222222',
    lineHeight: moderateScale(17.5),
    fontWeight: '400',
    textAlign: 'left',
  },
  /* --- Meta Picker Controls Grid Layout Elements --- */
  operationalMetaCardBlock: {
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(6),
  },
  locationSelectorInteractiveHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  locationButtonHitboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationMarkerGap: {
    marginRight: scale(6),
  },
  currentLocationLabelStringText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#333333',
  },
  chevronGapModifier: {
    marginLeft: scale(4),
    marginTop: verticalScale(2),
  },
  /* --- Schedule Logs Metadata Typographical Configuration Blocks --- */
  hoursScheduleGridLinesBox: {
    gap: verticalScale(6),
    paddingLeft: scale(2),
  },
  scheduleKeyLabelText: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#222222',
  },
  scheduleSeparatorText: {
    fontWeight: '400',
    color: '#777777',
  },
  closingDayHighlightedValueText: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#F4A472', // Design orange-pastel signature highlighted status value token
  },
  openHoursValueText: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#F4A472',
  },
  /* --- Static Cartographic Maps Bounds Components --- */
  mapCanvasOuterFrameContainer: {
    paddingHorizontal: scale(22),
    marginVertical: verticalScale(16),
    width: '100%',
  },
  staticMockupMapGraphicElement: {
    width: '100%',
    height: verticalScale(160),
    backgroundColor: '#E5E3DF', // Traditional cartography base background tone placeholder
    borderRadius: moderateScale(2),
    borderWidth: scale(0.5),
    borderColor: '#DDDDDD',
  },
  /* --- Social Channels Integration Ribbon Configuration Layouts --- */
  socialMediaChannelsFooterLayoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(22),
    marginTop: verticalScale(14),
    height: verticalScale(44),
  },
  socialChannelsIndicatorLabelText: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#333333',
    marginRight: scale(16),
  },
  interactiveIconClusterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(16),
  },
  socialPillCircleShape: {
    width: scale(34),
    height: scale(34),
    borderRadius: moderateScale(17),
    justifyContent: 'center',
    alignItems: 'center',
  },
  twitterBlueBrandBackground: {
    backgroundColor: '#55ACEE',
  },
  facebookBlueBrandBackground: {
    backgroundColor: '#3B5998',
  },
  /* --- Hand-Crafted G+ Design Matrix Element Styles --- */
  googlePlusCircleCircle: {
    backgroundColor: '#DC4E41',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googlePlusCustomIconText: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
});

export default AboutScreen;