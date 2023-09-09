import React, { useState, createContext } from "react";

export interface CartProviderProps {
  children: React.ReactNode;
}

export interface CartContextType {
  cartItems: any[];
  addToCart: (product: any) => void;
  itemsCount: number;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined); // Provide a default value or type

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any>([]);
  const [itemsCount, setItemsCount] = useState(0);

  const addToCart = (items: any) => {
    setCartItems([...cartItems, items]);
  };
  console.log("cartItems", cartItems);

  const value = {
    cartItems,
    addToCart,
    itemsCount,
    setItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider, CartContext };
