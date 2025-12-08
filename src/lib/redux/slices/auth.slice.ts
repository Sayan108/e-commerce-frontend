// src/store/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginPayload,
  RegisterPayload,
  UpdateUserPayload,
  User,
} from "../types/auth.types";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ---- AUTH REQUESTS ----
    loginRequest(state: AuthState, _: PayloadAction<LoginPayload>) {
      state.loading = true;
    },
    registerRequest(state: AuthState, _: PayloadAction<RegisterPayload>) {
      state.loading = true;
    },
    getProfileRequest(state: AuthState) {
      state.loading = true;
    },
    updateUserRequest(state: AuthState, _: PayloadAction<UpdateUserPayload>) {
      state.loading = true;
    },

    // ---- SUCCESS ----
    loginSuccess(
      state: AuthState,
      action: PayloadAction<{ token: string; user: User }>
    ) {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    registerSuccess(
      state: AuthState,
      action: PayloadAction<{ token: string; user: User }>
    ) {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    getProfileSuccess(state: AuthState, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
    },
    updateUserSuccess(state: AuthState, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
    },

    // ---- FAILURES ----
    authFailure(state: AuthState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state: AuthState) {
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
