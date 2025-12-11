// src/store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import dashBOardReducer from "./dashboard.slice";
import categoriesReducer from "./categories.slice";
import productReducer from "./products.slice";
import addressReducer from "./address.slice";
import cartReducer from "./cart.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashBOardReducer,
  categories: categoriesReducer,
  products: productReducer,
  address: addressReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
