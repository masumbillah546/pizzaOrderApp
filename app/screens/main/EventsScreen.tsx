import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { MobileHeader } from '@/components';

// --- Types & Schema Definitions ---
interface EventItem {
  id: string;
  title?: string; // Optional to reflect the conditional header missing on card 3
  date?: string; // Optional to reflect the conditional header missing on card 3
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  imageUri: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: '1',
    title: 'Jazz Party at Noon',
    date: '(24-12-2017)',
    description:
      'Enjoy your party with Jazz Music.Delecious food and different items are the main attriction of the party. Local Jazz Band will be there.',
    location: '14 parkstreest, Mirpur, Dhaka',
    startTime: '6PM',
    endTime: '10PM',
    imageUri:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400', // Concert crowd placeholder
  },
  {
    id: '2',
    title: 'Jazz Party at Noon',
    date: '(24-12-2017)',
    description:
      'Enjoy your party with Jazz Music.Delecious food and different items are the main attriction of the party. Local Jazz Band will be there.',
    location: '14 parkstreest, Mirpur, Dhaka',
    startTime: '6PM',
    endTime: '10PM',
    imageUri:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
  },
  {
    id: '3',
    // Card 3 mimics the exact design where title and date metadata blocks are empty/not rendered
    description:
      'Enjoy your party with Jazz Music.Delecious food and different items are the main attriction of the party. Local Jazz Band will be there.',
    location: '14 parkstreest, Mirpur, Dhaka',
    startTime: '6PM',
    endTime: '10PM',
    imageUri:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
  },
];

interface EventsScreenProps {
  onSharePress?: (id: string) => void;
}

const EventsScreen: React.FC<EventsScreenProps> = ({ onSharePress, navigation }) => {
  const renderEventCard = ({ item }: { item: EventItem }) => {
    return (
      <View style={styles.eventCard}>
        {/* Left Hand Side: Square Banner Frame Image */}
        <Image
          source={{ uri: item.imageUri }}
          style={styles.cardEventThumbnail}
          resizeMode="cover"
        />

        {/* Right Hand Side: Multi-Line Metadata Wrapper Box */}
        <View style={styles.cardDetailsColumn}>
          {/* Conditional Header Line (Title + Date Parameter Strings) */}
          {item.title && (
            <View style={styles.titleContextRow}>
              <Text style={styles.eventTitleText} numberOfLines={1}>
                {item.title}
              </Text>
              {item.date && (
                <Text style={styles.eventDateText}>{item.date}</Text>
              )}
            </View>
          )}

          {/* Description Paragraph Container */}
          <Text style={styles.descriptionParagraphBodyText} numberOfLines={2}>
            {item.description}
          </Text>

          {/* Structured Location Node Info Meta String */}
          <Text style={styles.metaInformationStringText}>
            Location :{' '}
            <Text style={styles.metaInlineValueText}>{item.location}</Text>
          </Text>

          {/* Dual Column Dynamic Timeline Schedule Grid Grid Row */}
          <View style={styles.timelineScheduleGridRow}>
            <Text style={styles.metaInformationStringText}>
              Began at :{' '}
              <Text style={styles.metaInlineValueText}>{item.startTime}</Text>
            </Text>
            <Text style={styles.metaInformationStringText}>
              Ends at :{' '}
              <Text style={styles.metaInlineValueText}>{item.endTime}</Text>
            </Text>
          </View>

          {/* Action Trigger Interactive Element Box Panel */}
          <TouchableOpacity
            style={styles.pastelOrangeSharePillButton}
            activeOpacity={0.8}
            onPress={() => onSharePress?.(item.id)}
          >
            <Text style={styles.shareActionLabelText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <MobileHeader title="EVENTS" onBack={() => navigation.goBack()}  />
      {/* --- Matrix Core Scrolling Canvas Layout Node --- */}
      <FlatList
        data={EVENTS_DATA}
        renderItem={renderEventCard}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listScrollingContainerPadding}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Clean uniform light workspace backing board ground canvas coat
  },
  listScrollingContainerPadding: {
    paddingHorizontal: scale(14),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
  },
  /* --- Structural Surface Card Bounding Components Elements --- */
  eventCard: {
    backgroundColor: '#F9F9F9', // Subtle off-white card canvas tint profile matching specs
    borderRadius: moderateScale(4),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(12),
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(20),
    // Drop Shadows Elevation Styling Guides
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardEventThumbnail: {
    width: scale(110),
    height: scale(110),
    borderRadius: moderateScale(2),
    backgroundColor: '#EAEAEA',
  },
  cardDetailsColumn: {
    flex: 1,
    marginLeft: scale(16),
    alignItems: 'flex-start',
  },
  /* --- Typographical Inline Context Configurations Panels --- */
  titleContextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: verticalScale(6),
  },
  eventTitleText: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: '#000000',
    marginRight: scale(6),
  },
  eventDateText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: '#F4A472', // Distinct orange secondary label string accent
  },
  descriptionParagraphBodyText: {
    fontSize: moderateScale(11),
    color: '#333333',
    lineHeight: moderateScale(15),
    fontWeight: '400',
    marginBottom: verticalScale(8),
  },
  metaInformationStringText: {
    fontSize: moderateScale(11.5),
    fontWeight: '700',
    color: '#222222',
    marginBottom: verticalScale(5),
  },
  metaInlineValueText: {
    fontWeight: '400',
    color: '#555555',
  },
  timelineScheduleGridRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingRight: scale(16),
    marginBottom: verticalScale(10),
  },
  /* --- Share Core Floating Component Layout Triggers --- */
  pastelOrangeSharePillButton: {
    backgroundColor: '#F4A472', // Main signature pastel operational orange color value token
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(14), // Symmetric rounded pill block design geometry rules
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareActionLabelText: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
});

export default EventsScreen;
