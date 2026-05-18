import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
// import NoDataIcon from '../../assets/icons/no-data.svg';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  no_item_message?: string;
};

export default function FlatListEmptyMessage({
  containerStyle,
  style,
  no_item_message,
}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* <NoDataIcon height={verticalScale(139)} /> */}
      <Text style={[styles.no_item_message, style]}>
        {no_item_message || 'No data found'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  no_item_message: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    fontWeight: '400',
    color: '#888888',
    opacity: 0.6,
  },
});
