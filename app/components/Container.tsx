import {Spacing} from '@/constants/theme';
import React, {forwardRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  canScroll?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  refreshControl?: boolean;
  keyboardAware?: boolean;
  keyboardVerticalOffset?: number;
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
  keyboardDismissMode?: ScrollViewProps['keyboardDismissMode'];
  extraBottomInset?: number;
  automaticallyAdjustKeyboardInsets?: boolean;
}

const Container = forwardRef(
  (
    {
      style,
      contentContainerStyle,
      children,
      canScroll = true,
      refreshing = false,
      onRefresh,
      refreshControl = false,
      keyboardAware = true,
      keyboardVerticalOffset = 0,
      keyboardShouldPersistTaps = 'handled',
      keyboardDismissMode,
      extraBottomInset = 0,
      automaticallyAdjustKeyboardInsets = true,
    }: Props,
    ref: any,
  ) => {
    const insets = useSafeAreaInsets();
    const bottomPadding = insets.bottom + Spacing.xl + extraBottomInset;
    const resolvedKeyboardDismissMode =
      keyboardDismissMode ?? (Platform.OS === 'ios' ? 'interactive' : 'on-drag');

    const scrollContentProps = {
      contentContainerStyle: {
        ...styles.contentContainerStyle,
        // paddingBottom: bottomPadding,
        ...style,
        ...contentContainerStyle,
      },
      showsVerticalScrollIndicator: false,
      keyboardShouldPersistTaps,
      keyboardDismissMode: resolvedKeyboardDismissMode,
      scrollIndicatorInsets: {bottom: bottomPadding},
    };

    const content = canScroll ? (
      keyboardAware ? (
        <KeyboardAwareScrollView
          innerRef={ref}
          enableOnAndroid
          enableAutomaticScroll
          extraHeight={Spacing.xl * 2}
          extraScrollHeight={Spacing.xxl + extraBottomInset}
          keyboardOpeningTime={0}
          enableResetScrollToCoords={false}
          contentInsetAdjustmentBehavior="always"
          automaticallyAdjustKeyboardInsets={
            Platform.OS === 'ios' && automaticallyAdjustKeyboardInsets
          }
          {...scrollContentProps}
          {...(refreshControl && {
            refreshControl: (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            ),
          })}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <ScrollView
          ref={ref}
          contentInsetAdjustmentBehavior="always"
          automaticallyAdjustKeyboardInsets={
            Platform.OS === 'ios' && automaticallyAdjustKeyboardInsets
          }
          {...scrollContentProps}
          {...(refreshControl && {
            refreshControl: (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            ),
          })}
        >
          {children}
        </ScrollView>
      )
    ) : (
      <View
        ref={ref}
        style={[styles.container, {paddingBottom: bottomPadding}, style]}
      >
        {children}
      </View>
    );

    if (!keyboardAware || canScroll) {
      return content;
    }

    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {content}
      </KeyboardAvoidingView>
    );
  },
);

export default Container;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: Spacing.pageContainerHorizontal,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: Spacing.pageContainerHorizontal,
    paddingBottom: Spacing.pageContainerHorizontal,
  },
});
