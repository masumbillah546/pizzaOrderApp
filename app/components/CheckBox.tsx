import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { moderateScale } from '@/utils/ScreenSize';
import { COLORS } from '@/constants/theme';
import React, { memo } from 'react';
import AppText from './AppText';

interface Props {
  label?: string;
  isChecked?: boolean;
  setIsChecked?: (x: boolean) => void;
  containerStyle?: any;
  tintColors?: any;
  labelStyle?: any;
  style?: any;
}

export default memo(
  ({
    label = 'Remember Me',
    isChecked = false,
    setIsChecked = () => {},
    containerStyle,
    tintColors,
    labelStyle = {},
    style,
  }: Props) => {
    // const [checked, setChecked] = React.useState(isChecked);

    // React.useEffect(() => {
    //   setIsChecked(checked);
    // }, [checked]);

    const checkboxStyle =
      Platform.OS === 'ios'
        ? { transform: [{ scale: 0.8 }] } // Adjust scale for iOS
        : {};

    return (
      <TouchableOpacity
        onPress={() => setIsChecked(!isChecked)}
        style={[styles.checkboxContainer, containerStyle]}
      >
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          style={[styles.checkbox, checkboxStyle, style]}
          //style={styles.checkbox}
          tintColors={{
            true: COLORS.theme,
            false: COLORS.neutral[600],
            ...tintColors,
          }}
          onFillColor={COLORS.theme}
        />
        <AppText style={[styles.label, labelStyle]}> {label}</AppText>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: verticalScale(5),
  },
  checkbox: {
    // backgroundColor: 'black',
    borderColor: COLORS.neutral[200],
  },
  label: {
    color: '#888888',
    fontSize: moderateScale(12),
  },
});
