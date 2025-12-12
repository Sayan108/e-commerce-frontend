// src/store/auth/types.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  cartItemCount: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
  successCallBack: () => void;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;

  successCallBack: () => void;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
}
