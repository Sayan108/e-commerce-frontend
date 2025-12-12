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
  isAuthenticated: false,
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
      state.isAuthenticated = true;
    },
    registerSuccess(
      state: AuthState,
      action: PayloadAction<{ token: string; user: User }>
    ) {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
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
      state.isAuthenticated = false;
      state.loading = false;
    },

    updateCartCount(state: AuthState, action: PayloadAction<number>) {
      if (!state.user) return;

      const current = state.user.cartItemCount ?? 0;
      const updated = current + action.payload;

      state.user.cartItemCount = updated < 0 ? 0 : updated;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
