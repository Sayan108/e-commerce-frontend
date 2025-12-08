import { ProductFilter } from "./../types/product.types";

// src/store/slices/productsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Product,
  ProductState,
  PaginatedResponse,
} from "../types/product.types";

// Initial state
const initialState: ProductState = {
  products: [],
  totalCount: 0,
  loading: false,
  error: null,

  filter: {},
};

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (
      state,
      action: PayloadAction<PaginatedResponse<Product>>
    ) => {
      state.products = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    setProductFilter: (
      state,
      action: PayloadAction<Partial<ProductFilter>>
    ) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

// Actions and Reducer
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productsSlice.actions;
export default productsSlice.reducer;
