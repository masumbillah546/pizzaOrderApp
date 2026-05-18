import React, { memo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/theme';
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import NotificationsService from '@/services/NotificationsService';
import { formatTimeDifference } from '@/utils/helpers';
import { Row, AppText } from '@/components';

function NotificationItem({ notification, navigation }) {
  const [isSeen, setIsSeen] = React.useState(notification?.is_read);
  const handleNotificationSeen = async () => {
    setIsSeen(true);
    try {
      await NotificationsService.sendNotificationSeenUpdate(
        notification?.notification_id,
      );
    } catch (error) {}
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleNotificationSeen();
      }}
    >
      <Row style={styles.container}>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <View style={styles.badgeContainer}>
            {!isSeen ? <View style={styles.unseen} /> : null}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <AppText style={{ fontWeight: '500', flex: 1, color: COLORS.neutral[800] }}>
              {notification?.notification_text || 'Notification Title'}
            </AppText>
            <Text
              style={{
                fontSize: moderateScale(10),
                color: COLORS.inactive,
              }}
            >
              {formatTimeDifference(notification?.created_date)} ago
            </Text>
          </Row>

          <AppText
            numberOfLines={2}
            style={{ fontSize: moderateScale(11), color: '#303030' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elitdolor sit
            amet
          </AppText>
        </View>
      </Row>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.inactive_2,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    borderRadius: scale(5),
    width: '100%',
    marginBottom: scale(10),
    gap: scale(10),
  },
  badgeContainer: {
    height: scale(12),
    width: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(5),
  },
  unseen: {
    height: scale(8),
    width: scale(8),
    borderRadius: scale(8) / 2,
    backgroundColor: COLORS.theme,
  },
  iconContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default memo(NotificationItem);
