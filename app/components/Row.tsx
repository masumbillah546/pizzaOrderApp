import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface RowProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export default function Row({style, children}: RowProps) {
  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      {children}
    </View>
  );
}
