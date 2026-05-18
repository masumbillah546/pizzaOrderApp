import {StyleSheet, Text, View} from 'react-native';
import Row from './Row';
import {BackButton} from './buttonComponents';
import {COLORS} from '@/constants/theme';
import {moderateScale, scale, verticalScale} from '@/utils/ScreenSize';
import {useNavigation} from '@react-navigation/native';

interface NavigationHeaderProps {
  options: any;
  onBackButtonPress?: () => void;
}
const NavigationHeader = ({
  options,
  onBackButtonPress,
  ...rest
}: NavigationHeaderProps) => {
  const navigation = useNavigation();
  return (
    <Row
      style={{
        paddingHorizontal: scale(5),
        height: verticalScale(45),
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: COLORS.theme,
        ...options?.headerStyle,
      }}>
      {(options?.headerLeft && options?.headerLeft()) || (
        <BackButton
          underlayColor={options.underlayColor}
          color={options.headerTintColor}
          onPress={() => {
            if (onBackButtonPress) {
              onBackButtonPress();
            } else {
              navigation.goBack();
            }
          }}
        />
      )}
      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          fontSize: moderateScale(16),
          textAlign: 'center',
          fontWeight: '500',
          color: COLORS.white,
          ...options?.headerTitleStyle,
        }}>
        {options.title}
      </Text>
      {(options?.headerRight && options?.headerRight()) || (
        <View style={{width: moderateScale(40), height: moderateScale(40)}} />
      )}
    </Row>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
