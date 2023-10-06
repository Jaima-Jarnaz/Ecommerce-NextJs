import React, { useState, createContext, useEffect } from "react";

// Define the props for the CartProvider component
export interface CartProviderProps {
  children: React.ReactNode;
}

// Define the structure of a cart item
export interface CartItem {
  productId: any;
  quantity: number;
}

// Define the structure of the CartContext
export interface CartContextType {
  cartItems: CartItem[]; // Array to store cart items
  addToCart: (product: any) => void; // Function to add a product to the cart
  itemsCount: number; // Total count of items in the cart
  setItemsCount: React.Dispatch<React.SetStateAction<number>>; // Function to update the items count
}

// Create the CartContext with an initial undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the CartProvider component
const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Define the state variables
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Cart items
  const [itemsCount, setItemsCount] = useState<number>(0); // Total count of items

  // Define a key for local storage
  const LOCAL_STORAGE_KEY = "cartItems";

  const TOTAL_CART_ITEMS = "total_card_items";

  // Load cart items from local storage when the provider initializes
  useEffect(() => {
    // Retrieve cart items from local storage or initialize as an empty array
    const storedCartItems = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );

    const totalCartItems = JSON.parse(
      localStorage.getItem(TOTAL_CART_ITEMS) || "0"
    );

    if (totalCartItems > 0) {
      setItemsCount(totalCartItems);
    }

    // Check if there are stored cart items
    if (storedCartItems.length > 0) {
      setCartItems(storedCartItems);
    }
  }, []);

  // Save cart items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    localStorage.setItem(TOTAL_CART_ITEMS, JSON.stringify(itemsCount));
  }, [cartItems, itemsCount]);

  // Function to add a product to the cart
  const addToCart = (productToAdd: any) => {
    setItemsCount(itemsCount + 1);
    const existingCartItem = cartItems.find(
      (item) => item.productId === productToAdd._id
    );

    if (existingCartItem) {
      // If the product is already in the cart, update its quantity
      updateCartItemQuantity(
        existingCartItem.productId,
        existingCartItem.quantity + 1
      );
    } else {
      // If the product is not in the cart, add it as a new item
      setCartItems([...cartItems, { productId: productToAdd, quantity: 1 }]);
    }
  };

  // Function to update the quantity of a cart item
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity < 0) {
      quantity = 0;
    }

    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        console.log("productId", productId, "quantity", quantity);

        return item.productId === productId ? { ...item, quantity } : item;
      })
    );
  };

  // Create the context value
  const value = {
    cartItems,
    setCartItems,
    addToCart,
    itemsCount,
    setItemsCount,
    updateCartItemQuantity,
  };

  // Provide the CartContext value to the children components
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Export the CartProvider and CartContext
export { CartProvider, CartContext };
