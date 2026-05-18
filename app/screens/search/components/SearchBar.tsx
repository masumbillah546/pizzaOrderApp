import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Row, AppText } from '@/components';
import { moderateScale, scale } from '@/utils/ScreenSize';
import { useNavigation } from '@react-navigation/native';
import ButtonDropdown from '@/components/buttonComponents/ButtonDropdown';
import { BorderRadius, COLORS, FontSizes } from '@/constants/theme';

export default function SearchBar({
  onChangeText = () => {},
  onPressDropdown = () => {},
}: any) {
  const navigation = useNavigation<any>();

  return (
    <Row style={styles.container}>
      <ButtonDropdown
        onPress={onPressDropdown}
        containerStyle={styles.dropdownContainer}
        style={{ height: moderateScale(35), fontSize: FontSizes.xs }}
      />
      <TextInput
        autoFocus
        placeholder="Search here your location"
        placeholderTextColor={'#9D9D9D'}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('FindLocationScreen')}
        style={styles.mapBtn}
      >
        <AppText style={{ color: COLORS.white }}>Map</AppText>
      </TouchableOpacity>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingRight: moderateScale(15),
    padding: scale(5),
    justifyContent: 'space-between',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: COLORS.neutral[400],
    height: moderateScale(50),
    gap: scale(5),
  },
  dropdownContainer: {
    borderColor: COLORS.neutral[300],
    borderWidth: 1,
    width: scale(80),
    borderRadius: BorderRadius.full,
    gap: scale(10),
    paddingHorizontal: scale(5),
  },
  input: {
    flex: 1,
    height: moderateScale(40),
    color: COLORS.neutral[900],
    fontSize: FontSizes.sm,
  },
  mapBtn: {
    backgroundColor: COLORS.theme,
    paddingHorizontal: scale(15),
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
  },
});
