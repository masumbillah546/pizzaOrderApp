import React, { type PropsWithChildren } from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MobileHeader from './MobileHeader';
import { scale } from '@/utils/ScreenSize';

type ScreenContainerProps = PropsWithChildren<{
  title?: string;
  onBack?: () => void;
  onMenu?: () => void;
  onRightPress?: () => void;
  rightIcon?: any;
  rightLabel?: string;
  scroll?: boolean;
  hideHeader?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export default function ScreenContainer({
  title,
  onBack,
  onMenu,
  onRightPress,
  rightIcon,
  rightLabel,
  scroll = true,
  hideHeader = false,
  contentStyle,
  children,
}: ScreenContainerProps) {
  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentStyle]}>{children}</View>
  );

  return (
    <View style={styles.safeArea}>
      {hideHeader ? null : (
        <MobileHeader
          title={title}
          onBack={onBack}
          onMenu={onMenu}
          onRightPress={onRightPress}
          rightIcon={rightIcon}
          rightLabel={rightLabel}
        />
      )}
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flexGrow: 1,
    padding: scale(16),
  },
});
