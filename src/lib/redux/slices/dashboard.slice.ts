// src/store/slices/dashboardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Banner,
  Video,
  DashboardState,
  faq,
  ContactUsInfo,
} from "../types/dashboard.types";

// Initial state
const initialState: DashboardState = {
  banners: [],
  videos: [],
  faqs: [],
  contactUsInfo: {
    email: "",
    phone: "",
    address: "",
    contactusEmail: "",
  },
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
    fetchDashboardFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchFaqStart: (state) => {
      state.loading = true;
    },
    fetchFaqSuccess: (state, action: PayloadAction<faq[]>) => {
      state.faqs = action.payload;
      state.loading = false;
    },
    fetchFaqError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchContactUsInfoStart: (state) => {
      state.loading = true;
    },
    fetchContactUsInfoSuccess: (
      state,
      action: PayloadAction<ContactUsInfo>
    ) => {
      state.contactUsInfo = action.payload;
      state.loading = false;
    },
    fetchContactUsInfoError: (state, action: PayloadAction<any>) => {
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

  fetchFaqStart,
  fetchFaqSuccess,
  fetchFaqError,

  fetchContactUsInfoStart,
  fetchContactUsInfoSuccess,
  fetchContactUsInfoError,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
