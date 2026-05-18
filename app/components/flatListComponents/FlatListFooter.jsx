import React from 'react';
import {View} from 'react-native';
import {verticalScale} from '../../utils/ScreenSize';
import Spinner from '../Spinner';

export default function FlatListFooter({
  isLoadMore = false,
  spinSize = 'large',
  height = 60,
}) {
  return (
    <View style={{height: verticalScale(height)}}>
      {isLoadMore ? <Spinner size={spinSize} /> : <View />}
    </View>
  );
}
