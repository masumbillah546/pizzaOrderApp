import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './Button';
import Container from './Container';
import AppText from './AppText';
import {BorderRadius, COLORS, FontSizes, Spacing} from '@/constants/theme';
import {moderateScale, verticalScale} from '@/utils/ScreenSize';

interface Props {
  title: string;
  description: string;
  actionLabel?: string;
  onPressAction?: () => void;
}

export default function FeaturePlaceholder({
  title,
  description,
  actionLabel,
  onPressAction,
}: Props) {
  return (
    <Container canScroll={false} style={styles.container}>
      <View style={styles.card}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.description}>{description}</AppText>
        {actionLabel && onPressAction ? (
          <Button
            title={actionLabel}
            onPress={onPressAction}
            style={styles.button}
          />
        ) : null}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
  },
  card: {
    width: '100%',
    maxWidth: moderateScale(340),
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: COLORS.neutral[200],
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: COLORS.neutral[800],
    textAlign: 'center',
  },
  description: {
    fontSize: FontSizes.sm,
    lineHeight: moderateScale(21),
    color: COLORS.neutral[600],
    textAlign: 'center',
  },
  button: {
    marginTop: verticalScale(8),
    minWidth: moderateScale(180),
  },
});
