// src/store/auth/types.ts

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
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
