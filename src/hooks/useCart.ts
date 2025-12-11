import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux";

import {
  fetchCartRequest,
  addToCartRequest,
  updateCartRequest,
  deleteCartRequest,
  clearCartRequest,
} from "@/lib/redux/slices/cart.slice";

import { CartItem } from "@/lib/redux/types/cart.types";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  const fetchCart = () => dispatch(fetchCartRequest());
  const addToCart = (quantity: number) => dispatch(addToCartRequest(quantity));
  const updateCart = (item: Partial<CartItem>) =>
    dispatch(updateCartRequest(item));
  const deleteCart = (id: string) => dispatch(deleteCartRequest(id));
  const clearCart = () => dispatch(clearCartRequest());

  return {
    items,
    loading,
    error,
    fetchCart,
    addToCart,
    updateCart,
    deleteCart,
    clearCart,
  };
};
