import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';

// --- Types ---
interface SuccessModalProps {
  visible: boolean;
  orderId: string;
  onClose: () => void;
}

const OrderSuccessModal: React.FC<SuccessModalProps> = ({ 
  visible = true, 
  orderId = 'D5FX2', 
  onClose 
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Dimmed Backdrop Layer Overlay */}
      <View style={styles.backdropOverlay}>
        
        {/* Central White Modal Container Card */}
        <View style={styles.modalCard}>
          
          {/* Main Header Title Text */}
          <Text style={styles.congratulationText}>Congratulation</Text>

          {/* Stylized Clock Circle Render Graphic Container */}
          <View style={styles.clockCircleOuter}>
            <View style={styles.clockCircleInner}>
              {/* Vertical Fork Hand */}
              <View style={styles.forkHand} />
              {/* Horizontal/Angled Knife Hand */}
              <View style={styles.knifeHand} />
              {/* Central Pin Anchor Node */}
              <View style={styles.centerPin} />
            </View>
          </View>

          {/* Thin Horizontal Divider Separator Line */}
          <View style={styles.horizontalDivider} />

          {/* Dynamic Order Metadata Row Label */}
          <Text style={styles.orderIdLabel}>
            Your ID : <Text style={styles.orderIdHighlight}>{orderId}</Text>
          </Text>

          {/* Informational Subtext Copy Block */}
          <Text style={styles.subtextMessage}>
            We have got your message it take sometimes to get your dish.
          </Text>

          {/* Golden Yellow Interactive Confirmation CTA Button */}
          <TouchableOpacity 
            style={styles.thanksButton} 
            activeOpacity={0.8}
            onPress={onClose}
          >
            <Text style={styles.thanksButtonText}>Thanks</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdropOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent tinted dark backdrop layer
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(35),
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(4),
    paddingHorizontal: scale(25),
    paddingTop: verticalScale(25),
    paddingBottom: verticalScale(30),
    alignItems: 'center',
    // Structural Shadow Definitions matching UI Specs
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  congratulationText: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: verticalScale(25),
    letterSpacing: 0.3,
  },
  /* --- Fork & Knife Clock Graphic Layout --- */
  clockCircleOuter: {
    width: scale(135),
    height: scale(135),
    borderRadius: scale(67.5),
    backgroundColor: '#1E3A5F', // Primary dark blue clock base outer edge
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(6),
    marginBottom: verticalScale(25),
  },
  clockCircleInner: {
    width: '100%',
    height: '100%',
    borderRadius: scale(61.5),
    borderWidth: scale(3.5),
    borderColor: '#FFFFFF',
    backgroundColor: '#1E3A5F',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPin: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: '#FFFFFF',
    zIndex: 5,
  },
  forkHand: {
    position: 'absolute',
    width: scale(3.5),
    height: verticalScale(35),
    backgroundColor: '#FFFFFF',
    top: '18%',
    left: '48.5%',
    borderRadius: scale(1),
    // You can swap this line decoration out for a custom asset icon if rendering full fork tines
  },
  knifeHand: {
    position: 'absolute',
    width: scale(35),
    height: verticalScale(3),
    backgroundColor: '#FFFFFF',
    left: '50%',
    top: '50%',
    transform: [{ rotate: '15deg' }],
    borderRadius: scale(1),
  },
  /* --- Content Meta Blocks --- */
  horizontalDivider: {
    width: '80%',
    height: 1,
    backgroundColor: '#CCCCCC',
    marginBottom: verticalScale(16),
  },
  orderIdLabel: {
    fontSize: moderateScale(18),
    color: '#333333',
    fontWeight: '400',
    marginBottom: verticalScale(24),
  },
  orderIdHighlight: {
    color: '#E04F4F', // Distinctive Red/Orange confirmation text code signature
    fontWeight: 'bold',
  },
  subtextMessage: {
    fontSize: moderateScale(13),
    color: '#555555',
    textAlign: 'center',
    lineHeight: moderateScale(18),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(30),
  },
  /* --- Interactive CTA Action Layout --- */
  thanksButton: {
    backgroundColor: '#FFCC00', // Gold/Yellow UI button color mapping matching system standard
    width: '80%',
    height: verticalScale(45),
    borderRadius: moderateScale(22.5),
    justifyContent: 'center',
    alignItems: 'center',
    // Component Shadow accents
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  thanksButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default OrderSuccessModal;