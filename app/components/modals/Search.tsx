import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Row} from '@/components';
import {moderateScale, scale} from '@/utils/ScreenSize';
import {LocateFixed, Settings2} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@/constants/theme';

export default function Search({data = {}, handleOpenBottomSheet = () => {}}) {
  const navigation = useNavigation<any>();
  const handleClick = () => {
    navigation.navigate('FindLocationScreen');
  };
  return (
    <Row style={styles.searchContainer}>
      <Row
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: moderateScale(5),
          borderColor: COLORS.neutral[400],
          paddingHorizontal: moderateScale(10),
          height: moderateScale(40),
          backgroundColor: COLORS.white,
        }}>
        <TouchableOpacity style={{flex: 1}} onPress={handleClick}>
          <TextInput
            editable={false}
            placeholder="Search your location"
            placeholderTextColor={'#9D9D9D'}
            style={{
              color: '#9D9D9D',
              fontSize: moderateScale(14),
              height: '100%',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <LocateFixed size={moderateScale(24)} color={COLORS.neutral[700]} />
        </TouchableOpacity>
      </Row>
      <TouchableOpacity
        onPress={handleOpenBottomSheet}
        style={styles.advanceButton}>
        <Settings2 size={moderateScale(22)} color={COLORS.white} />
      </TouchableOpacity>
    </Row>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'space-between',
    gap: scale(10),
    height: moderateScale(40),
  },
  advanceButton: {
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.theme,
    borderRadius: moderateScale(5),
  },
});
