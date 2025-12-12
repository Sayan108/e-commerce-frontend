// src/lib/redux/sagas/order.saga.ts
import { call, put, takeLatest } from "redux-saga/effects";

import {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
} from "../slices/order.slice";
import { createOrder, getOrders } from "@/lib/services/api.services";
import { AxiosResponse } from "axios";
import { authActions } from "../slices/auth.slice";
import { store } from "..";
import { navigate } from "@/hooks/useNavigation";
import { ISnackBarType, showSnackbar } from "../slices/snackbar.slice";
import { clearDraftCart } from "../slices/cart.slice";

function* fetchOrdersWorker(): any {
  try {
    const userId = store.getState().auth.user._id;
    const res = yield call(getOrders, userId);
    console.log(res);
    yield put(fetchOrdersSuccess(res.data.orders.data));
  } catch (err: any) {
    yield put(fetchOrdersFailure(err.message));
  }
}

function* placeOrderWorker(action: any): any {
  try {
    const shippingAddressId =
      store.getState().address.currentShippingAddress?._id;
    const billingAddressId =
      store.getState().address.currentbillingAddress?._id;

    const draftCart = store.getState().cart.draftCart;

    const res: AxiosResponse = yield call(createOrder, {
      shippingAddressId,
      billingAddressId,
      ...(draftCart.length > 0 ? { items: draftCart } : {}),
    });
    yield put(placeOrderSuccess(res.data.order));
    navigate("/profile/orders");
    yield put(
      showSnackbar({
        message: "Order placed successfully",
        type: ISnackBarType.success,
      })
    );
    if (draftCart.length === 0) yield put(authActions.updateCartCount(-1));
    else yield put(clearDraftCart());
  } catch (err: any) {
    yield put(placeOrderFailure(err.message));
    yield put(
      showSnackbar({
        message: "Order place failed",
        type: ISnackBarType.error,
      })
    );
  }
}

export default function* orderRootSaga() {
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersWorker);

  yield takeLatest(placeOrderRequest.type, placeOrderWorker);
}
