import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { scale, verticalScale } from '@/utils/ScreenSize';
import { ButtonLarge, GlowingSeparator, MobileHeader } from '@/components';
import { COLORS, Shadows } from '@/constants/theme';
import TableCloth from './components/TableCloth';
import DateTimeCard from './components/DateTimeCard';
import { FOOD_DATA, FoodCategoriesHeader, PizzaCard } from './HomeScreen';
import OrderSuccessModal from '@/components/modals/OrderSuccessModal';

const TableFoodScreen = ({ navigation }) => {
  // Picker states tracking indices corresponding to mockup centers
  const [selectedDay, setSelectedDay] = useState('12');
  const [selectedMonth, setSelectedMonth] = useState('Aug');
  const [selectedYear, setSelectedYear] = useState('2017');
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [guests, setGuests] = useState('4 People');
  const [successModal, setSuccessModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <MobileHeader title="FOOD & TABLE BOOKING" onMenu={() => {}} />
      <View style={styles.ginghamFooterContainer}>
        <TableCloth />
        <DateTimeCard
          selectedDay={selectedDay}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          selectedHour={selectedHour}
          selectedPeriod={selectedPeriod}
          guests={guests}
          showNextBtn={false}
        />
      </View>
      <FoodCategoriesHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {FOOD_DATA.map(item => (
          <PizzaCard key={item.id} item={item} />
        ))}
      </ScrollView>
      <ButtonLarge
        variant="warning"
        style={{
          marginBottom: verticalScale(30),
          ...Shadows.large,
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          // opacity: 0.8,
        }}
        onPress={() => {
          // navigation.navigate('BuyingOptionScreen')
          setSuccessModal(true);
        }}
        title="Buy Now!!"
      />
      <OrderSuccessModal
        orderId="45454"
        visible={successModal}
        onClose={() => setSuccessModal(false)}
        forTable
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(100),
    paddingHorizontal: scale(15),
  },
  /* --- Gingham Overlay and Preview Context Layouts --- */
  ginghamFooterContainer: {
    width: '100%',
    flexGrow: 1,
    aspectRatio: 5 / 3,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    overflow: 'hidden',
  },
});

export default TableFoodScreen;
