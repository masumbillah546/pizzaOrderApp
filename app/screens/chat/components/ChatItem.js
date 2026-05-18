import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
//
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import moment from 'moment';
import { BorderRadius, COLORS } from '@/constants/theme';
import { Row } from '@/components';
//
function convertTimestamp(timestamp) {
  // Convert timestamp (milliseconds) to seconds
  const seconds = Math.floor(timestamp / 1000);

  // Convert timestamp to minutes
  const minutes = Math.floor(seconds / 60);

  // Convert timestamp to hours
  const hours = Math.floor(minutes / 60);

  // Convert timestamp to days
  const days = Math.floor(hours / 24);

  // Convert timestamp to months
  const months = Math.floor(days / 30);

  // Convert timestamp to years
  const years = Math.floor(days / 365);

  return {
    seconds: seconds,
    minutes: minutes,
    hours: hours,
    days: days,
    months: months,
    years: years,
  };
}
const ChatItem = ({ item, index }) => {
  // const isOdd = this.state.receiverID === this.receiverId
  if (item.file_link) {
    item.file = item.file_link;
  }
  const isOdd = item.sender_type == 'ADMIN';
  return (
    <Row
      style={[
        {
          alignItems: 'flex-start',
          gap: moderateScale(10),
          flexDirection: isOdd ? 'row-reverse' : 'row',
        },
      ]}
    >
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        }}
        // source={{
        //   uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg',
        // }}
        style={{
          height: moderateScale(40),
          width: moderateScale(40),
          borderRadius: moderateScale(40) / 2,
        }}
      />
      {/* <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 40 / 2,
          marginHorizontal: 10,
          backgroundColor: '#C1C7D0',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: moderateScale(10),
          }}>
          {isOdd ? 'Admin' : 'You'}
        </Text>
      </View> */}
      <View
        style={[
          {
            flex: 1,
            backgroundColor: COLORS.neutral[100],
            padding: moderateScale(10),
            gap: verticalScale(10),
            borderRadius: BorderRadius.sm,
            marginLeft: isOdd ? moderateScale(60) : 0,
            marginRight: isOdd ? 0 : moderateScale(60),
          },
        ]}
      >
        {/* sat at 6:10am */}
        {/* <Text style={{color: '#9FA0A7', fontSize: moderateScale(11), textAlign: isOdd ? 'right' : 'left',}}>
          {convertTimestamp(moment().diff(item?.sending_date_time)).seconds > 0 && convertTimestamp(moment().diff(item?.sending_date_time)).seconds < 60 && <span style={{ color: 'red' }}>New</span>}
          {convertTimestamp(moment().diff(item?.sending_date_time)).minutes > 0  && convertTimestamp(moment().diff(item?.sending_date_time)).minutes < 60 && `${convertTimestamp(moment().diff(item?.sending_date_time)).minutes} min ago`}
          {convertTimestamp(moment().diff(item?.sending_date_time)).hours > 0 && convertTimestamp(moment().diff(item?.sending_date_time)).hours < 24 && `${convertTimestamp(moment().diff(item?.sending_date_time)).hours} hrs ago`}
          {convertTimestamp(moment().diff(item?.sending_date_time)).days > 0 && convertTimestamp(moment().diff(item?.sending_date_time)).days < 30 && `${convertTimestamp(moment().diff(item?.sending_date_time)).days} days ago`}
          {convertTimestamp(moment().diff(item?.sending_date_time)).months > 0 && convertTimestamp(moment().diff(item?.sending_date_time)).months < 12 && `${convertTimestamp(moment().diff(item?.sending_date_time)).months} months ago`}
          {convertTimestamp(moment().diff(item?.sending_date_time)).years > 0 && `${convertTimestamp(moment().diff(item?.sending_date_time)).years} years ago`}
        </Text> */}

        {item.file && (
          <View
            style={{
              borderRadius: 5,
              overflow: 'hidden',
              height: moderateScale(200),
              width: '100%',
              ...item.size,
            }}
          >
            <Image
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'gray',
                ...item.size,
              }}
              resizeMode="contain"
              source={{ uri: item.file }}
            />
          </View>
        )}

        {item.msg_text && (
          <Text
            style={[
              {
                textAlign: isOdd ? 'right' : 'left',
                color: COLORS.neutral[700],
                fontSize: moderateScale(14),
              },
            ]}
          >
            {item.msg_text}
          </Text>
        )}
      </View>
    </Row>
  );
};

export default ChatItem;
