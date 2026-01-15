"use client";

import React, { createContext, useContext, useReducer, useState } from "react";

type ShoppingCartState = {
  items: CartItem[];
}

type ShoppingCartAction =
  | { type: "add"; item: CartItem }
  | { type: "remove"; productId: string; size?: ProductSize }
  | { type: "updateQuantity"; productId: string; size?: ProductSize; quantity: number }
  | { type: "clear" }

type ShoppingCartContextType = {
  state: ShoppingCartState;
  dispatch: React.Dispatch<ShoppingCartAction>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

function cartReducer(state: ShoppingCartState, action: ShoppingCartAction): ShoppingCartState {
  switch (action.type) {
    case "add": {
      const existingIndex = state.items.findIndex(i => i.product.id === action.item.product.id && i.size === action.item.size);
      if (existingIndex > -1) {
        const items = [...state.items];
        items[existingIndex] = { ...items[existingIndex], quantity: items[existingIndex].quantity + action.item.quantity }
        return { ...state, items }
      }
      return { ...state, items: [...state.items, action.item] }
    }
    case "remove": {
      return { ...state, items: state.items.filter(i => !(i.product.id === action.productId && i.size === action.size)) }
    }
    case "updateQuantity": {
      const items = state.items.map(i => {
        if (i.product.id === action.productId && i.size === action.size) {
          return { ...i, quantity: action.quantity }
        }
        return i;
      }).filter(i => i.quantity > 0);
      return { ...state, items }
    }
    case "clear":
      return { ...state, items: [] }
    default:
      return state;
  }
}

export function ShoppingCartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(v => !v);

  return (
    <ShoppingCartContext.Provider value={{ state, dispatch, isOpen, open, close, toggle }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  const ctx = useContext(ShoppingCartContext);
  if (!ctx) throw new Error("useShoppingCart must be used within ShoppingCartProvider");
  return {
    state: ctx.state,
    dispatch: ctx.dispatch,
    isOpen: ctx.isOpen,
    open: ctx.open,
    close: ctx.close,
    toggle: ctx.toggle,
  }
}

export default ShoppingCartProvider;
