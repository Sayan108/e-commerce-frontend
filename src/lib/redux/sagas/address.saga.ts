import { call, put, takeLatest } from "redux-saga/effects";
import {
  saveAddressRequest,
  saveAddressSuccess,
  saveAddressFailure,
  fetchAddressRequest,
  fetchAddressSuccess,
  fetchAddressFailure,
  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFailure,
  deleteAddressRequest,
  deleteAddressSuccess,
  deleteAddressFailure,
} from "../slices/address.slice";

import { PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../types/address.types";
import {
  createAddress,
  deleteAddressApi,
  getAddress,
  updateAddressApi,
  updateUserApi,
} from "@/lib/services/api.services";
import { AxiosResponse } from "axios";
import { store } from "..";

/* ==============================
   ✅ WORKERS
================================= */

// ✅ SAVE
function* saveAddressWorker(action: PayloadAction<Omit<Address, "id">>) {
  try {
    const userId = store.getState().auth.user?._id;
    const response: AxiosResponse = yield call(
      createAddress,
      action.payload,
      userId ?? ""
    );
    yield put(saveAddressSuccess(response.data.address));
  } catch (error: any) {
    yield put(saveAddressFailure(error.message));
  }
}

// ✅ FETCH
function* fetchAddressWorker() {
  try {
    const response: AxiosResponse = yield call(getAddress);
    yield put(fetchAddressSuccess(response.data.list));
  } catch (error: any) {
    yield put(fetchAddressFailure(error.message));
  }
}

// ✅ UPDATE
function* updateAddressWorker(action: PayloadAction<Partial<Address>>) {
  try {
    const response: AxiosResponse = yield call(updateAddressApi, {
      changes: action.payload,
      id: action.payload._id ?? "",
    });
    yield put(updateAddressSuccess(response.data.updated));
  } catch (error: any) {
    yield put(updateAddressFailure(error.message));
  }
}

// ✅ DELETE
function* deleteAddressWorker(action: PayloadAction<string>) {
  try {
    yield call(deleteAddressApi, action.payload);
    yield put(deleteAddressSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteAddressFailure(error.message));
  }
}

/* ==============================
   ✅ ROOT SAGA
================================= */

export default function* addressRootSaga() {
  yield takeLatest(saveAddressRequest.type, saveAddressWorker);
  yield takeLatest(fetchAddressRequest.type, fetchAddressWorker);
  yield takeLatest(updateAddressRequest.type, updateAddressWorker);
  yield takeLatest(deleteAddressRequest.type, deleteAddressWorker);
}
