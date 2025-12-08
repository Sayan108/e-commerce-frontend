// src/store/auth/authApi.ts
import {
  LoginPayload,
  RegisterPayload,
  UpdateUserPayload,
} from "../redux/types/auth.types";
import { ProductFilter } from "../redux/types/product.types";
import client from "./api.client";
import { ApiEndpoints } from "./api.endpoints";

// Initialize API client with interceptors and base URL

// API Calls
export const loginApi = (data: LoginPayload) =>
  client.post(ApiEndpoints.LOGIN, data);

export const registerApi = (data: RegisterPayload) =>
  client.post(ApiEndpoints.REGISTER, data);

export const getProfileApi = () => client.get(ApiEndpoints.GET_PROFILE);

export const updateUserApi = (data: UpdateUserPayload) =>
  client.put(ApiEndpoints.UPDATE_USER, data);

export const getBanner = () => client.get(ApiEndpoints.DASHBOARD_BANNER);

export const getVideos = () => client.get(ApiEndpoints.DASHBOARD_VIDEO);

export const getCategories = () => client.get(ApiEndpoints.GET_CATEGORIES);

export const getProducts = (params: ProductFilter) =>
  client.get(ApiEndpoints.GET_PRODUCTS, { params });
