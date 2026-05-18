import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {COLORS} from '@/constants/theme';
import {moderateScale, scale, verticalScale} from '../../utils/ScreenSize';
import {useAuth} from '../../hooks';

interface Props {
  supporter_id: number;
}
function RemoveButton({supporter_id}: Props) {
  const [disabled, setDisabled] = React.useState(false);
  const {user} = useAuth();

  const onHandlePress = async () => {
    if (disabled) {
      return;
    }

    try {
      // let result = await SupportService.removeSupporter({
      //   supporter_user_id: supporter_id,
      //   channel_users_id: user?.users_id,
      // });
      // if (result?.success) {
      //   dispatch(
      //     deleteFlatListItem({
      //       key: LIST_TYPES.SUPPORTERS,
      //       id: supporter_id,
      //       id_name: 'users_id'
      //     }),
      //   );
      //   setDisabled(true);
      // } else {
      //   dispatch(setFailedAlert());
      // }
    } catch (error) {
      // dispatch(setFailedAlert());
    }

    // console.log(result);
  };

  return (
    <TouchableOpacity
      style={[style.container, disabled && {backgroundColor: COLORS.inactive}]}
      onPress={onHandlePress}
      disabled={disabled}>
      <View>
        <Text style={{color: COLORS.white, fontSize: moderateScale(12)}}>
          Remove
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.red,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    borderRadius: scale(5),
  },
});

export default RemoveButton;
