// src/hooks/useOrders.ts
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersRequest,
  Order,
  placeOrderRequest,
} from "@/lib/redux/slices/order.slice";
import { RootState } from "@/lib/redux";

export function useOrders() {
  const dispatch = useDispatch();

  const { orders, orderDetails, loading, placingOrder, error } = useSelector(
    (state: RootState) => state.order
  );

  return {
    orders,
    orderDetails,
    loading,
    placingOrder,
    error,

    getOrders: () => dispatch(fetchOrdersRequest()),

    placeOrder: (payload: Omit<Order, "_id">) =>
      dispatch(placeOrderRequest(payload)),
  };
}
