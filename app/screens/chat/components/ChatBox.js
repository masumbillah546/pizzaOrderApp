import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Paperclip, Camera, Images } from 'lucide-react-native';
import ScreenSize, {
  moderateScale,
  scale,
  verticalScale,
} from '@/utils/ScreenSize';
import Lang from '@/languages';
import { Row, AppText } from '@/components';
import { BorderRadius, COLORS, Shadows } from '@/constants/theme';

export default ({ chat_text, onChangeText, selectFile }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const handleSelectFile = () => {
    selectFile(true);
    setShowMenu(false);
  };
  return (
    <>
      {showMenu && (
        <>
          <Pressable
            style={styles.overlay}
            onPress={() => setShowMenu(false)}
          />
          <View
            onStartShouldSetResponder={() => true}
            style={{
              position: 'absolute',
              backgroundColor: COLORS.white,
              gap: moderateScale(15),
              width: moderateScale(125),
              top: -moderateScale(120),
              left: scale(20),
              padding: scale(10),
              borderRadius: BorderRadius.lg,
              ...Shadows.large,
            }}
          >
            <TouchableOpacity onPress={handleSelectFile}>
              <Row style={{ gap: scale(5) }}>
                <Camera color={COLORS.neutral[600]} size={moderateScale(18)} />
                <AppText>Camera</AppText>
              </Row>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSelectFile}>
              <Row style={{ gap: scale(5) }}>
                <Images color={COLORS.neutral[600]} size={moderateScale(18)} />
                <AppText>Images</AppText>
              </Row>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSelectFile}>
              <Row style={{ gap: scale(5) }}>
                <Paperclip
                  color={COLORS.neutral[600]}
                  size={moderateScale(18)}
                />
                <AppText>Upload File</AppText>
              </Row>
            </TouchableOpacity>
          </View>
        </>
      )}
      <Row
        style={{
          flex: 1,
          backgroundColor: '#EAEAEC',
          borderRadius: BorderRadius.xl,
          overflow: 'hidden',
          height: moderateScale(46),
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            width: moderateScale(45),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setShowMenu(!showMenu)}
        >
          <Paperclip size={moderateScale(20)} color={COLORS.theme} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputField}
          multiline
          placeholderTextColor="gray"
          placeholder={'Type your message'}
          value={chat_text}
          onChangeText={onChangeText}
          onPress={() => setShowMenu(false)}
        />
      </Row>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: ScreenSize.SH,
    width: ScreenSize.SW,
    // top: 0,
    // left: 0,
    // right: 0,
    bottom: 0,
    // zIndex: -1,
  },
  inputField: {
    fontSize: moderateScale(14),
    paddingLeft: 0,
    paddingRight: moderateScale(10),
    flex: 1,
    height: '100%',
    backgroundColor: '#EAEAEC',
    color: '#000000',
  },
});
