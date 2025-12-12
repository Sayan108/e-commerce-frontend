import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/lib/redux/types/cart.types";

interface CartState {
  items: CartItem[];
  loading: boolean;
  draftCart: Array<Omit<CartItem, "_id">>;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  draftCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /* ========================
       FETCH CART
    ========================= */
    fetchCartRequest: (state) => {
      state.loading = true;
    },
    fetchCartSuccess: (state, action: PayloadAction<CartItem[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ========================
       ADD TO CART
    ========================= */
    addToCartRequest: (state, _action: PayloadAction<number>) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action: PayloadAction<CartItem>) => {
      state.loading = false;
      state.items = [action.payload, ...state.items];
    },
    addToCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ========================
       UPDATE QTY
    ========================= */
    updateCartRequest: (state, _action: PayloadAction<Partial<CartItem>>) => {
      state.loading = true;
    },
    updateCartSuccess: (state, action: PayloadAction<CartItem>) => {
      state.loading = false;
      state.items = state.items.map((i) =>
        i._id === action.payload._id ? action.payload : i
      );
    },
    updateCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ========================
       DELETE CART ITEM
    ========================= */
    deleteCartRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteCartSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.items = state.items.filter((i) => i._id !== action.payload);
    },
    deleteCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ========================
       CLEAR CART
    ========================= */
    clearCartRequest: (state) => {
      state.loading = true;
    },
    clearCartSuccess: (state) => {
      state.loading = false;
      state.items = [];
    },

    clearCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ========================
       DRAFT CART
    ========================= */

    addToDraftCart: (state, action: PayloadAction<Omit<CartItem, "_id">>) => {
      state.draftCart = [action.payload, ...state.draftCart];
    },

    removeFromDrafrCart: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.items = state.items.filter((i) => i._id !== action.payload);
    },

    updateDraftCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = false;
      state.items = state.items.map((i) =>
        i._id === action.payload._id ? action.payload : i
      );
    },
  },
});

export const {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,

  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,

  updateCartRequest,
  updateCartSuccess,
  updateCartFailure,

  deleteCartRequest,
  deleteCartSuccess,
  deleteCartFailure,

  clearCartRequest,
  clearCartSuccess,
  clearCartFailure,

  addToDraftCart,
  updateDraftCart,
  removeFromDrafrCart,
} = cartSlice.actions;

export default cartSlice.reducer;
