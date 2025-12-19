// src/store/slices/categoriesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoriesState } from "../types/category.types";

// Initial state
const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
  selectedCategory: null,
};

// Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategoriesStart: (state, _: PayloadAction<boolean | undefined>) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearCurrentCategory: (state) => {
      state.selectedCategory = null;
    },

    setCurrentCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
  },
});

// Actions and Reducer
export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,

  setCurrentCategory,
  clearCurrentCategory,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
