import React from 'react';
import { StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
//
import { moderateScale } from '@/utils/ScreenSize';
import { COLORS } from '@/constants/theme';
import { ChevronLeft } from 'lucide-react-native';

interface BackButtonProps {
  size?: number;
  underlayColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

export default function BackButton({
  size = 40,
  underlayColor = COLORS.primary[200],
  onPress,
  style,
  color = COLORS.black,
}: BackButtonProps) {
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      style={[
        {
          height: moderateScale(size),
          width: moderateScale(size),
          borderRadius: moderateScale(size) / 2,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      onPress={onPress}
    >
      <ChevronLeft size={moderateScale(20)} color={color} />
    </TouchableHighlight>
  );
}
