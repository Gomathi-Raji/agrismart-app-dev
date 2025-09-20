import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/types/marketplace';
import { getCart } from '@/lib/marketplace';

interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  itemCount: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  itemCount: 0,
  totalAmount: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Initialize cart from localStorage
    const savedCart = getCart();
    setCart(savedCart);
  }, []);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, setCart, itemCount, totalAmount }}>
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