import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  couponCode: string | null;
  couponDiscountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  totalQuantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wnk_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string | null>(() => {
    return localStorage.getItem('wnk_coupon') || null;
  });

  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(() => {
    return localStorage.getItem('wnk_coupon') ? 10 : 0;
  });

  useEffect(() => {
    try {
      localStorage.setItem('wnk_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    if (couponCode) {
      localStorage.setItem('wnk_coupon', couponCode);
    } else {
      localStorage.removeItem('wnk_coupon');
    }
  }, [couponCode]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const accKey = (newItem.accessories || []).map((a) => a.id).sort().join(',');
    const id = `${newItem.sku}-${newItem.colour}-${newItem.finish}-${newItem.coverage}-${newItem.wheelSize || 'none'}${accKey ? `-${accKey}` : ''}`;
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, { ...newItem, id }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
    setCouponDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WNK10' || clean === 'LAUNCH10') {
      setCouponCode(clean);
      setCouponDiscountPercent(10);
      return { success: true, message: 'Coupon applied! 10% discount granted.' };
    }
    if (clean === 'WNK20') {
      setCouponCode(clean);
      setCouponDiscountPercent(20);
      return { success: true, message: 'VIP Coupon applied! 20% discount granted.' };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setCouponDiscountPercent(0);
  };

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = 0; // Free nationwide shipping as per Figma
  const discount = Math.round((subtotal * couponDiscountPercent) / 100);
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        couponCode,
        couponDiscountPercent,
        applyCoupon,
        removeCoupon,
        subtotal,
        deliveryFee,
        discount,
        total,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

