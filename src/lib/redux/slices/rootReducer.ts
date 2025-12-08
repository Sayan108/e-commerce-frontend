// src/store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import dashBOardReducer from "./dashboard.slice";
import categoriesReducer from "./categories.slice";
import productReducer from "./products.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashBOardReducer,
  categories: categoriesReducer,
  products: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
