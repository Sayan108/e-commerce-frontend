import { ProductFilter, ReviewType } from "./../types/product.types";

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
  pagination: {
    limit: 10,
    page: 1,
    total: 0,
    pages: 0,
  },
  loading: false,
  reviewLoading: false,
  error: null,
  currentProduct: null,
  currentProductReview: [],
  filter: {},
  hasMore: false,
};

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart: (state, _: PayloadAction<ProductFilter>) => {
      state.loading = true;
      state.error = null;
      state.currentProduct = null;
      state.products = [];
    },
    fetchProductsSuccess: (
      state,
      action: PayloadAction<{
        products: Product[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          pages: number;
        };
      }>
    ) => {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.products = [];
    },

    setProductFilter: (
      state,
      action: PayloadAction<Partial<ProductFilter>>
    ) => {
      state.filter = { ...state.filter, ...action.payload };
    },

    clearProducts: (state) => {
      state = initialState;
    },

    getProductDetailRequested: (state, _: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.currentProduct = null;
    },

    getProductRequestSuccess: (state, action: PayloadAction<Product>) => {
      (state.loading = false), (state.currentProduct = action.payload);
    },

    getProductDetailsFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.currentProduct = null;
    },

    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },

    getReviewsRequest(state, _: PayloadAction<string>) {
      state.reviewLoading = true;
      state.error = null;
      state.currentProductReview = [];
    },
    getReviewsSuccess(state, action: PayloadAction<ReviewType[]>) {
      state.currentProductReview = action.payload;
      state.reviewLoading = false;
    },
    getReviewsFailure(state, action: PayloadAction<any>) {
      state.reviewLoading = false;
      state.error = action.payload;
      state.currentProductReview = [];
    },

    addReviewRequest(
      state,
      _: PayloadAction<{
        rating: number;
        comment: string;
        productId: string;
      }>
    ) {
      state.reviewLoading = true;
    },
    addReviewSuccess(state, action: PayloadAction<ReviewType>) {
      state.currentProductReview.unshift(action.payload);
      state.reviewLoading = false;
    },
    addReviewFailure(state, action: PayloadAction<any>) {
      state.reviewLoading = false;
      state.error = action.payload;
    },
  },
});

// Actions and Reducer
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,

  clearProducts,

  setProductFilter,

  getProductDetailRequested,
  getProductRequestSuccess,
  getProductDetailsFailure,

  addReviewRequest,
  addReviewSuccess,
  addReviewFailure,

  getReviewsSuccess,
  getReviewsRequest,
  getReviewsFailure,
} = productsSlice.actions;
export default productsSlice.reducer;
