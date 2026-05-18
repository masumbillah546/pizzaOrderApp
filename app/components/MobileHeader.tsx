import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { AppIcon } from './AppIcon';
// import { uiAssets } from '../design/assets';
import { BackButton } from './buttonComponents';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import Row from './Row';
import { COLORS, FontSizes } from '@/constants/theme';
import AppText from './AppText';
import { Menu } from 'lucide-react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { openGlobalDrawer } from '@/utils/linking';

type MobileHeaderProps = {
  title?: string;
  onBack?: () => void;
  onMenu?: () => void;
  onRightPress?: () => void;
  onLeftPress?: () => void;
  rightIcon?: React.ReactNode;
  rightLabel?: string;
  leftIcon?: React.ReactNode;
  leftLabel?: string;
};

export default function MobileHeader({
  title,
  onBack,
  onMenu,
  onRightPress,
  onLeftPress,
  rightIcon,
  rightLabel,
  leftIcon,
  leftLabel,
}: MobileHeaderProps) {
  type NavigationProps = DrawerNavigationProp<{}>;
  const navigation = useNavigation<NavigationProps>();
  const SAI = useSafeAreaInsets();
  return (
    <Row
      style={[
        styles.row,
        { paddingTop: SAI.top, height: verticalScale(45) + SAI.top },
      ]}
    >
      <View style={styles.side}>
        {onBack ? <BackButton onPress={onBack} /> : null}
        {leftLabel ? (
          onLeftPress ? (
            <Pressable onPress={onLeftPress} hitSlop={8}>
              <AppText style={styles.rightLabel}>{leftLabel}</AppText>
            </Pressable>
          ) : (
            <AppText style={styles.rightLabel}>{leftLabel}</AppText>
          )
        ) : null}
        {leftIcon && onLeftPress ? (
          <Pressable style={styles.iconButton} onPress={onLeftPress}>
            {/* <AppIcon source={rightIcon} size={20} tintColor="#202632" /> */}
            {leftIcon}
          </Pressable>
        ) : null}
      </View>

      <AppText style={styles.title} numberOfLines={1}>
        {title || ''}
      </AppText>

      <View style={[styles.side, styles.sideRight]}>
        {rightLabel ? (
          onRightPress ? (
            <Pressable onPress={onRightPress} hitSlop={8}>
              <AppText style={styles.rightLabel}>{rightLabel}</AppText>
            </Pressable>
          ) : (
            <AppText style={styles.rightLabel}>{rightLabel}</AppText>
          )
        ) : null}

        {rightIcon && onRightPress ? (
          <Pressable style={styles.iconButton} onPress={onRightPress}>
            {/* <AppIcon source={rightIcon} size={20} tintColor="#202632" /> */}
            {rightIcon}
          </Pressable>
        ) : null}

        {onMenu ? (
          <Pressable
            style={styles.iconButton}
            onPress={() => {
              // navigation.toggleDrawer();
              openGlobalDrawer();
            }}
          >
            {/* <AppIcon source={uiAssets.menuIcon} size={22} tintColor="#202632" /> */}
            <Menu size={moderateScale(20)} color={COLORS.white} />
          </Pressable>
        ) : null}
      </View>
    </Row>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: scale(15),
    height: verticalScale(45),
    overflow: 'hidden',
    alignItems: 'center',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#E3E6ED',
    backgroundColor: COLORS.theme,
  },
  side: {
    width: moderateScale(64),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  sideRight: {
    justifyContent: 'flex-end',
  },
  iconButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    // backgroundColor: '#F7F7FA',
  },
  title: {
    fontSize: FontSizes.md,
    flex: 1,
    textAlign: 'center',
    color: COLORS.white,
    fontWeight: '700',
  },
  rightLabel: {
    color: COLORS.white,
    fontWeight: '500',
  },
});
