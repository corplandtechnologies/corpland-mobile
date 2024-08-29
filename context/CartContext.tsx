import React, { createContext, useContext, useState } from "react";

const CartContext= createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const addProductToCart = (product) => {
    setCartItem(product);
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addProductToCart,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
