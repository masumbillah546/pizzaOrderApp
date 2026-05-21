import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale } from '@/utils/ScreenSize';
import { COLORS } from '@/constants/theme';

const GlowingSeparator = () => {
  return (
    <View style={styles.container}>
      {/* The main orange background track */}
      <View style={styles.track}>
        
        {/* The glowing beam using LinearGradient */}
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={[
            'rgba(255, 255, 255, 0)', // Transparent start
            'rgba(255, 255, 255, 1)', // Solid white center
            'rgba(255, 255, 255, 0)'  // Transparent end
          ]}
          style={styles.gradientLine}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // paddingVertical: verticalScale(10),
  },
  track: {
    width: '100%',
    height: verticalScale(5),
    backgroundColor: COLORS.theme,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientLine: {
    width: '90%',
    height: verticalScale(2.5),
    // Additional shadow to mimic the "bloom" in image_bcea27.png
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default GlowingSeparator;