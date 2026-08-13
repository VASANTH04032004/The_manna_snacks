"use client";

import { create } from "zustand";
import { Product, CartItem } from "@/types/product";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;

  // Actions
  addItem: (product: Product, quantity?: number, orderMode?: 'pack' | 'kg', kgAmount?: number) => void;
  removeItem: (productId: string, orderMode?: 'pack' | 'kg') => void;
  updateQuantity: (productId: string, quantity: number, orderMode?: 'pack' | 'kg') => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  isQuickViewOpen: false,
  quickViewProduct: null,

  addItem: (product, quantity = 1, orderMode = 'pack', kgAmount) => {
    set((state) => {
      // Find matching item by ID and orderMode
      const existing = state.items.find(
        (item) => item.product.id === product.id && (item.orderMode || 'pack') === orderMode
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id && (item.orderMode || 'pack') === orderMode
              ? { 
                  ...item, 
                  quantity: item.quantity + quantity,
                  kgAmount: item.kgAmount && kgAmount ? item.kgAmount + kgAmount : undefined
                }
              : item
          ),
        };
      }
      return { items: [...state.items, { product, quantity, orderMode, kgAmount }] };
    });
  },

  removeItem: (productId, orderMode = 'pack') => {
    set((state) => ({
      items: state.items.filter((item) => !(item.product.id === productId && (item.orderMode || 'pack') === orderMode)),
    }));
  },

  updateQuantity: (productId, quantity, orderMode = 'pack') => {
    if (quantity <= 0) {
      get().removeItem(productId, orderMode);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId && (item.orderMode || 'pack') === orderMode ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openQuickView: (product) =>
    set({ isQuickViewOpen: true, quickViewProduct: product }),
  closeQuickView: () =>
    set({ isQuickViewOpen: false, quickViewProduct: null }),

  totalItems: () => get().items.length,
  totalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + item.product.price.retail * item.quantity,
      0
    ),
}));

/* ============================================================
   UI Store
   ============================================================ */

interface UIState {
  isPreloaderDone: boolean;
  isMenuOpen: boolean;
  activeSection: string;
  setPreloaderDone: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  setActiveSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isPreloaderDone: false,
  isMenuOpen: false,
  activeSection: "home",
  setPreloaderDone: () => set({ isPreloaderDone: true }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  setActiveSection: (section) => set({ activeSection: section }),
}));
