// src/hooks/useOrders.ts
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersRequest,
  Order,
  OrderType,
  placeOrderRequest,
  setCurrentOrder,
} from "@/lib/redux/slices/order.slice";
import { RootState } from "@/lib/redux";

export function useOrders() {
  const dispatch = useDispatch();

  const { orders, orderDetails, loading, placingOrder, error, currentOrder } =
    useSelector((state: RootState) => state.order);

  return {
    orders,
    orderDetails,
    loading,
    placingOrder,
    error,
    currentOrder,

    getOrders: () => dispatch(fetchOrdersRequest()),

    placeOrder: (type: OrderType) => dispatch(placeOrderRequest(type)),

    setCurrentOrder: (order: Order) => dispatch(setCurrentOrder(order)),
  };
}
