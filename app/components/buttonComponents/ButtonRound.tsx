import React from 'react';
import {TouchableHighlight} from 'react-native';
//
import {moderateScale} from '../../utils/ScreenSize';
import {COLORS} from '@/constants/theme';

interface Props {
  size?: number;
  underlayColor?: string;
  onPress?: () => void;
  style?: any;
  icon?: any;
}
export default function ButtonRound({
  size = 30,
  underlayColor = COLORS.active_bg,
  onPress,
  style,
  icon,
}: Props) {
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      style={{
        height: moderateScale(size),
        width: moderateScale(size),
        borderRadius: moderateScale(size) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      onPress={onPress}>
      {icon}
    </TouchableHighlight>
  );
}
