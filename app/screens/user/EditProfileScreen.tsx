import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import {
  ButtonLarge,
  GlowingSeparator,
  InputField,
  MobileHeader,
} from '@/components';
import { COLORS } from '@/constants/theme';
import ProfilePhoto from './components/ProfilePhoto';

const EditProfileScreen = ({ navigation }: { navigation: any }) => {
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleKeyboardShow = (event: any) => {
    setKeyboardHeight(event.endCoordinates.height);
  };

  const handleKeyboardHide = () => {
    setKeyboardHeight(0);
  };

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : keyboardHeight > 0
          ? 'height'
          : undefined
      }
    >
      <MobileHeader title="PROFILE EDIT" onBack={() => navigation.goBack()} />
      <GlowingSeparator />
      {/* --- Edit Fields Form --- */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerName}>John Doe</Text>

          {/* Change Profile Pic Avatar Wrapper */}
          <TouchableOpacity style={styles.avatarWrapper} activeOpacity={0.8}>
            <View style={styles.imageContainer}>
              <ProfilePhoto />
              <View style={styles.plusOverlay}>
                <Plus
                  size={moderateScale(28)}
                  color="#FFFFFF"
                  strokeWidth={3}
                />
              </View>
            </View>
            <Text style={styles.changePicText}>Change Profile Pic</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <InputField
            placeholder="Edit Location"
            value={location}
            onChangeText={setLocation}
          />
          <InputField
            placeholder="Change Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            placeholder="BirthDay"
            value={birthday}
            onChangeText={setBirthday}
          />

          {/* Shaded Password Section Container */}
          <View style={styles.passwordContainerBox}>
            <InputField
              placeholder="Previous Password"
              value={prevPassword}
              onChangeText={setPrevPassword}
              inputContainerStyle={{ backgroundColor: 'transparent' }}
            />

            <InputField
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              inputContainerStyle={{ backgroundColor: 'transparent' }}
            />
          </View>

          {/* Submit Action Button */}
          <ButtonLarge
            title="Change"
            style={styles.changeButton}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: COLORS.theme, // Theme orange
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    position: 'relative',
  },
  headerName: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: verticalScale(20),
  },
  avatarWrapper: {
    alignItems: 'center',
  },
  imageContainer: {
    width: scale(95),
    height: scale(95),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  plusOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  changePicText: {
    color: '#FFFFFF',
    fontSize: moderateScale(15),
    fontWeight: '700',
    marginTop: verticalScale(12),
  },
  formContainer: {
    paddingHorizontal: scale(35),
    paddingTop: verticalScale(25),
    paddingBottom: verticalScale(40),
  },
  passwordContainerBox: {
    backgroundColor: '#FBECE1', // Soft tinted orange shade container
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(15),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(30),
  },
  changeButton: {
    backgroundColor: '#FFCC00', // Gold/Yellow UI button color
    marginTop: verticalScale(5),
    maxWidth: '100%',
  },
});

export default EditProfileScreen;
