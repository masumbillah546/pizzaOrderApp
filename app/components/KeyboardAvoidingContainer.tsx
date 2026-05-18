import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import LoadingContainer from './LoadingContainer';
import {forwardRef} from 'react';
import NavigationHeader from './NavigationHeader';
import Container from './Container';

interface KeyboardAvoidingContainerProps {
  children: React.ReactNode;
  loading?: boolean;
  backgroundColor?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  pageTitle?: string;
  handleBackButtonClick?: () => void;
}
const KeyboardAvoidingContainer = forwardRef(
  (
    {
      children,
      loading = false,
      backgroundColor,
      contentContainerStyle,
      pageTitle = '',
      handleBackButtonClick = () => {},
    }: KeyboardAvoidingContainerProps,
    ref: any,
  ) => {
    return (
      <View
        style={[styles.wrapper, backgroundColor ? {backgroundColor} : null]}>
        {pageTitle ? (
          <NavigationHeader
            options={{
              title: pageTitle,
            }}
            onBackButtonPress={handleBackButtonClick}
          />
        ) : null}

        <LoadingContainer loading={loading}>
          <Container
            ref={ref}
            style={[
              styles.contentContainerStyle,
              backgroundColor ? {backgroundColor} : null,
              contentContainerStyle,
            ]}>
            {children}
          </Container>
        </LoadingContainer>
      </View>
    );
  },
);

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
