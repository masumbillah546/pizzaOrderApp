import React from 'react';
import {StyleSheet, StyleProp, ViewStyle, View} from 'react-native';
import {COLORS} from '@/constants/theme';

interface HRLineProps {
  style?: StyleProp<ViewStyle>;
}

function HRLine({style}: HRLineProps) {
  return (
    <View
      style={[
        {
          borderBottomColor: COLORS.inactive_2,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
        style,
      ]}
    />
  );
}

export default HRLine;
