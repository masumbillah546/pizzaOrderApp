import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { GlowingSeparator, MobileHeader } from '@/components';
import { COLORS } from '@/constants/theme';

const EditProfileScreen = () => {
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <MobileHeader title="PROFILE EDIT" onMenu={() => {}} />
      <View style={styles.header}>
        <GlowingSeparator />

        <Text style={styles.headerName}>John Doe</Text>

        {/* Change Profile Pic Avatar Wrapper */}
        {/* <TouchableOpacity style={styles.avatarWrapper} activeOpacity={0.8}>
          <View style={styles.imageContainer}>
            <Image
              source={require('./assets/user_avatar.png')} // Replace with your local asset
              style={styles.avatarImage}
            />
            <Image
              source={require('./assets/yellow_blob_ring.png')}
              style={styles.blobOverlay}
              resizeMode="contain"
            />
            <View style={styles.plusOverlay}>
              <Plus size={moderateScale(28)} color="#FFFFFF" strokeWidth={3} />
            </View>
          </View>
          <Text style={styles.changePicText}>Change Profile Pic</Text>
        </TouchableOpacity> */}
      </View>

      {/* --- Edit Fields Form --- */}
      <ScrollView
        contentContainerStyle={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Standard Info Inputs */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Edit Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Change Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>BirthDay</Text>
          <TextInput
            style={styles.input}
            value={birthday}
            onChangeText={setBirthday}
            placeholderTextColor="#999999"
          />
        </View>

        {/* Shaded Password Section Container */}
        <View style={styles.passwordContainerBox}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Previous Password</Text>
            <TextInput
              style={styles.input}
              value={prevPassword}
              onChangeText={setPrevPassword}
              secureTextEntry
              placeholderTextColor="#999999"
            />
          </View>

          <View style={styles.inputGroupSub}>
            <Text style={styles.inputLabel}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholderTextColor="#999999"
            />
          </View>
        </View>

        {/* Submit Action Button */}
        <TouchableOpacity style={styles.changeButton} activeOpacity={0.9}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: COLORS.theme, // Theme orange
    // paddingTop: verticalScale(14),
    paddingBottom: verticalScale(15),
    alignItems: 'center',
    position: 'relative',
  },
  headerName: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: verticalScale(15),
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
  avatarImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
  },
  blobOverlay: {
    position: 'absolute',
    width: scale(100),
    height: scale(100),
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
  inputGroup: {
    marginBottom: verticalScale(25),
    alignItems: 'center',
  },
  inputGroupSub: {
    marginBottom: verticalScale(10),
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: verticalScale(2),
  },
  input: {
    width: '100%',
    height: verticalScale(30),
    borderBottomWidth: 1.5,
    borderBottomColor: '#444444',
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: '#000000',
    padding: 0, // Eliminates standard Android input text shifts
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
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
