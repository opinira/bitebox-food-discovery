import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, CartItem, CartTotals } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (food: FoodItem, quantity?: number, selectedOptions?: Record<string, string>) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  removeFromCart: (foodId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  totals: CartTotals;
}

const CART_STORAGE_KEY = 'bitebox_cart_v1';
const FREE_DELIVERY_THRESHOLD = 40.0;
const STANDARD_DELIVERY_FEE = 3.99;
const TAX_RATE = 0.08875; // 8.875% standard NYC sales tax

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (food: FoodItem, quantity = 1, selectedOptions?: Record<string, string>) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.food.id === food.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { food, quantity, selectedOptions, addedAt: Date.now() }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.food.id === foodId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (foodId: string) => {
    setCart((prev) => prev.filter((item) => item.food.id !== foodId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + deliveryFee + tax;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const totals: CartTotals = {
    itemCount,
    subtotal,
    deliveryFee,
    tax,
    grandTotal,
    isFreeDelivery,
    amountNeededForFreeDelivery,
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        totals,
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
