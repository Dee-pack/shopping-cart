import { createContext, useReducer, useMemo, useCallback } from 'react';
import {
  cartReducer,
  initialState,
  ADD_ITEM,
  SET_QUANTITY,
  REMOVE_ITEM,
} from './cartReducer';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback(
    (product, quantity) =>
      dispatch({ type: ADD_ITEM, payload: { product, quantity } }),
    []
  );

  const setQuantity = useCallback(
    (id, quantity) =>
      dispatch({ type: SET_QUANTITY, payload: { id, quantity } }),
    []
  );

  const removeItem = useCallback(
    (id) => dispatch({ type: REMOVE_ITEM, payload: { id } }),
    []
  );

  const value = useMemo(() => {
    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return { items, totalQuantity, totalPrice, addItem, setQuantity, removeItem };
  }, [items, addItem, setQuantity, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}