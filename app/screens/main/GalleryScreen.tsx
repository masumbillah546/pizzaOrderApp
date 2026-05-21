import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';

// --- Types ---
interface AlbumItem {
  id: string;
  title: string;
  count?: number;
  date: string;
  image: any;
}

const GALLERY_DATA: AlbumItem[] = [
  {
    id: '1',
    title: 'Shop Decoration',
    count: 10,
    date: '12 Dec 2016',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500', // Fine dining / interior placeholder
  },
  {
    id: '2',
    title: 'Christmas Day 2017',
    count: 30,
    date: '5 May 2017',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500', // Festive ornaments placeholder
  },
  {
    id: '3',
    title: 'Customer',
    count: 5,
    date: '5 May 2017',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500', // Pizzeria customer placeholder
  },
  {
    id: '4',
    title: 'Our Party',
    date: '5 May 2017',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500', // Friends celebrating placeholder
  },
  {
    id: '5',
    title: 'Social Gatherings',
    count: 12,
    date: '18 Aug 2017',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500', // Group dining placeholder
  },
];

const screenWidth = Dimensions.get('window').width;
// Account for screen padding (15 * 2 = 30) and gap between items (15)
const cardWidth = (screenWidth - scale(45)) / 2;

const GalleryScreen = () => {
  const renderGridItem = ({ item }: { item: AlbumItem }) => (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />

      <View style={styles.textContainer}>
        <Text style={styles.albumTitle} numberOfLines={1}>
          {item.title}
          {item.count !== undefined && ` (${item.count})`}
        </Text>
        <Text style={styles.albumDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <MobileHeader title="SHOP GALLERY" onMenu={() => {}} />
      <GlowingSeparator />
      {/* --- Header Section --- */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Special Moment</Text>
        <Text style={styles.headerTitle}>On Camera</Text>
      </View>

      {/* --- 2-Column Grid --- */}
      <FlatList
        data={GALLERY_DATA}
        renderItem={renderGridItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: COLORS.theme, // Theme orange
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  headerTitle: {
    color: '#333333',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginTop: verticalScale(2),
  },
  listContainer: {
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(20),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: verticalScale(15),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(2),
    // Standard box-shadow border style matching mockup
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: scale(140), // Keeps images matching aspect ratio perfectly
  },
  textContainer: {
    padding: moderateScale(10),
    backgroundColor: '#FAFAFA',
  },
  albumTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#000000',
  },
  albumDate: {
    fontSize: moderateScale(10),
    color: '#666666',
    marginTop: verticalScale(4),
  },
});

export default GalleryScreen;
