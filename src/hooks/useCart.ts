import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux";

import {
  fetchCartRequest,
  addToCartRequest,
  updateCartRequest,
  deleteCartRequest,
  clearCartRequest,
  addToDraftCart,
  clearDraftCart,
} from "@/lib/redux/slices/cart.slice";

import { CartItem } from "@/lib/redux/types/cart.types";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error, draftCart } = useSelector(
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
    const draftCart: Omit<CartItem, "_id"> = {
      quantity,
      thumbnail: currentProduct?.imageurl,
      price: currentProduct?.price ?? 0,
      productId: currentProduct?._id ?? "",
      itemname: currentProduct?.name ?? "",
    };
    dispatch(addToDraftCart(draftCart));
  };

  const clearDraftCarts = () => {
    dispatch(clearDraftCart());
  };

  const currentProductCount = (productId: string) => {
    return items?.find((item) => item.productId === productId)?.quantity ?? 1;
  };

  return {
    items,
    draftCart,
    loading,
    error,
    fetchCart,
    addToCart,
    updateCart,
    deleteCart,
    clearCart,
    addToDraftCartAndCheckout,
    currentProductCount,
    clearDraftCarts,
  };
};
