// src/store/auth/authApi.ts
import { Order } from "../redux/slices/order.slice";
import { Address } from "../redux/types/address.types";
import {
  LoginPayload,
  RegisterPayload,
  UpdateUserPayload,
} from "../redux/types/auth.types";
import { CartItem } from "../redux/types/cart.types";
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

export const getFAQs = () => client.get(ApiEndpoints.DASHBOARD_FAQ);

export const getContactUsInfo = () => client.get(ApiEndpoints.CONTACT_US_INFO);

export const getCategories = () => client.get(ApiEndpoints.CATEGORIES);

export const getFeaturedCategories = () =>
  client.get(ApiEndpoints.FEAURED_CATEGORIES);

export const getProducts = (params: ProductFilter) =>
  client.get(ApiEndpoints.PRODUCTS, { params });

export const getProductById = (productId: string) =>
  client.get(`${ApiEndpoints.PRODUCTS}/${productId}`);

export const getNewArrivals = () => client.get(ApiEndpoints.NEWARRIVAL_PRODUCS);

export const getAddress = () => client.get<Address>(ApiEndpoints.ADDRESS);

export const createAddress = (payload: Omit<Address, "_id">, userId: string) =>
  client.post<Address>(ApiEndpoints.ADDRESS, { ...payload, userId });

export const updateAddressApi = (payload: {
  id: string;
  changes: Partial<Address>;
}) =>
  client.put<Address>(`${ApiEndpoints.ADDRESS}/${payload.id}`, payload.changes);

export const deleteAddressApi = (id: string) =>
  client.delete(`${ApiEndpoints.ADDRESS}/${id}`);

export const fetchCart = () => client.get(ApiEndpoints.CART);

export const addToCart = (data: Omit<CartItem, "_id">) =>
  client.post(ApiEndpoints.CART, data);

export const updateCart = (id: string, data: Partial<Omit<CartItem, "_id">>) =>
  client.put(`${ApiEndpoints.CART}/${id}`, data);

export const deleteCart = (id: string) =>
  client.delete(`${ApiEndpoints.CART}/${id}`);

export const clearCart = () => client.delete(ApiEndpoints.CART);

export const createOrder = (payload: any) =>
  client.post(ApiEndpoints.ORDER, payload);

export const getOrders = (userId: string) =>
  client.get(`${ApiEndpoints.ORDER}/${userId}`);

export const getOrderById = (orderId: string) =>
  client.get(`${ApiEndpoints.ORDER}/${orderId}`);

export const getReviews = (productId: string) =>
  client.get(`${ApiEndpoints.REVIEWS}/${productId}`);

export const postReview = (body: {
  rating: number;
  comment: string;
  productId: string;
}) => client.post(`${ApiEndpoints.REVIEWS}`, body);
