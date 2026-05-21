import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import ScreenSize, {
  scale,
  verticalScale,
  moderateScale,
} from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';
import TableCloth from './components/TableCloth';
import DateTimeCard from './components/DateTimeCard';

// --- Static Data Mocking Picker Values ---
const DAYS = [...Array(31)].map((_, i) => (i + 1).toString());
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const YEARS = ['2026', '2027'];

const HOURS = ['11', '12', '13'];
const PERIODS = ['PM', 'AM', ''];

const GUEST_OPTIONS = [
  '1 Person',
  '2 People',
  '3 People',
  '4 People',
  '5 People',
];

const TableBookingScreen = () => {
  // Picker states tracking indices corresponding to mockup centers
  const [selectedDay, setSelectedDay] = useState('12');
  const [selectedMonth, setSelectedMonth] = useState('Aug');
  const [selectedYear, setSelectedYear] = useState('2017');
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [guests, setGuests] = useState('4 People');
  const [showDropdown, setShowDropdown] = useState(false);

  const ITEM_HEIGHT = verticalScale(26); // Fixed line spacing height matching the line bars

  // Helper handling programmatic snap state conversions on manual list updates
  const handleScrollSnap = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    dataSet: string[],
    setter: (val: string) => void,
  ) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const computedIndex = Math.round(yOffset / ITEM_HEIGHT);
    if (computedIndex >= 0 && computedIndex < dataSet.length) {
      setter(dataSet[computedIndex]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Top Navigation Header Bar --- */}
      <MobileHeader title="FOOD & TABLE BOOKING" onMenu={() => {}} />
      <GlowingSeparator />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book you table and Choose Food</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* --- SECTION 1: Date Wheel Selection Grid --- */}
        <Text style={styles.sectionLabel}>Select Date :</Text>
        <View style={styles.pickerWindowContainer}>
          {/* Horizontal Accent Indicator Bars behind text elements */}
          <View style={styles.pickerSelectionFrameLine} />

          <View style={styles.pickerFlexRow}>
            {/* Day Column */}
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={e =>
                handleScrollSnap(e, DAYS, setSelectedDay)
              }
              contentContainerStyle={styles.pickerPadding}
            >
              {DAYS.map((day, i) => (
                <Text
                  key={i}
                  style={[
                    styles.pickerItemText,
                    selectedDay === day && styles.activeText,
                  ]}
                >
                  {day}
                </Text>
              ))}
            </ScrollView>

            <View style={styles.verticalSeparatorLine} />

            {/* Month Column */}
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={e =>
                handleScrollSnap(e, MONTHS, setSelectedMonth)
              }
              contentContainerStyle={styles.pickerPadding}
            >
              {MONTHS.map((mon, i) => (
                <Text
                  key={i}
                  style={[
                    styles.pickerItemText,
                    selectedMonth === mon && styles.activeText,
                    mon === 'Aug' && i === 0 && { color: '#E0E0E0' },
                  ]}
                >
                  {mon}
                </Text>
              ))}
            </ScrollView>

            <View style={styles.verticalSeparatorLine} />

            {/* Year Column */}
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={e =>
                handleScrollSnap(e, YEARS, setSelectedYear)
              }
              contentContainerStyle={styles.pickerPadding}
            >
              {YEARS.map((yr, i) => (
                <Text
                  key={i}
                  style={[
                    styles.pickerItemText,
                    selectedYear === yr && styles.activeText,
                  ]}
                >
                  {yr}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* --- SECTION 2: Time Wheel Selection Grid --- */}
        <Text style={styles.sectionLabel}>Select Time :</Text>
        <View style={styles.pickerWindowContainerShort}>
          <View style={styles.pickerSelectionFrameLine} />

          <View style={styles.pickerFlexRow}>
            {/* Hour Block */}
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={e =>
                handleScrollSnap(e, HOURS, setSelectedHour)
              }
              contentContainerStyle={styles.pickerPadding}
            >
              {HOURS.map((hr, i) => (
                <Text
                  key={i}
                  style={[
                    styles.pickerItemText,
                    selectedHour === hr && styles.activeText,
                  ]}
                >
                  {hr}
                </Text>
              ))}
            </ScrollView>

            <View style={styles.verticalSeparatorLine} />

            {/* AM/PM Block */}
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onMomentumScrollEnd={e =>
                handleScrollSnap(e, PERIODS, setSelectedPeriod)
              }
              contentContainerStyle={styles.pickerPadding}
            >
              {PERIODS.map((per, i) => (
                <Text
                  key={i}
                  style={[
                    styles.pickerItemText,
                    selectedPeriod === per && styles.activeText,
                  ]}
                >
                  {per}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* --- SECTION 3: Custom Dropdown Menu for Guests --- */}
        <Text style={styles.sectionLabel}>Select People /Guset:</Text>
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity
            style={styles.dropdownSelectorTrigger}
            activeOpacity={0.8}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownValueText}>{guests}</Text>
            <ChevronDown
              size={moderateScale(16)}
              color="#F4A472"
              strokeWidth={3}
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownFloatingList}>
              {GUEST_OPTIONS.map(opt => (
                <TouchableOpacity
                  key={opt}
                  style={styles.dropdownItemRow}
                  onPress={() => {
                    setGuests(opt);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* --- SECTION 4: Gingham Tablecloth Background Pattern Context Footer --- */}
        <View style={styles.ginghamFooterContainer}>
          <TableCloth />
          <DateTimeCard
            selectedDay={selectedDay}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            selectedHour={selectedHour}
            selectedPeriod={selectedPeriod}
            guests={guests}
          />
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
    backgroundColor: COLORS.theme, // UI Theme Orange
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: verticalScale(10),
  },
  sectionLabel: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#333333',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
    textAlign: 'center',
  },
  /* --- Structural Wheel Picker Custom Layout Specifications --- */
  pickerWindowContainer: {
    width: scale(190),
    height: verticalScale(85),
    position: 'relative',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  pickerWindowContainerShort: {
    width: scale(140),
    height: verticalScale(85),
    position: 'relative',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  pickerSelectionFrameLine: {
    position: 'absolute',
    width: '100%',
    height: verticalScale(28),
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#F7C6A5', // Pale orange separator outline matching design
    backgroundColor: 'transparent',
  },
  pickerFlexRow: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  pickerPadding: {
    paddingVertical: verticalScale(28), // Centers first and last picker array item nicely
    alignItems: 'center',
  },
  pickerItemText: {
    height: verticalScale(26),
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  activeText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  verticalSeparatorLine: {
    width: 1.5,
    height: '80%',
    backgroundColor: '#F7C6A5',
    marginHorizontal: scale(5),
  },
  /* --- Dropdown Form Selectors --- */
  dropdownWrapper: {
    width: scale(110),
    position: 'relative',
    zIndex: 10,
    marginBottom: verticalScale(10),
  },
  dropdownSelectorTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#F4A472',
    borderRadius: moderateScale(2),
    paddingHorizontal: scale(8),
    height: verticalScale(28),
    backgroundColor: '#FFFFFF',
  },
  dropdownValueText: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#333333',
  },
  dropdownFloatingList: {
    position: 'absolute',
    top: verticalScale(30),
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  dropdownItemRow: {
    padding: moderateScale(8),
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEEEEE',
  },
  dropdownItemText: {
    fontSize: moderateScale(12),
    color: '#333333',
  },
  /* --- Gingham Overlay and Preview Context Layouts --- */
  ginghamFooterContainer: {
    width: '100%',
    flexGrow: 1,
    aspectRatio: 5 / 3.6,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    overflow: 'hidden',
  },
});

export default TableBookingScreen;
