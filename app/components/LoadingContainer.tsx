import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {COLORS} from '@/constants/theme';
interface LoadingContainerProps extends React.ComponentProps<typeof View> {
  loading: boolean;
  spinSize?: 'small' | 'large';
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
const LoadingContainer = ({
  loading,
  spinSize = 'large',
  children,
  style,
  ...rest
}: LoadingContainerProps) => (
  <>
    {loading ? (
      <View style={[styles.container, style]} {...rest}>
        <ActivityIndicator size={spinSize} color={COLORS.theme} />
      </View>
    ) : (
      children
    )}
  </>
);

export default LoadingContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
