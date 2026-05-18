import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { moderateScale } from '@/utils/ScreenSize';
import { COLORS } from '@/constants/theme';
import { Row } from '@/components';

interface Props {
  onPress?: () => void;
  containerStyle?: any;
  style?: any;
  value?: string;
  onBlur?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  disabled?: boolean;
}

export default function ButtonDropdown({
  onPress = () => {},
  style,
  containerStyle,
  value,
  onBlur = () => {},
  placeholder = 'Select',
  placeholderTextColor = COLORS.neutral[600],
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Row style={containerStyle}>
        <TextInput
          editable={false}
          style={[style]}
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
        />
        <View style={styles.iconContainer}>
          <ChevronDown size={moderateScale(20)} color={COLORS.neutral[500]} />
        </View>
      </Row>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
