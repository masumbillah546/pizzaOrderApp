import { moderateScale, verticalScale } from '@/utils/ScreenSize';
import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './AppText';
import { COLORS } from '@/constants/theme';

const ConfirmAlert = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Yes',
  cancelLabel = 'Cancel',
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      // animationType="slide"
      onRequestClose={onCancel} // Handles Android back button
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.message}>{message}</AppText>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <AppText style={styles.cancelText}>{cancelLabel}</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <AppText style={styles.confirmText}>{confirmLabel}</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: moderateScale(15),
    padding: moderateScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  message: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(20),
    textAlign: 'center',
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginHorizontal: moderateScale(5),
    alignItems: 'center',
  },
  cancelButton: { backgroundColor: '#f0f0f0' },
  confirmButton: { backgroundColor: COLORS.theme },
  cancelText: { color: '#333', fontWeight: '700' },
  confirmText: { color: '#fff', fontWeight: '700' },
});

export default ConfirmAlert;
