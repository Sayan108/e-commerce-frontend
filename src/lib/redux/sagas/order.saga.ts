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
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchOrdersWorker(): any {
  try {
    const res = yield call(getOrders);
    yield put(fetchOrdersSuccess(res.data));
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

    const res: AxiosResponse = yield call(createOrder, {
      shippingAddressId,
      billingAddressId,
    });
    yield put(placeOrderSuccess(res.data));
    yield put(authActions.updateCartCount(-1));
  } catch (err: any) {
    yield put(placeOrderFailure(err.message));
  }
}

export default function* orderRootSaga() {
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersWorker);

  yield takeLatest(placeOrderRequest.type, placeOrderWorker);
}
