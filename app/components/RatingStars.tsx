import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Star} from 'lucide-react-native';
import {COLORS, Spacing} from '@/constants/theme';
import AppText from './AppText';

interface RatingStarsProps {
  rating: number;
  totalStars?: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  editable?: boolean;
  spacing?: number;
  onChange?: (rating: number) => void;
  showRating?: boolean;
}

export default function RatingStars({
  rating,
  totalStars = 5,
  size = 24,
  color = COLORS.warning[500],
  emptyColor = COLORS.neutral[300],
  editable = false,
  spacing = Spacing.xs,
  onChange,
  showRating = false,
}: RatingStarsProps) {
  const handlePress = (index: number) => {
    if (editable && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {Array(totalStars)
          .fill(0)
          .map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(index)}
              disabled={!editable}
              style={{marginRight: index < totalStars - 1 ? spacing : 0}}>
              <Star
                size={size}
                color={index < rating ? color : emptyColor}
                fill={index < rating ? color : 'transparent'}
              />
            </TouchableOpacity>
          ))}
      </View>

      {showRating && <AppText style={styles.ratingText}>{rating.toFixed(1)}</AppText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: Spacing.sm,
    fontWeight: '600',
    color: COLORS.neutral[700],
  },
});
