import { createContext, useContext, useState } from "react";

const CartUIContext = createContext<any>(null);

export function CartUIProvider({ children }: any) {
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <CartUIContext.Provider value={{ cartOpen, openCart, closeCart }}>
      {children}
    </CartUIContext.Provider>
  );
}

export const useCartUI = () => useContext(CartUIContext);