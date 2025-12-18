// src/store/auth/apiEndpoints.ts

export enum ApiEndpoints {
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  GET_PROFILE = "/user/me",
  UPDATE_USER = "/users/me",

  DASHBOARD_BANNER = "/ecommercedashboard/banner",
  DASHBOARD_VIDEO = "/ecommercedashboard/videos",
  DASHBOARD_FAQ = "/ecommercedashboard/faq",
  CONTACT_US_INFO = "/ecommercedashboard/contactusinfo",

  CATEGORIES = "/categories",

  FEAURED_CATEGORIES = "/categories/featured",

  PRODUCTS = "/products",

  NEWARRIVAL_PRODUCS = "/products/newarrival",

  ADDRESS = "/address",

  CART = "/cart",

  ORDER = "/orders",

  REVIEWS = "/reviews",
}
