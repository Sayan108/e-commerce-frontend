import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../types/address.types";

interface AddressState {
  data: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  data: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    /* =======================
       ✅ SAVE
    ======================== */
    saveAddressRequest: (
      state,
      _action: PayloadAction<Omit<Address, "id">>
    ) => {
      state.loading = true;
      state.error = null;
    },

    saveAddressSuccess: (state, action: PayloadAction<Address>) => {
      state.loading = false;
      state.data = [action.payload, ...state.data];
    },

    saveAddressFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* =======================
       ✅ FETCH
    ======================== */
    fetchAddressRequest: (state) => {
      state.loading = true;
    },

    fetchAddressSuccess: (state, action: PayloadAction<Address[]>) => {
      state.loading = false;
      state.data = action.payload;
    },

    fetchAddressFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* =======================
       ✅ UPDATE
    ======================== */
    updateAddressRequest: (state, _action: PayloadAction<Address>) => {
      state.loading = true;
    },

    updateAddressSuccess: (state, action: PayloadAction<Address>) => {
      state.loading = false;
      state.data = state.data.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },

    updateAddressFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* =======================
       ✅ DELETE
    ======================== */
    deleteAddressRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },

    deleteAddressSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload);
    },

    deleteAddressFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* =======================
       ✅ CLEAR LOCAL STATE
    ======================== */
    clearAddress: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  saveAddressRequest,
  saveAddressSuccess,
  saveAddressFailure,

  fetchAddressRequest,
  fetchAddressSuccess,
  fetchAddressFailure,

  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFailure,

  deleteAddressRequest,
  deleteAddressSuccess,
  deleteAddressFailure,

  clearAddress,
} = addressSlice.actions;

export default addressSlice.reducer;
