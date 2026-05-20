import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const { useNavigation } = require('@react-navigation/native');
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { COLORS, FontSizes } from '@/constants/theme';
import { AppText, ButtonLarge, Row } from '@/components';

type DateTimeCardProps = {
  selectedDay: string;
  selectedMonth: string;
  selectedYear: string;
  selectedHour: string;
  selectedPeriod: string;
  guests: string;
  showNextBtn?: boolean;
  showCartItem?: boolean;
};

const DateTimeCard = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  selectedHour,
  selectedPeriod,
  guests,
  showNextBtn = true,
  showCartItem = false,
}: DateTimeCardProps) => {
  const navigation = useNavigation();
  return (
    <View
      style={{ position: 'absolute', width: '90%', gap: verticalScale(15) }}
    >
      {showCartItem && (
        <Row style={styles.subTotal}>
          <AppText
            style={{ fontSize: FontSizes.xl, color: COLORS.neutral[800] }}
          >
            Your Cart 5 Items
          </AppText>
          <AppText
            style={{
              fontSize: FontSizes.xxxl,
              color: COLORS.neutral[800],
              fontWeight: 'bold',
            }}
          >
            $50
          </AppText>
        </Row>
      )}
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
      {showNextBtn && (
        <ButtonLarge
          variant="warning"
          title="Next"
          style={styles.nextActionButton}
          onPress={() => navigation.navigate('TableFoodScreen')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  transparentPreviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // Transparent frosted layer
    borderRadius: moderateScale(4),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    zIndex: 2,
  },
  subTotal: {
    paddingHorizontal: scale(15),
    gap: scale(10),
    justifyContent: 'space-between',
    backgroundColor: COLORS.warning[400],
    marginBottom: -verticalScale(10),
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
    maxWidth: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
});

export default DateTimeCard;
