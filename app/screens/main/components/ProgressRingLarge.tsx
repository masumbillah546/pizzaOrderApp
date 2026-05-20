import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, moderateScale } from '@/utils/ScreenSize';

const ProgressRingLarge = () => {
  return (
    <View style={styles.outerProgressRingLarge}>
      <View style={styles.innerYellowCircle}>
        <Text style={styles.timerDigits}>
          40 <Text style={styles.timerLabel}>Min</Text>
        </Text>
        <Text style={[styles.timerLabel, {fontSize: moderateScale(12), fontWeight: '700'}]}>12 Min Remaining</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerProgressRingLarge: {
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    backgroundColor: '#FFFFFF',
    borderWidth: scale(15),
    borderColor: '#F4A472', // Simulated outer border arc ring matching mockup layout
    borderLeftColor: 'transparent', // Leaves the bottom-left gap open
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }], // Matches asymmetrical angle displacement
  },
  innerYellowCircle: {
    width: scale(130),
    height: scale(130),
    borderRadius: scale(65),
    backgroundColor: '#FFCC00', // Central yellow dial fill
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }], // Counter-rotates internal typography straight
  },
  timerDigits: {
    color: '#FFFFFF',
    fontSize: moderateScale(26),
    fontWeight: 'bold',
  },
  timerLabel: {
    fontSize: moderateScale(15),
    fontWeight: '400',
  },
});

export default ProgressRingLarge;
