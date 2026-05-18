import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {COLORS} from '@/constants/theme';
import {moderateScale, verticalScale} from '@/utils/ScreenSize';
import TowerIcon from '@/assets/icons/tower.svg';
import Logo from '@/assets/images/logo.svg';
//

const NoInternet = () => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    }}>
    <View style={{marginTop: verticalScale(35)}}>
      <Logo />
    </View>
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(100),
      }}>
      <TowerIcon height={moderateScale(200)} width={moderateScale(190)} />
      <Text
        style={{
          color: COLORS.inactive,
          textAlign: 'center',
          fontSize: moderateScale(18),
          fontWeight: '500',
          marginTop: verticalScale(20),
          marginBottom: verticalScale(5),
        }}>
        No internet
      </Text>
      <Text
        style={{
          color: COLORS.inactive,
          textAlign: 'center',
          fontSize: moderateScale(15),
        }}>
        Please check your network connection.
      </Text>
    </View>
  </SafeAreaView>
);
export default NoInternet;
