import React, { useState, createContext, useEffect } from "react";

export interface CartProviderProps {
  children: React.ReactNode;
}

export interface CartItem {
  productId: any;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  itemsCount: number;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined); // Provide a default value or type

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>();
  const [itemsCount, setItemsCount] = useState(0);

  const LOCAL_STORAGE_KEY = "cartItems"; // Define a key for local storage

  // Load cart items from local storage when the provider initializes
  useEffect(() => {
    const storedCartItems = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedCartItems !== null && storedCartItems !== undefined) {
      const data = JSON.parse(storedCartItems);
      console.log("storedCartItems", data);

      setCartItems([{ ...cartItems, data }]);
    } else {
      setCartItems([]);
    }
  }, []);

  // Save cart items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productToAdd: any) => {
    const existingCartItem = cartItems.find(
      (item) => item.productId === productToAdd._id
    );

    if (existingCartItem) {
      updateCartItemQuantity(
        existingCartItem.productId,
        existingCartItem.quantity + 1
      );
    } else {
      setCartItems([...cartItems, { productId: productToAdd, quantity: 1 }]);
    }
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity < 0) {
      quantity = 0;
    }

    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  // const addToCart = (productToAdd: any) => {
  //   // Check if the product is already in the cart
  //   const existingCartItem = cartItems.find(
  //     (item) => item.productId === productToAdd._id
  //   );
  //   // If the product is already in the cart, update its quantity
  //   if (existingCartItem) {
  //     updateCartItemQuantity(
  //       existingCartItem.productId,
  //       existingCartItem.quantity + 1
  //     );
  //   } else {
  //     console.log("addto card", cartItems);

  //     // If the product is not in the cart, add it as a new item
  //     setCartItems([...cartItems, { productId: productToAdd, quantity: 1 }]);
  //     console.log("addto card2", cartItems);
  //   }
  // };

  // const updateCartItemQuantity = (productID: string, quantity: number) => {
  //   // Ensure the quantity is not negative
  //   if (quantity < 0) {
  //     quantity = 0;
  //   }

  //   // Update the cartItems state with the new quantity for the product
  //   setCartItems((prevCartItems: any) =>
  //     prevCartItems.map((item: any) => {
  //       item === productID ? { ...item, quantity } : item;
  //     })
  //   );

  //   console.log(
  //     "Update the cartItems state with the new quantity for the product",
  //     cartItems
  //   );
  // };

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
