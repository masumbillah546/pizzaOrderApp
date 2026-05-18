import React from 'react';
import Row from './Row';
import AppText from './AppText';
import { TouchableOpacity } from 'react-native';
import { COLORS, FontSizes } from '@/constants/theme';
import { moderateScale } from '@/utils/ScreenSize';

type Props = {
  title: string;
  buttonLabel?: string;
  onPress?: () => void;
};

const SectionHeader = ({ title, buttonLabel, onPress }: Props) => {
  return (
    <Row
      style={{
        justifyContent: 'space-between',
        marginTop: moderateScale(12),
      }}
    >
      <AppText
        style={{
          fontWeight: '500',
          color: COLORS.neutral[700],
        }}
      >
        {title}
      </AppText>
      {buttonLabel && (
        <TouchableOpacity onPress={onPress}>
          <AppText style={{ fontSize: FontSizes.xs }}>{buttonLabel}</AppText>
        </TouchableOpacity>
      )}
    </Row>
  );
};

export default SectionHeader;
