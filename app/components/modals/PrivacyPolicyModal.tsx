import React, { useState, useEffect, useCallback, useMemo, FC } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { X, ChevronDown } from 'lucide-react-native';
//
import { moderateScale, scale, verticalScale } from '@/utils/ScreenSize';
import { HRLine, InputField, Spinner, AppText } from '@/components';
import { BorderRadius, COLORS, FontSizes } from '@/constants/theme';

interface PrivacyPolicyModalProps {
  title: string;
  content_type: string;
  content_body: string;
  content_url: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const PrivacyPolicyModal: FC<PrivacyPolicyModalProps> = ({
  title,
  content_type,
  content_body,
  content_url,
  visible,
  setVisible,
}) => {
  /* Close modal */
  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <Modal visible={visible} transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close */}
          <View style={styles.closeContainer}>
            <AppText style={{ fontSize: FontSizes.lg, flex: 1 }}>{title}</AppText>
            <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
              <X />
            </TouchableOpacity>
          </View>

          <HRLine />

          {content_type === 'text' && (
            <ScrollView>
              <AppText>{content_body}</AppText>
            </ScrollView>
          )}

          {content_type === 'html' && (
            <ScrollView>
              <AppText>{content_body}</AppText>
            </ScrollView>
          )}
          {/* {content_type === 'html' && (
            <Webview>
              <AppText>{content_body}</AppText>
            </Webview>
          )} */}
        </View>
      </View>
    </Modal>
  );
};

export default PrivacyPolicyModal;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: COLORS.black_opacity,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '90%',
    height: '60%',
    backgroundColor: COLORS.white,
    padding: scale(20),
    gap: verticalScale(10),
  },

  closeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    padding: scale(5),
    marginTop: -verticalScale(10),
    marginRight: -scale(5),
  },
});
