// src/hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";

import { useCallback } from "react";
import {
  LoginPayload,
  RegisterPayload,
  UpdateUserPayload,
} from "@/lib/redux/types/auth.types";
import { RootState } from "@/lib/redux";
import { authActions } from "@/lib/redux/slices/auth.slice";

interface UseAuthReturn {
  login: (data: LoginPayload) => void;
  register: (data: RegisterPayload) => void;
  getProfile: () => void;
  updateUser: (data: UpdateUserPayload) => void;
  logOut: () => void;
  user: any; // Adjust this type based on the structure of your user object
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Custom hook for authentication actions
const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch();

  // Accessing relevant state from Redux store
  const { user, loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Login handler
  const login = useCallback(
    (data: LoginPayload) => {
      dispatch(authActions.loginRequest(data));
    },
    [dispatch]
  );

  // Register handler
  const register = useCallback(
    (data: RegisterPayload) => {
      dispatch(authActions.registerRequest(data));
    },
    [dispatch]
  );

  // Get profile handler
  const getProfile = useCallback(() => {
    dispatch(authActions.getProfileRequest());
  }, [dispatch]);

  // Update user handler
  const updateUser = useCallback(
    (data: UpdateUserPayload) => {
      dispatch(authActions.updateUserRequest(data));
    },
    [dispatch]
  );

  const logOut = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  return {
    login,
    register,
    getProfile,
    updateUser,
    logOut,
    isAuthenticated,
    user,
    loading,
    error,
  };
};

export default useAuth;
