import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Animated,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { X, Paperclip } from 'lucide-react-native';
// import DocumentPickerLibrary from 'react-native-document-picker';
// import DocumentPickerLibrary from 'react-native-document-picker';
//
import { scale, verticalScale } from '@/utils/ScreenSize';
import { Row } from '@/components';
// import {
//   requestExternalStorageReadPermission,
//   requestExternalStorageWritePermission,
//   requestLocationPermission,
// } from '../../../common/permissions';

export default class AnimatedFilePicker extends Component {
  constructor() {
    super();

    this.state = {
      isCollapsed: false,
      display: false,
      file: {},
      type: 'document',
      image_size: {},
    };
    this.animatedValue = new Animated.Value(0);
  }

  // selectFile = async type => {
  //   // this.handleCollapsed();

  //   await requestExternalStorageReadPermission();
  //   await requestExternalStorageWritePermission();
  //   await requestLocationPermission();
  //   // await requestCameraPermission();

  //   try {
  //     // cache cleaning
  //     // await RNFS.readDir(RNFS.CachesDirectoryPath).then(f => {
  //     //   return Promise.all(
  //     //     f.map(e => {
  //     //       RNBU.fs.unlink(`${e.path}`);
  //     //     }),
  //     //   );
  //     // });

  //     const res = await DocumentPickerLibrary.pick({
  //       type: [DocumentPickerLibrary.types.images],
  //     });

  //     // console.log(res);
  //     if (res[0].uri) {
  //       const imageUrl = res[0].uri;
  //       this.setState({file: {uri: imageUrl}});
  //       Image.getSize(
  //         imageUrl,
  //         (width, height) => {
  //           if (width > height) {
  //             this.setState({
  //               image_size: {height: verticalScale(150), width: '100%'},
  //             });
  //           } else {
  //             this.setState({
  //               image_size: {height: verticalScale(180), width: '100%'},
  //             });
  //           }
  //         },
  //         error => {
  //           console.error('Error getting image dimensions: ', error);
  //         },
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  startAnimation = () => {
    this.setState({ display: true });
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {});
  };

  endAnimation = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      this.setState({ display: false });
    });
  };

  handleCollapsed = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
    if (!this.state.isCollapsed) {
      this.startAnimation();
    } else {
      this.endAnimation();
    }
  };

  render() {
    const height = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, verticalScale(50)],
    });

    return (
      <>
        {this.state.display && (
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              zIndex: -1,
              backgroundColor: 'white',
              alignItems: 'center',
              height,
            }}
          >
            <TouchableOpacity
              onPress={() => this.handleCollapsed()}
              style={{
                padding: scale(10),
                marginStart: scale(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <X size={scale(25)} />
            </TouchableOpacity>
            <Row
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: scale(40),
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.selectFile('document')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Paperclip size={scale(25)} />
                  <Text style={{ color: 'black' }}>Document</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.selectFile('image')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Paperclip size={scale(25)} />
                  <Text style={{ color: 'black' }}>Image</Text>
                </TouchableOpacity>
              </View>
            </Row>
            <View
              style={{
                padding: scale(10),
                marginEnd: scale(30),
                height: scale(25),
                width: scale(25),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </Animated.View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({});
