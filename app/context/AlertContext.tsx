// AlertContext.js
import React, { createContext, useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { X } from 'lucide-react-native';
//
import { COLORS } from '@/constants/theme';
import { moderateScale, scale, verticalScale } from '../utils/ScreenSize';
//
// import SuccessIcon from '@/assets/icons/success.svg';
// import FailedIcon from '@/assets/icons/failed.svg';
import Row from '@/components/Row';
import ButtonRound from '@/components/buttonComponents/ButtonRound';
import AppText from '@/components/AppText';

const AlertToast = ({ text1, text2, type }: any) => {
  return (
    <TouchableNativeFeedback onPress={() => Toast.hide()}>
      <View style={[styles.toastCard]}>
        <Row style={{ minHeight: moderateScale(30), alignItems: 'flex-start' }}>
          {/* {type === 'success' ? (
            <SuccessIcon width={moderateScale(24)} height={moderateScale(24)} />
          ) : (
            <FailedIcon width={moderateScale(24)} height={moderateScale(24)} />
          )} */}
          <View style={{ flex: 1, marginLeft: moderateScale(10) }}>
            <AppText
              numberOfLines={1}
              style={{
                color: COLORS.black,
                flex: 1,
                fontWeight: '500',
                marginBottom: moderateScale(5),
              }}
            >
              {text1}
            </AppText>
            <AppText
              numberOfLines={2}
              style={{
                color: COLORS.black,
                flex: 1,
                fontSize: moderateScale(12),
              }}
            >
              {text2}
            </AppText>
          </View>
          <ButtonRound
            size={35}
            icon={<X size={moderateScale(20)} />}
            onPress={() => Toast.hide()}
            style={{
              marginRight: -moderateScale(10),
              marginTop: -moderateScale(5),
            }}
          />
        </Row>
      </View>
    </TouchableNativeFeedback>
  );
};

const toastConfig = {
  error: ({ text1, text2 }: any) => (
    <AlertToast text1={text1} text2={text2} type={'error'} />
  ),
  success: ({ text1, text2 }: any) => (
    <AlertToast text1={text1} text2={text2} type={'success'} />
  ),
  location: () => null,
};

export const AlertContext = createContext({
  showSuccessAlert: (prop?: any): void => {},
  showFailedAlert: (prop?: any): void => {},
});

export let showFailedAlert = React.createRef<any>()?.current?.value;

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {

  const showSuccessAlert = useCallback(
    ({ title, message, ...props }: any = {}) => {
      Toast.show({
        type: 'success',
        text1: title || 'success',
        text2: message || 'successfully done',
      });
    },
    [],
  );

  showFailedAlert = useCallback((props: any) => {
    Toast.show({
      type: 'error',
      text1: props?.title,
      text2: props?.message,
    });
  }, []);

  return (
    <AlertContext.Provider
      value={{
        showSuccessAlert,
        showFailedAlert,
      }}
    >
      {children}
      <Toast
        config={toastConfig}
        position="bottom"
        bottomOffset={moderateScale(70)}
        visibilityTime={2000}
        autoHide={true}
        // onHide={() => Toast.hide()}
        // autoHide={true}
        // onPress={() => Toast.hide()}
      />
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastCard: {
    // height: verticalScale(60),
    width: '90%',
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: scale(10),
    padding: scale(15),
    paddingVertical: verticalScale(10),
    minHeight: verticalScale(70),
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: scale(5),
  },
});
