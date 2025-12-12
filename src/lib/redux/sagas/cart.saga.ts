import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  updateCartRequest,
  updateCartSuccess,
  updateCartFailure,
  deleteCartRequest,
  deleteCartSuccess,
  deleteCartFailure,
  clearCartRequest,
  clearCartSuccess,
  clearCartFailure,
} from "../slices/cart.slice";

import {
  addToCart,
  clearCart,
  deleteCart,
  fetchCart,
  updateCart,
} from "@/lib/services/api.services";
import { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/cart.types";
import { store } from "..";
import { authActions } from "../slices/auth.slice";
import { ISnackBarType, showSnackbar } from "../slices/snackbar.slice";

/* ========================
   FETCH CART
========================= */
function* fetchCartWorker() {
  try {
    const res: AxiosResponse = yield call(fetchCart);

    yield put(fetchCartSuccess(res.data.cart));
  } catch (err: any) {
    yield put(fetchCartFailure(err.message));
  }
}

/* ========================
   ADD TO CART
========================= */
function* addToCartWorker(action: PayloadAction<number>) {
  try {
    const currentProduct = store.getState().products.currentProduct;
    const isAuthenticated = store.getState().auth.isAuthenticated;
    const cartItem = store.getState().cart.items;
    if (!isAuthenticated) {
      return;
    }
    const payload: Omit<CartItem, "_id"> = {
      itemname: currentProduct?.name ?? "",
      productId: currentProduct?._id ?? "",
      quantity: action.payload,
      price: currentProduct?.price ?? 0,

      thumbnail: currentProduct?.imageurl,
    };
    const res: AxiosResponse = yield call(addToCart, payload);

    yield put(addToCartSuccess(res.data.cartItem));
    yield put(
      showSnackbar({
        message: "Item added to cart successfully",
        type: ISnackBarType.success,
      })
    );
    const existingIndex = cartItem.findIndex(
      (item) => item.productId === currentProduct?._id
    );
    if (existingIndex !== -1) yield put(authActions.updateCartCount(1));
  } catch (err: any) {
    yield put(addToCartFailure(err.message));
    yield put(
      showSnackbar({
        message: err.message || "Add to cart failed ",
        type: ISnackBarType.error,
      })
    );
  }
}

/* ========================
   UPDATE CART
========================= */
function* updateCartWorker(action: PayloadAction<Partial<CartItem>>) {
  try {
    const { _id, ...data } = action.payload;
    const res: AxiosResponse = yield call(updateCart, _id ?? "", data);
    yield put(updateCartSuccess(res.data.updated));
    yield put(
      showSnackbar({
        message: "Cart updated successfully",
        type: ISnackBarType.success,
      })
    );
  } catch (err: any) {
    yield put(updateCartFailure(err.message));
    yield put(
      showSnackbar({
        message: "Cart update failed ",
        type: ISnackBarType.error,
      })
    );
  }
}

/* ========================
   DELETE ITEM
========================= */
function* deleteCartWorker(action: PayloadAction<string>) {
  try {
    yield call(deleteCart, action.payload);
    yield put(deleteCartSuccess(action.payload));
    yield put(authActions.updateCartCount(-1));
    yield put(
      showSnackbar({
        message: "Cart deleted successfully",
        type: ISnackBarType.error,
      })
    );
  } catch (err: any) {
    yield put(deleteCartFailure(err.message));
    yield put(
      showSnackbar({
        message: "Cart delete failed",
        type: ISnackBarType.error,
      })
    );
  }
}

/* ========================
   CLEAR CART
========================= */
function* clearCartWorker() {
  try {
    yield call(clearCart);
    yield put(clearCartSuccess());
    yield put(
      showSnackbar({
        message: "Cart cleared successfully",
        type: ISnackBarType.success,
      })
    );
  } catch (err: any) {
    yield put(clearCartFailure(err.message));
    yield put(
      showSnackbar({
        message: "Cart clear failed",
        type: ISnackBarType.error,
      })
    );
  }
}

/* ========================
   ROOT SAGA
========================= */
export default function* cartRootSaga() {
  yield takeLatest(fetchCartRequest.type, fetchCartWorker);
  yield takeLatest(addToCartRequest.type, addToCartWorker);
  yield takeLatest(updateCartRequest.type, updateCartWorker);
  yield takeLatest(deleteCartRequest.type, deleteCartWorker);
  yield takeLatest(clearCartRequest.type, clearCartWorker);
}
