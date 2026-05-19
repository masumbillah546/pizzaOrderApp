import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { COLORS } from '@/constants/theme';

type TableClothProps = {};

const TableCloth = ({}: TableClothProps) => {
  return (
    <View style={[styles.ginghamFooterContainer]}>
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
  );
};

const styles = StyleSheet.create({
  /* --- Gingham Overlay and Preview Context Layouts --- */
  ginghamFooterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    transform: [{ rotate: '45deg' }],
    overflow: 'visible',
    width: '300%',
    height: '310%',
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
});

export default TableCloth;
