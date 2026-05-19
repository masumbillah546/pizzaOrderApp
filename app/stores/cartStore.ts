// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Platform } from 'react-native';
import { create } from 'zustand';
import { Product } from './types';

type CartState = {
  products: Product[];
  total: number;
  addToCart: (newProduct: Product) => Promise<void>;
  removeFromCart: (productId: string) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  total: 0,
  products: [],

  addToCart: async (newProduct: Product) => {
    const updatedProducts = [...get().products, newProduct];
    set({ products: updatedProducts, total: updatedProducts.length });
  },

  removeFromCart: (productId: string) => {
    const updatedProducts = get().products.filter(
      product => product.id !== productId,
    );
    set({ products: updatedProducts, total: updatedProducts.length });
  },

  updateProductQuantity: (productId: string, quantity: number) => {
    const updatedProducts = get().products.map(product => {
      if (product.id === productId) {
        return { ...product, quantity };
      }
      return product;
    });
    set({ products: updatedProducts });
  },

  clearCart: () => set({ products: [], total: 0 }),
}));
