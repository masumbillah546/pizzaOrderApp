import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import {
  ButtonLarge,
  GlowingSeparator,
  MobileHeader,
  ProductCard,
} from '@/components';
import { COLORS, Shadows } from '@/constants/theme';
import TableCloth from './components/TableCloth';
import DateTimeCard from './components/DateTimeCard';
import { FOOD_DATA, FoodCategoriesHeader, PizzaCard } from './HomeScreen';
import OrderSuccessModal from '@/components/modals/OrderSuccessModal';
import { ProductData } from './ProductsScreen';

const TableFoodScreen = ({ navigation }) => {
  // Picker states tracking indices corresponding to mockup centers
  const [selectedDay, setSelectedDay] = useState('12');
  const [selectedMonth, setSelectedMonth] = useState('Aug');
  const [selectedYear, setSelectedYear] = useState('2017');
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [guests, setGuests] = useState('4 People');
  const [successModal, setSuccessModal] = useState(false);

  const renderItem = useCallback(
    ({ item }: any) => {
      return <ProductCard item={item} navigation={navigation} />;
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <MobileHeader
        title="FOOD & TABLE BOOKING"
        onBack={() => {
          navigation.goBack();
        }}
      />
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
      {/* <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {FOOD_DATA.map(item => (
          <PizzaCard key={item.id} item={item} />
        ))}
      </ScrollView> */}
      <FlatList
        data={ProductData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          gap: moderateScale(10),
          justifyContent: 'space-between',
        }}
        contentContainerStyle={styles.contentContainer}
        // onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={<FlatListFooter isLoadMore={loadingMore} />}
        // ListEmptyComponent={() =>
        //   !loading && (
        //     <FlatListEmptyMessage no_item_message="No products found" />
        //   )
        // }
      />
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
          navigation.navigate('ConfirmCartScreen');
          // setSuccessModal(true);
        }}
        title="Book Now!!"
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
    // backgroundColor: '#FFFFFF',
  },

  contentContainer: {
    flexGrow: 1,
    gap: moderateScale(15),
    padding: scale(16),
    paddingBottom: verticalScale(100),
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
