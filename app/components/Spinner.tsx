import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS} from '@/constants/theme';
type Size = 'large' | 'small';

interface SpinnerProps {
  color?: string;
  size?: Size;
}
const Spinner = ({color = COLORS.theme, size = 'large'}: SpinnerProps) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Spinner;
