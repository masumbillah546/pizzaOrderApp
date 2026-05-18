import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
//
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { COLORS, FontSizes } from '@/constants/theme';
import { AppText, Logo } from '@/components';

interface Props {
  navigation: any;
}

function MainHeader({ navigation }: Props) {
  return (
    <>
      <View style={[styles.container]}>
        <View style={{ width: moderateScale(45), overflow: 'hidden' }}>
          <Logo
            height={40}
            width={134}
            style={{ alignItems: 'flex-start' }}
            type="white"
          />
        </View>

        {navigation.getState().index === 0 && (
          <AppText
            style={{
              color: COLORS.white,
              fontSize: FontSizes.md,
            }}
          >
            Proposal jobs for you
          </AppText>
        )}

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.notificationButton}
          onPress={() => navigation.navigate('NotificationsCenter')}
        >
          {/* <NotificationIcon
            height={moderateScale(18)}
            width={moderateScale(18)}
          /> */}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.theme,
    paddingVertical: verticalScale(6),
    paddingBottom: verticalScale(10),
    paddingHorizontal: scale(15),
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  notificationButton: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF1A',
  },
});

export default React.memo(MainHeader);
