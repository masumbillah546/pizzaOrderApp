import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, moderateScale } from '@/utils/ScreenSize';

const ProgressRing = () => {
  return (
    <View style={styles.outerProgressRing}>
      <View style={styles.innerYellowCircle}>
        <Text style={styles.timerDigits}>
          40 <Text style={styles.timerLabel}>Min</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerProgressRing: {
    width: scale(115),
    height: scale(115),
    borderRadius: scale(57.5),
    backgroundColor: '#FFFFFF',
    borderWidth: scale(5),
    borderColor: '#F4A472', // Simulated outer border arc ring matching mockup layout
    borderLeftColor: 'transparent', // Leaves the bottom-left gap open
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }], // Matches asymmetrical angle displacement
  },
  innerYellowCircle: {
    width: scale(92),
    height: scale(92),
    borderRadius: scale(46),
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

export default ProgressRing;
