// src/lib/redux/slices/order.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  userId: string;
  productId: string;
  quantity: number;
  price: number;
  productname: string;
  thumbnail?: string;
}

export enum OrderType {
  items,
  fullCart,
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  billingaddress: string;
  shippingaddress: string;
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  orderDetails: Order | null;
  loading: boolean;
  placingOrder: boolean;
  error: string | null;
  currentOrder: Order | null;
}

const initialState: OrderState = {
  orders: [],
  orderDetails: null,
  loading: false,
  placingOrder: false,
  error: null,
  currentOrder: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    fetchOrdersRequest: (state) => {
      state.loading = true;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    placeOrderRequest: (state, _: PayloadAction<OrderType>) => {
      state.placingOrder = true;
    },
    placeOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.placingOrder = false;
      state.orders.push(action.payload);
    },
    placeOrderFailure: (state, action: PayloadAction<string>) => {
      state.placingOrder = false;
      state.error = action.payload;
    },
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },
  },
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,

  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,

  setCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
