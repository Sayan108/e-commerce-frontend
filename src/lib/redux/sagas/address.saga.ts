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
} from "@/lib/services/api.services";
import { AxiosResponse } from "axios";
import { store } from "..";
import { ISnackBarType, showSnackbar } from "../slices/snackbar.slice";

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
    yield put(
      showSnackbar({
        message: "Address added successfully",
        type: ISnackBarType.success,
      })
    );
  } catch (error: any) {
    yield put(saveAddressFailure(error.message));
    yield put(
      showSnackbar({
        message: "Address add failed",
        type: ISnackBarType.error,
      })
    );
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
    yield put(
      showSnackbar({
        message: "Address updated successfully",
        type: ISnackBarType.success,
      })
    );
  } catch (error: any) {
    yield put(updateAddressFailure(error.message));
    yield put(
      showSnackbar({
        message: "Address update failed",
        type: ISnackBarType.error,
      })
    );
  }
}

// ✅ DELETE
function* deleteAddressWorker(action: PayloadAction<string>) {
  try {
    yield call(deleteAddressApi, action.payload);
    yield put(deleteAddressSuccess(action.payload));
    yield put(
      showSnackbar({
        message: "Address deleted successfully",
        type: ISnackBarType.success,
      })
    );
  } catch (error: any) {
    yield put(deleteAddressFailure(error.message));
    yield put(
      showSnackbar({
        message: "Address delete failed",
        type: ISnackBarType.error,
      })
    );
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
