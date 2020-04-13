import React, { useState } from 'react';

export const CartContext = React.createContext()

export const CartProvider = ({children}) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [clickStatus, setClickStatus] = useState(false);
  return (
    <CartContext.Provider value={{ cartVisible, setCartVisible, clickStatus, setClickStatus }}>
      {children}
    </CartContext.Provider>
  );
};