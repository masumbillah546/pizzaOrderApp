import * as React from 'react';

import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  AppState,
} from 'react-native';
import DocumentPickerLibrary from 'react-native-document-picker';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import DeviceInfo from 'react-native-device-info';
import SocketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from '../../common/Global';
//
import { moderateScale, scale, verticalScale } from '../../common/ScreenSize';
import ChatService from '../../services/ChatService';
import incomingVideoCall from '../../utils/incoming-video-call';

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     chat_list: [],
     chat_text: '',
     isCollapsed: false,
     display: false,
     file: {},
     type: 'document',
     image_size: {},
    };
    this.animatedValue = new Animated.Value(0);
    this.animatedRotateValue = new Animated.Value(0);
    // const receiverId = route?.params?.editor?.email;
    // const receiverName = route?.params?.editor?.name;
    this.guestId = Math.floor(100000 + Math.random() * 900000).toString();
    this.socket = SocketIOClient(Global.INTERCOM_URL, {
      transports: ['websocket'],
      query: {
          callerId: this.props.route?.params?.username ||  this.guestId,
      },
    });

    this.receiverId = this.props.route?.params?.editor?.email;
    this.receiverName = this.props.route?.params?.editor?.name;

    this.data = this.props.route?.params?.data;
  }


  async componentDidMount() {

    if (this.data) {
      let data = this.data;
      this.setState({
        chatMessage: data.chatMessage,
        senderID: data.senderID,
        receiverID: data.receiverID,
        senderType: data.senderType
      });
      if (data.chatMessage !== '' && !data.file) {
        this.setState({chat_list: [...this.state.chat_list, {msg: data.chatMessage, file: null}]}); 
      } else if (data.chatMessage === '' && data.file) {
        this.setState({chat_list: [...this.state.chat_list, {msg: null, file: data.file, size: data.image_size}]});
      } else if (data.chatMessage !== '' && data.file) {
        this.setState({chat_list: [...this.state.chat_list, {msg: data.chatMessage, file: data.file, size: data.image_size}]});
      }
    } 

    this.socket.on('chatReceived', data => {

      if (AppState.currentState === 'background') {
        incomingVideoCall.configure();
        incomingVideoCall.backToForeground();
      }
      // alert(JSON.stringify(data))
      this.setState({
        chatMessage: data.chatMessage,
        senderID: data.senderID,
        receiverID: data.receiverID,
        senderType: data.senderType
      })

      if (data.chatMessage !== '' && !data.file) {
        this.setState({chat_list: [...this.state.chat_list, { msg: data.chatMessage, file: null}]}); 
      } else if (data.chatMessage === '' && data.file) {
        this.setState({chat_list: [...this.state.chat_list, { msg: null, file: data.file, size: data.image_size}]});
      } else if (data.chatMessage !== '' && data.file) {
        this.setState({chat_list: [...this.state.chat_list, { msg: data.chatMessage, file: data.file, size: data.image_size}]});
      }
    });

    // this.push_notification_configuration();
    //  let returnValue = await OrderChatService.get_all_chat_messages(this.props.route.params.order_details.order_details_id);
    // let returnValue = await ChatService.get_all_chat_messages(this.state.deviceUniqueId);

    //console.warn(returnValue)
    // if (returnValue.hasOwnProperty('success') && returnValue.success) {
    //     this.setState({ chat_messages: returnValue.chat_messages })
    // }

}

componentWillUnmount() {
  this.socket.off()
}

componentDidUpdate(pevProp, prevState) {

  if(prevState.chat_list.length !== this.state.chat_list.length) {
    this.list_ref.scrollToEnd();
  }

}

// push_notification_configuration() {
//   let myProps = this.props;
//   let that = this;
//   PushNotification.configure({

//       // (required) Called when a remote is received or opened, or local notification is opened
//       onNotification: function (notification) {

//           let a = myProps.navigation.dangerouslyGetState();

//           /* myProps.route.name and a.routes[a.index].name both are returning current route name
//           But when I go back by "go Back button" then myProps.route.name shows theat screen name from where I have clicked
//           "go back " button"
//           But a.routes[a.index].name shows which screen are visible 
//           */
//           if (
//               notification.tag == Global.NOTIFICATION_TYPE_CHAT &&
//               a.routes[a.index].name == "orderDetailsChat" &&
//               myProps.route.params.order_details_id == notification.data.ref_chat_order_details_id) {
              
//                   that.setState({ chat_messages: that.state.chat_messages.concat(notification.data) });
//           }
//           else {
//               //alert(notification.title+" "+"OrderDetailsChat Page")
//               RootNavigation.check(notification);

//           }

//           // (required) Called when a remote is received or opened, or local notification is opened
//           notification.finish(PushNotificationIOS.FetchResult.NoData);
//       },



//       // IOS ONLY (optional): default: all - Permissions to register.
//       permissions: {
//           alert: true,
//           badge: true,
//           sound: true,
//       },

//       // Should the initial notification be popped automatically
//       // default: true
//       popInitialNotification: false,

//       /**
//        * (optional) default: true
//        * - Specified if permissions (ios) and token (android and ios) will requested or not,
//        * - if not, you must call PushNotificationsHandler.requestPermissions() later
//        * - if you are not using remote notification or do not have Firebase installed, use this:
//        *     requestPermissions: Platform.OS === 'ios'
//        */
//       requestPermissions: true,
//   });
// };


async submit_replied_chat_text(replied_text) {
  this.socket.emit('chatSend', {
      chatMessage: replied_text,
      senderID: this.props.route?.params?.username ||  this.guestId,
      receiverID: this.receiverId || this.state.senderID,
      senderType: this.props.route?.params?.username ? 'owner' : 'guest'
  });

  //this.setState({ spinner: true });

  // if (replied_text.trim() != '') {
  //     // this.props.parent_function(2);
  //     let returnValue = await ChatService.store_replying_chat_message(this.state.deviceUniqueId, replied_text.trim());

  //     // console.warn(returnValue);
  //     if (returnValue.hasOwnProperty('success') && returnValue.success) {
  //         // this.setState({ replied_text: '' });
  //     } else {
  //         // AlertService.YourAlert(Lang[this.state.ln_type].failed, Lang[this.state.ln_type].something_went_wrong);
  //     }
  // }
  // else {
  //     // AlertService.YourAlert(Lang[this.state.ln_type].warning, Lang[this.state.ln_type].please_write_your_message_first);
  // }



  //this.setState({ spinner: false });


}

selectFile = async (type) => {

  this.handleUpload();

  try {
    const res = await DocumentPickerLibrary.pick({
      type: type === 'document' ? [DocumentPickerLibrary.types.allFiles] : [DocumentPickerLibrary.types.images],
    });

    if (type === 'document') {

      this.setState({file: null});

    } else {

      this.setState({file: res[0]});
      const imageUrl = res[0].uri;
      Image.getSize(imageUrl, (width, height) => {
        if (width > height) {
          this.setState({image_size: {height: verticalScale(100), width: '100%'}})
        } else {
          this.setState({image_size: {height: verticalScale(180), width: '100%'}})
        }
      }, error => {
        console.error('Error getting image dimensions: ', error);
      });

    }

  } catch (err) {
    this.setState({file: null});
    if (DocumentPickerLibrary.isCancel(err)) {  
    } else {
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
}

renderItem({item, index}) {
  // const isOdd = this.state.receiverID === this.receiverId
  const isOdd = !item.isOdd
  return(
    <View style={[{ flexDirection: 'row', marginBottom: 12, marginTop: index === 0 ? 12 : 0 ,  flexDirection: isOdd ? 'row-reverse' : 'row'}]}>
        {/* <Image
          source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}}
          style={{
            height: 40,
            width: 40,
            borderRadius: 40 / 2,
            marginHorizontal: 10,
          }}
        /> */}
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 40 / 2,
            marginHorizontal: 10,
            backgroundColor: '#C1C7D0',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: moderateScale(10)}}>{isOdd ? 'Guest' : 'You'}</Text>
        </View>
        <View
          style={[
            {
              flex: 1,
              // backgroundColor: '#F9F9FF',
              backgroundColor: 'white',
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 5,
              marginLeft: isOdd ? 60 : 0,
              marginRight: isOdd ? 0 : 60
            },
          ]}
        >
          { item.file &&
            <Image style={{...item.size}} resizeMode='contain' source={{uri: item.file}} />
          }
          { item.msg &&
          <Text style={[{textAlign: isOdd ? 'right' : 'left', color: 'black'}]}>
            {item.msg}
          </Text>
          }
        </View>
      </View>
  )
}

handleSend = () => {

  this.submit_replied_chat_text(this.state.chat_text);

  if (this.state.chat_text !== '' && !this.state.file?.uri) {
    this.setState({chat_list: [...this.state.chat_list, {isOdd: true, msg: this.state.chat_text, file: null}]}); 
  } else if (this.state.chat_text === '' && this.state.file?.uri) {
    this.setState({chat_list: [...this.state.chat_list, {isOdd: true, msg: null, file: this.state.file.uri, size: this.state.image_size}]});
  } else if (this.state.chat_text !== '' && this.state.file?.uri) {
    this.setState({chat_list: [...this.state.chat_list, {isOdd: true, msg: this.state.chat_text, file: this.state.file.uri, size: this.state.image_size}]});
  }
  this.setState({chat_text: '', file: {}});
}

startAnimation = () => {
  this.setState({display: true})
  Animated.timing(this.animatedValue, {
    toValue: 1,
    duration: 300,
    useNativeDriver: false,
  }).start(() => {

  });

  Animated.timing(this.animatedRotateValue, {
    toValue: 1,
    duration: 400,
    useNativeDriver: false,
  }).start(() => {
    // this.setState({display: false})
  });
}

endAnimation = () => {
  Animated.timing(this.animatedValue, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  }).start(() => {
    this.setState({display: false})
  });

  Animated.timing(this.animatedRotateValue, {
    toValue: 0,
    duration: 400,
    useNativeDriver: false,
  }).start(() => {
    // this.setState({display: false})
  });
}

handleUpload = () => {
  this.setState({isCollapsed: !this.state.isCollapsed});
  if (!this.state.isCollapsed) {
    this.startAnimation();
  } else {
    this.endAnimation();
  }
}

  render() {

    const spin = this.animatedRotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    });

    const height = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, verticalScale(50)],
    });

    return (
      <View style={styles.container}>
          <FlatList
            ref={(_ref) => {
              this.list_ref = _ref;
            }}
            data={this.state.chat_list}
            keyExtractor={(item, index) => String(index)}
            renderItem={this.renderItem.bind(this)}
            // onEndReachedThreshold={1}
            // onEndReached={() => this.list_ref.scrollToEnd()}
          />
          <View style={{ paddingVertical: verticalScale(20), backgroundColor: 'white', borderColor: 'gray', borderWidth: 0.5}}>

            {/* selected image showing here*/}
            {this.state.file?.uri &&
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(15), marginHorizontal: scale(10)}}>
              <TouchableOpacity onPress={() => this.handleUpload()} style={{width: scale(48), height: verticalScale(32), justifyContent: 'center', alignItems: 'center'}}>
                  <Image style={{height: scale(40), width: scale(40), borderRadius: scale(3)}} resizeMode='cover' source={{uri: this.state.file.uri}} />
              </TouchableOpacity>
            </View>
            }

            <View style={{flexDirection: 'row', alignItems: 'center',}}>
              <Animated.View style={{transform: [{rotate: spin}]}}>
                <TouchableOpacity onPress={() => this.handleUpload()} style={{width: scale(48), height: verticalScale(32), justifyContent: 'center', alignItems: 'center'}}>
                  <Image style={{height: scale(25), width: scale(25)}} resizeMode='contain' source={require('../../assets/icons/plus_upload.png')} />
                </TouchableOpacity>
              </Animated.View>

              <TextInput value={this.state.chat_text} multiline onChangeText={(val) => this.setState({chat_text: val})} placeholder='Write here' placeholderTextColor='gray' style={{backgroundColor: 'white', flex: 1, paddingHorizontal: 10, paddingVertical: 5, color: 'black',  borderColor: 'gray', borderWidth: 0.5, borderRadius: 5}}/>

              <TouchableOpacity
                onPress={() => this.handleSend()}
                style={{width: scale(48), height: verticalScale(32), justifyContent: 'center', alignItems: 'center'}}
              >
                <Image style={{height: scale(25), width: scale(25)}} resizeMode='contain' source={require('../../assets/icons/send_icon.png')} />
              </TouchableOpacity>
            </View>


          </View>

          {/* choose option showing here */}
          {this.state.display &&
          <Animated.View style={{flexDirection: 'row', justifyContent: 'center', zIndex: -1, backgroundColor: 'white', alignItems: 'center', height}}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginRight: scale(40)}}>
              <TouchableOpacity onPress={() => this.selectFile('document')} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{height: scale(25), width: scale(25), marginRight: scale(5)}} resizeMode='contain' source={require('../../assets/icons/a-page/document.png')} />
                <Text style={{color: 'black'}}>Document</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.selectFile('image')} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{height: scale(25), width: scale(25), marginRight: scale(5)}} resizeMode='contain' source={require('../../assets/icons/a-page/image.png')} />
                <Text style={{color: 'black'}}>Image</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",

  }
});
