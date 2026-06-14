import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { AppText } from '@/components';
import { moderateScale, scale } from '@/utils/ScreenSize';
import { Trash } from 'lucide-react-native';
import { useCartStore } from '@/stores/cartStore';

export default function QuantitySelector({
  quantity,
  onChange,
  onDelete,
}: {
  quantity: number;
  onChange: (value: number) => void;
  onDelete: () => void;
}) {

  return (
    <View style={styles.quantityRow}>
      {quantity > 0 ? (
        <>
          <TouchableHighlight
            // disabled={quantity === 1}
            underlayColor="#F1F3FF"
            style={styles.quantityButton}
            // onPress={() => onChange(Math.max(1, quantity - 1))}
            onPress={() => {
              if (quantity === 1) {
                onDelete()
              } else{

                onChange(quantity - 1)
              }
            }}
          >
            {quantity === 1 ? (
              <Trash size={moderateScale(15)} color="black" />
            ) : (
              <AppText style={styles.quantitySymbol}>-</AppText>
            )}
          </TouchableHighlight>
          <AppText style={styles.quantityValue}>{quantity}</AppText>
        </>
      ) : (
        <View style={{ flex: 1 }} />
      )}
      <TouchableHighlight
        underlayColor="#F1F3FF"
        style={[styles.quantityButton]}
        onPress={() => onChange(quantity + 1)}
      >
        <AppText style={styles.quantitySymbol}>+</AppText>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(18),
  },

  quantityButton: {
    width: moderateScale(28),
    height: moderateScale(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    backgroundColor: '#F1F3FF',
  },

  quantitySymbol: {
    color: '#202632',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(10),
    textAlign: 'center',
    fontWeight: '700',
  },

  quantityValue: {
    color: '#202632',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(30),
    fontWeight: '500',
    minWidth: scale(20),
    textAlign: 'center',
    flex: 1,
  },
});
