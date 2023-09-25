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

  const updateCartItemQuantity = (productID: string, quantity: number) => {
    // Ensure the quantity is not negative
    if (quantity < 0) {
      quantity = 0;
    }

    // Update the cartItems state with the new quantity for the product
    setCartItems((cartItems: any) => ({
      ...cartItems,
      [productID]: quantity,
    }));

    console.log(
      "Update the cartItems state with the new quantity for the product",
      cartItems
    );
  };

  const value = {
    cartItems,
    addToCart,
    itemsCount,
    setItemsCount,
    updateCartItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider, CartContext };
