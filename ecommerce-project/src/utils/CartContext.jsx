import React, { useEffect, useState } from "react";
import useUpdateEffect from "../Hooks/useUpdateEffect";

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (product) => {
    const newCart = [...new Set([...cart, product])];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const removeFromCart = (product) => {
    const newFavorites = cart.filter((fav) => fav !== product);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  useEffect(() => {
    const newCart = [...new Set(cart)];
    localStorage.setItem("cart", JSON.stringify(newCart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
