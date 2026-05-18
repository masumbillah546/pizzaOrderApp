import * as React from 'react';
import {TouchableHighlight, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//
import {moderateScale, scale} from '../../utils/ScreenSize';
import {COLORS, FontSizes} from '@/constants/theme';
import AppText from '../AppText';

interface TabButtonProps {
  label: string;
  screen: string;
  activeIcon: any;
  inactiveIcon: any;
  isActive: boolean;
}

function TabButton({
  label = '',
  screen = '',
  activeIcon,
  inactiveIcon,
  isActive = false,
}: TabButtonProps) {
  const navigation = useNavigation<any>();

  const handleNavigate = React.useCallback(() => {
    navigation.navigate('BottomTabs', {screen});
  }, [navigation, screen]); // only include what you use

  const ActiveIcon = activeIcon;
  const InactiveIcon = inactiveIcon;

  return (
    <TouchableHighlight
      underlayColor={COLORS.active_bg}
      style={{
        width: moderateScale(70),
        height: moderateScale(70),
        borderRadius: moderateScale(70) / 2,
        padding: moderateScale(10),
        // marginHorizontal: scale(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        overflow: 'visible',
      }}
      onPress={handleNavigate}>
      <View style={{alignItems: 'center'}}>
        {isActive ? (
          <ActiveIcon height={moderateScale(25)} width={moderateScale(25)} />
        ) : (
          <InactiveIcon height={moderateScale(25)} width={moderateScale(25)} />
        )}
        <AppText
          numberOfLines={2}
          style={{
            color: isActive ? COLORS.theme : COLORS.neutral[600],
            fontSize: FontSizes.xs,
            marginTop: moderateScale(2),
            textAlign: 'center',
            width: moderateScale(70),
            // flexWrap: 'nowrap',
          }}>
          {label}
        </AppText>
      </View>
    </TouchableHighlight>
  );
}

export default React.memo(TabButton);
