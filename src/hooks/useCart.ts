import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux";

import {
  fetchCartRequest,
  addToCartRequest,
  updateCartRequest,
  deleteCartRequest,
  clearCartRequest,
  addToDraftCart,
} from "@/lib/redux/slices/cart.slice";

import { CartItem } from "@/lib/redux/types/cart.types";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  const { currentProduct } = useSelector((state: RootState) => state.products);

  const fetchCart = () => dispatch(fetchCartRequest());
  const addToCart = (quantity: number) => dispatch(addToCartRequest(quantity));
  const updateCart = (item: Partial<CartItem>) =>
    dispatch(updateCartRequest(item));
  const deleteCart = (id: string) => dispatch(deleteCartRequest(id));
  const clearCart = () => dispatch(clearCartRequest());

  const addToDraftCartAndCheckout = (quantity: number) => {
    const draftCart: CartItem = {
      quantity,
      thumbnail: currentProduct?.imageurl,
      price: currentProduct?.price ?? 0,
      productId: currentProduct?._id ?? "",
    };
    dispatch(addToDraftCart(draftCart));
  };

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
