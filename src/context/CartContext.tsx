'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { CartItem, Product } from '@/types';
import { PROMO_CODES } from '@/data/products';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedSize?: 'Classic' | 'Grand' | 'Majestic',
    includeVase?: boolean,
    vasePrice?: number,
    giftCardMessage?: string,
    deliveryDate?: string,
    deliverySlot?: string
  ) => void;
  removeFromCart: (productId: string, selectedSize: string, includeVase: boolean) => void;
  updateQuantity: (productId: string, selectedSize: string, includeVase: boolean, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Promo code
  promoCode: string;
  appliedPromo: { code: string; discountPercent: number; description: string } | null;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  // Financial totals derived synchronously
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  totalAmount: number;
  totalItemCount: number;
  freeShippingThreshold: number;
  progressToFreeShipping: number;

  // Quick view modal state
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Toast feedback
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 200;
const STANDARD_SHIPPING_FEE = 25;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; description: string } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jv_cart_v1');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore JSON parse error in sandbox
    }
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('jv_cart_v1', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize: 'Classic' | 'Grand' | 'Majestic' = 'Classic',
    includeVase = false,
    vasePrice = 0,
    giftCardMessage?: string,
    deliveryDate?: string,
    deliverySlot?: string
  ) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.includeVase === includeVase
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          giftCardMessage: giftCardMessage || next[existingIndex].giftCardMessage,
          deliveryDate: deliveryDate || next[existingIndex].deliveryDate,
          deliverySlot: deliverySlot || next[existingIndex].deliverySlot
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedSize,
          includeVase,
          vasePrice,
          giftCardMessage,
          deliveryDate,
          deliverySlot
        }
      ];
    });

    setIsCartOpen(true);
    showToast(`Added "${product.name}" to your cart`);
  };

  const removeFromCart = (productId: string, selectedSize: string, includeVase: boolean) => {
    setItems(prev =>
      prev.filter(
        item =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.includeVase === includeVase
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    selectedSize: string,
    includeVase: boolean,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, includeVase);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        if (
          item.product.id === productId &&
          item.selectedSize === selectedSize &&
          item.includeVase === includeVase
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
    setPromoCode('');
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    setPromoError(null);
    if (!cleanCode) return false;

    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo({
        code: cleanCode,
        discountPercent: PROMO_CODES[cleanCode].discountPercent,
        description: PROMO_CODES[cleanCode].description
      });
      setPromoCode('');
      showToast(`Privilege code "${cleanCode}" applied: ${PROMO_CODES[cleanCode].description}`);
      return true;
    } else {
      setPromoError('Invalid floral privilege code. Try JARDIN10 or SPRING20');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  // Synchronous calculations (Derived State during render per vercel-react-best-practices)
  const { subtotal, totalItemCount } = useMemo(() => {
    let sub = 0;
    let count = 0;

    for (const item of items) {
      let basePrice = item.product.price;
      if (item.selectedSize === 'Grand') basePrice = Math.round(basePrice * 1.3);
      if (item.selectedSize === 'Majestic') basePrice = Math.round(basePrice * 1.7);
      
      const itemUnitPrice = basePrice + (item.includeVase ? item.vasePrice : 0);
      sub += itemUnitPrice * item.quantity;
      count += item.quantity;
    }

    return { subtotal: sub, totalItemCount: count };
  }, [items]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    return Math.round((subtotal * appliedPromo.discountPercent) / 100);
  }, [subtotal, appliedPromo]);

  const shippingCost = useMemo(() => {
    if (subtotal === 0) return 0;
    if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    return STANDARD_SHIPPING_FEE;
  }, [subtotal]);

  const totalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingCost);
  }, [subtotal, discountAmount, shippingCost]);

  const progressToFreeShipping = useMemo(() => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) return 100;
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  }, [subtotal]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        appliedPromo,
        promoError,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discountAmount,
        shippingCost,
        totalAmount,
        totalItemCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        progressToFreeShipping,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
