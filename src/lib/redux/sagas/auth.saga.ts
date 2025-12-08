// src/store/auth/authSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { authActions } from "../slices/auth.slice";
import {
  getProfileApi,
  loginApi,
  registerApi,
  updateUserApi,
} from "@/lib/services/api.services";

import { AxiosResponse } from "axios";

// ---- LOGIN ----
function* loginSaga(action: any) {
  try {
    const res: AxiosResponse = yield call(loginApi, action.payload);
    yield put(authActions.loginSuccess(res.data));
  } catch (e: any) {
    yield put(
      authActions.authFailure(e.response?.data?.message || "Login failed")
    );
  }
}

// ---- REGISTER ----
function* registerSaga(action: any) {
  try {
    const res: AxiosResponse = yield call(registerApi, action.payload);
    yield put(authActions.registerSuccess(res.data));
  } catch (e: any) {
    yield put(
      authActions.authFailure(e.response?.data?.message || "Register failed")
    );
  }
}

// ---- GET PROFILE ----
function* getProfileSaga() {
  try {
    const res: AxiosResponse = yield call(getProfileApi);
    yield put(authActions.getProfileSuccess(res.data));
  } catch (e: any) {
    yield put(authActions.authFailure("Failed to load profile"));
  }
}

// ---- UPDATE USER ----
function* updateUserSaga(action: any) {
  try {
    const res: AxiosResponse = yield call(updateUserApi, action.payload);
    yield put(authActions.updateUserSuccess(res.data));
  } catch (e: any) {
    yield put(authActions.authFailure("Failed to update user"));
  }
}

export default function* authRootSaga() {
  yield takeLatest(authActions.loginRequest.type, loginSaga);
  yield takeLatest(authActions.registerRequest.type, registerSaga);
  yield takeLatest(authActions.getProfileRequest.type, getProfileSaga);
  yield takeLatest(authActions.updateUserRequest.type, updateUserSaga);
}
