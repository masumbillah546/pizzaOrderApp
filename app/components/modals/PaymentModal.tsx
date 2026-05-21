import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Utensils, X } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';
import { ButtonLarge } from '../buttonComponents';

// --- Types ---
interface PaymentModalProps {
  visible: boolean;
  totalPrice: number;
  onClose: () => void;
  onConfirm: (method: 'cash' | 'card') => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible = true,
  totalPrice = 50,
  onClose,
  onConfirm,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Background Backdrop Tint Filter Overlay */}
      <View style={styles.backdropOverlay}>
        {/* Core White Content Base Window Card */}
        <View style={styles.modalCard}>
          {/* Floating Top Right Round Dismiss Icon Anchor Button */}
          <TouchableOpacity
            style={styles.floatingCloseCircle}
            activeOpacity={0.8}
            onPress={onClose}
          >
            <X size={moderateScale(18)} color="#FFFFFF" strokeWidth={3} />
          </TouchableOpacity>

          {/* Header Metric Row Container */}
          <View style={styles.headerInfoRow}>
            <Utensils
              size={moderateScale(22)}
              color="#333333"
              style={styles.headerIcon}
            />
            <Text style={styles.headerTitleLabel}>Total Price</Text>
          </View>

          {/* Massive Display Price Title Label */}
          <Text style={styles.priceHighlightText}>${totalPrice}</Text>

          {/* Centered Decorative Accent Divider Line */}
          <View style={styles.horizontalDivider} />

          {/* --- SECTION 1: Radio Selection Toggle Group --- */}
          <View style={styles.radioGroupSection}>
            {/* Cash Selector Variant Row */}
            <TouchableOpacity
              style={styles.radioOptionRow}
              activeOpacity={0.7}
              onPress={() => setPaymentMethod('cash')}
            >
              <View style={styles.radioOuterRing}>
                {paymentMethod === 'cash' && (
                  <View style={styles.radioInnerFill} />
                )}
              </View>
              <Text style={styles.radioOptionLabelText}>Cash Payment</Text>
            </TouchableOpacity>

            {/* Card Selector Variant Row */}
            <TouchableOpacity
              style={styles.radioOptionRow}
              activeOpacity={0.7}
              onPress={() => setPaymentMethod('card')}
            >
              <View style={styles.radioOuterRing}>
                {paymentMethod === 'card' && (
                  <View style={styles.radioInnerFill} />
                )}
              </View>
              <Text style={styles.radioOptionLabelText}>Card Payment</Text>
            </TouchableOpacity>
          </View>

          {/* --- SECTION 2: Payment Text Form Fields Block --- */}
          {/* Enabled globally or condition-dependent based on system specs flow context */}
          <View style={styles.inputFormContainer}>
            <View style={styles.fieldWrapperFull}>
              <TextInput
                style={styles.underlinedInputField}
                placeholder="Cardholder Name"
                placeholderTextColor="#A0A0A0"
                value={cardholderName}
                onChangeText={setCardholderName}
                editable={paymentMethod === 'card'}
              />
            </View>

            <View style={styles.fieldWrapperFull}>
              <TextInput
                style={styles.underlinedInputField}
                placeholder="Card Number"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
                editable={paymentMethod === 'card'}
              />
            </View>

            {/* In-Line Dual Element Layout Split Row for Date/Secure Code metrics */}
            <View style={styles.splitRowFields}>
              <View style={styles.fieldWrapperSplit}>
                <TextInput
                  style={styles.underlinedInputField}
                  placeholder="Exp. Date"
                  placeholderTextColor="#A0A0A0"
                  value={expDate}
                  onChangeText={setExpDate}
                  editable={paymentMethod === 'card'}
                />
              </View>

              <View style={styles.fieldWrapperSplit}>
                <TextInput
                  style={styles.underlinedInputField}
                  placeholder="CVV"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="numeric"
                  secureTextEntry
                  value={cvv}
                  onChangeText={setCvv}
                  editable={paymentMethod === 'card'}
                />
              </View>
            </View>
          </View>

          {/* --- SECTION 3: Action Control Footer Row Elements --- */}
          <View style={styles.actionButtonFooterRow}>
            <ButtonLarge
              title="Back to Cart"
              onPress={onClose}
              style={styles.baseActionBtn}
            />
            <ButtonLarge
              variant="warning"
              title="Ok"
              onPress={() => onConfirm?.(paymentMethod)}
              style={styles.baseActionBtn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdropOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed modal scene backdrop matching tracking specifications
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(25),
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(4),
    paddingHorizontal: scale(30),
    paddingTop: verticalScale(25),
    paddingBottom: verticalScale(30),
    alignItems: 'center',
    position: 'relative',
    // Structural Shadow Definitions
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  floatingCloseCircle: {
    position: 'absolute',
    top: verticalScale(-20),
    right: scale(-10),
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    backgroundColor: '#FFCC00', // Yellow core dismiss accent color tracking mapping
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    zIndex: 100,
  },
  headerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  headerIcon: {
    marginRight: scale(8),
  },
  headerTitleLabel: {
    fontSize: moderateScale(16),
    color: '#666666',
    fontWeight: '500',
  },
  priceHighlightText: {
    fontSize: moderateScale(52),
    fontWeight: 'bold',
    color: '#2A2A2A',
    lineHeight: verticalScale(55),
  },
  horizontalDivider: {
    width: '70%',
    height: scale(1.5),
    backgroundColor: '#333333',
    marginVertical: verticalScale(20),
  },
  /* --- Radio Button Grid Settings --- */
  radioGroupSection: {
    width: '100%',
    paddingLeft: scale(25),
    marginBottom: verticalScale(20),
  },
  radioOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(14),
  },
  radioOuterRing: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    borderWidth: scale(3.5),
    borderColor: '#333333', // Deep vector boundaries matching design targets
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  radioInnerFill: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(3.5),
    backgroundColor: '#333333',
  },
  radioOptionLabelText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#555555',
  },
  /* --- Input Form Underlines Layout --- */
  inputFormContainer: {
    width: '100%',
    marginBottom: verticalScale(35),
  },
  fieldWrapperFull: {
    width: '100%',
    marginBottom: verticalScale(14),
  },
  splitRowFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  fieldWrapperSplit: {
    width: '45%',
  },
  underlinedInputField: {
    width: '100%',
    height: verticalScale(32),
    borderBottomWidth: scale(1.5),
    borderBottomColor: '#666666', // Deep linear horizontal line anchor tracking visual interface fields
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    paddingBottom: verticalScale(2),
  },
  /* --- CTA Button Layout Groups --- */
  actionButtonFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  baseActionBtn: {
    width: '46%',
    height: verticalScale(44),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default PaymentModal;
