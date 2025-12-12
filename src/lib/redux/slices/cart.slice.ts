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

      const existingIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingIndex !== -1) {
        // Update quantity of existing item
        state.items[existingIndex].quantity += action.payload.quantity;
      } else {
        // Add new item
        state.items = [action.payload, ...state.items];
      }
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
      const existingIndex = state.draftCart.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingIndex !== -1) {
        // Update quantity
        state.draftCart[existingIndex].quantity += action.payload.quantity;
      } else {
        // Add new draft item
        state.draftCart = [action.payload, ...state.draftCart];
      }
    },

    removeFromDrafrCart: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.items = state.items.filter((i) => i._id !== action.payload);
    },

    clearDraftCart: (state) => {
      state.draftCart = [];
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
  removeFromDrafrCart,
  clearDraftCart,
} = cartSlice.actions;

export default cartSlice.reducer;
