import React from 'react';
import {Text, View} from 'react-native';
import Theme from '../../../common/Theme';
import {scale} from '../../../common/ScreenSize';

export default function RecordingView() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(10),
        backgroundColor: Theme.color,
        borderRadius: scale(6),
      }}>
      <Text style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
        Recording...
      </Text>
    </View>
  );
}
