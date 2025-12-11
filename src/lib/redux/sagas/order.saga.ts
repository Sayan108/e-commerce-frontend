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
    const res: AxiosResponse = yield call(createOrder, action.payload);
    yield put(placeOrderSuccess(res.data));
  } catch (err: any) {
    yield put(placeOrderFailure(err.message));
  }
}

export default function* orderRootSaga() {
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersWorker);

  yield takeLatest(placeOrderRequest.type, placeOrderWorker);
}
