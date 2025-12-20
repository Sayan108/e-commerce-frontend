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
import { ISnackBarType, showSnackbar } from "../slices/snackbar.slice";
import { navigate } from "@/hooks/useNavigation";

// ---- LOGIN ----
function* loginSaga(action: ReturnType<typeof authActions.loginRequest>) {
  try {
    const res: AxiosResponse = yield call(loginApi, action.payload);
    console.log(res.data);
    yield put(authActions.loginSuccess(res.data));
    yield put(
      showSnackbar({
        message: "Logged in successfully",
        type: ISnackBarType.success,
      })
    );
    navigate("/");
  } catch (e: any) {
    console.log(e);
    yield put(
      showSnackbar({
        message: e.response?.data?.error || "Login failed",
        type: ISnackBarType.success,
      })
    );
    yield put(
      authActions.authFailure(e.response?.data?.message || "Login failed")
    );
  }
}

// ---- REGISTER ----
function* registerSaga(action: ReturnType<typeof authActions.registerRequest>) {
  try {
    const res: AxiosResponse = yield call(registerApi, action.payload);
    console.log(res.data);
    yield put(authActions.registerSuccess(res.data));

    navigate("/");
    yield put(
      showSnackbar({
        message: "User account created and logged in successfully",
        type: ISnackBarType.success,
      })
    );
  } catch (e: any) {
    yield put(
      showSnackbar({
        message: e.response?.data?.message || "Register failed",
        type: ISnackBarType.success,
      })
    );
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
function* updateUserSaga(
  action: ReturnType<typeof authActions.updateUserRequest>
) {
  try {
    const res: AxiosResponse = yield call(updateUserApi, action.payload);
    yield put(authActions.updateUserSuccess(res.data.updateSelf));
    yield put(
      showSnackbar({
        message: "User account updated successfully",
        type: ISnackBarType.success,
      })
    );
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
