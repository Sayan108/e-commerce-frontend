// src/store/slices/dashboardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Banner, Video, DashboardState } from "../types/dashboard.types";

// Initial state
const initialState: DashboardState = {
  banners: [],
  videos: [],
  loading: false,
  error: null,
};

// Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDashboardStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (
      state,
      action: PayloadAction<{ banners: Banner[]; videos: Video[] }>
    ) => {
      state.banners = action.payload.banners;
      state.videos = action.payload.videos;
      state.loading = false;
    },
    fetchDashboardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Actions and Reducer
export const {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
