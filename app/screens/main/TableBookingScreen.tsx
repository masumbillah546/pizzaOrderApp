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
      <View style={styles.header}>
        <GlowingSeparator />
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
          <View
            style={[
              styles.ginghamFooterContainer,
              {
                transform: [{ rotate: '45deg' }],
                overflow: 'visible',
                width: '300%',
                height: '310%',
              },
            ]}
          >
            <View style={styles.ginghamPatternLayer} pointerEvents="none">
              {Array.from({ length: 48 }).map((_, idx) => (
                <View
                  key={idx}
                  style={{
                    height: '200%',
                    width: 20,
                    backgroundColor: COLORS.theme,
                  }}
                ></View>
              ))}
            </View>

            <View
              style={[
                styles.ginghamPatternLayer,
                { flexDirection: 'column', opacity: 0.6 },
              ]}
              pointerEvents="none"
            >
              {Array.from({ length: 48 }).map((_, idx) => (
                <View
                  key={idx}
                  style={{
                    height: 20,
                    width: '200%',
                    backgroundColor: COLORS.theme,
                  }}
                ></View>
              ))}
            </View>
          </View>

          {/* Transparent Live Preview Context Card Floating Over Gingham Overlay */}
          <View style={{ position: 'absolute', width: '90%', gap: verticalScale(15) }}>
            <View style={styles.transparentPreviewCard}>
              <Text style={styles.previewTimeLabel}>
                {selectedHour === '12'
                  ? '12 PM'
                  : `${selectedHour} ${selectedPeriod}`}
              </Text>
              <Text style={styles.previewDayOfWeekText}>Saturday</Text>

              <View style={styles.previewDateRow}>
                <Text style={styles.previewDateNum}>{selectedDay}</Text>
                <Text style={styles.previewDateMonth}>{selectedMonth}</Text>
                <Text style={styles.previewDateYear}>{selectedYear}</Text>
              </View>

              <Text style={styles.previewGuestFooterCount}>
                Guest No. {guests.replace(/[^0-9]/g, '')}
              </Text>
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity
              style={styles.nextActionButton}
              activeOpacity={0.9}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
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
    backgroundColor: COLORS.theme, // UI Theme Orange
    paddingBottom: verticalScale(10),
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
    marginBottom: verticalScale(30),
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
  ginghamPatternLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    gap: 20,
    opacity: 0.6,
    transform: [{ rotate: '0deg' }], // Angled checker layout mimicking cloth weave lines
    zIndex: -1,
  },
  transparentPreviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // Transparent frosted layer
    borderRadius: moderateScale(4),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    zIndex: 2,
  },
  previewTimeLabel: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#E04F4F', // Distinctive bright crimson notification accent text
    marginBottom: verticalScale(4),
  },
  previewDayOfWeekText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#333333',
    marginBottom: verticalScale(8),
  },
  previewDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  previewDateNum: {
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    color: '#333333',
    marginRight: scale(10),
  },
  previewDateMonth: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#333333',
    marginRight: scale(10),
  },
  previewDateYear: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#333333',
  },
  previewGuestFooterCount: {
    fontSize: moderateScale(11),
    fontWeight: '800',
    color: '#222222',
  },
  nextActionButton: {
    backgroundColor: '#FFCC00', // Gold/Yellow UI button color accent standard
    width: '100%',
    height: verticalScale(48),
    borderRadius: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
});

export default TableBookingScreen;
