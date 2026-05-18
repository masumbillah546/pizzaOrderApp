import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Star, X } from 'lucide-react-native';
import { scale, verticalScale, moderateScale } from '@/utils/ScreenSize';

// --- Types ---
interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  visible = true,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number>(4); // Defaults to 4 out of 5 stars based on design specs
  const [comment, setComment] = useState<string>('');

  const handleStarPress = (index: number) => {
    setRating(index);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Dimmed Background Backdrop Mask Layer */}
      <View style={styles.backdropOverlay}>
        
        {/* Core White Modal Container Box */}
        <View style={styles.modalCard}>
          
          {/* Floating Yellow Close Badge Icon Button */}
          <TouchableOpacity 
            style={styles.floatingCloseCircle} 
            activeOpacity={0.8}
            onPress={onClose}
          >
            <X size={moderateScale(18)} color="#FFFFFF" strokeWidth={3} />
          </TouchableOpacity>

          {/* Modal Header Title */}
          <Text style={styles.modalHeaderTitle}>Rate now</Text>

          {/* --- SECTION 1: Pastel Gray Banner Block for Star Selectors --- */}
          <View style={styles.starRatingBanner}>
            <View style={styles.starsRowHorizontal}>
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const isSelected = starIndex <= rating;
                return (
                  <TouchableOpacity
                    key={starIndex}
                    activeOpacity={0.7}
                    onPress={() => handleStarPress(starIndex)}
                    style={styles.starInteractiveHitbox}
                  >
                    <Star
                      size={moderateScale(32)}
                      color={isSelected ? '#F4A472' : '#8A94A6'} // Coral Peach fill vs Slate Gray empty tone
                      fill={isSelected ? '#F4A472' : '#8A94A6'}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* --- SECTION 2: Comment Input Form field --- */}
          <View style={styles.formContainerInput}>
            <TextInput
              style={styles.underlinedCommentInput}
              placeholder="Write Comments"
              placeholderTextColor="#777777"
              value={comment}
              onChangeText={setComment}
              multiline={false}
            />
          </View>

          {/* Thank You Note Content Context Block */}
          <Text style={styles.gratitudeSubtextText}>
            Thanks for your comments and take our service.
          </Text>

          {/* --- SECTION 3: Bottom Action Execution Button --- */}
          <TouchableOpacity 
            style={styles.enjoySubmitButton} 
            activeOpacity={0.85}
            onPress={() => onSubmit?.(rating, comment)}
          >
            <Text style={styles.enjoyButtonText}>Enjoy!!!</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdropOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)', // Custom tinted structural blur alternative overlay masking
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(30),
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(4),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(30),
    alignItems: 'center',
    position: 'relative',
    // Structural Shadow Definitions
    elevation: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.25,
    shadowRadius: 9,
  },
  floatingCloseCircle: {
    position: 'absolute',
    top: verticalScale(-18),
    right: scale(-10),
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#FFCC00', // Matches bright yellow structural dismiss accents
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    zIndex: 99,
  },
  modalHeaderTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#2B2B2B',
    marginBottom: verticalScale(20),
    letterSpacing: 0.2,
  },
  /* --- Horizontal Star Matrix Banner --- */
  starRatingBanner: {
    width: '100%',
    backgroundColor: '#F2F2F2', // Light pastel container belt tracking image specifications
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(35),
  },
  starsRowHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  starInteractiveHitbox: {
    paddingHorizontal: scale(6),
  },
  /* --- Feedback Text Input Custom Mechanics --- */
  formContainerInput: {
    width: '80%',
    marginBottom: verticalScale(40),
  },
  underlinedCommentInput: {
    width: '100%',
    height: verticalScale(36),
    borderBottomWidth: scale(1.5),
    borderBottomColor: '#666666', // Deep accent anchor matching payment screen specifications
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: '#333333',
    paddingHorizontal: scale(4),
    paddingBottom: verticalScale(2),
  },
  gratitudeSubtextText: {
    fontSize: moderateScale(14),
    color: '#444444',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    paddingHorizontal: scale(35),
    fontWeight: '500',
    marginBottom: verticalScale(35),
  },
  /* --- Enjoy Call To Action Button --- */
  enjoySubmitButton: {
    backgroundColor: '#FFCC00', // Signature gold branding color mapping
    width: '60%',
    height: verticalScale(44),
    borderRadius: moderateScale(22),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  enjoyButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default RatingModal;