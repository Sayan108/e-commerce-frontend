export interface OrderItem {
  userId: string;
  productId: string;
  quantity: number;
  price: number;
  itemname: string;
  thumbnail?: string;
}

export enum OrderType {
  items,
  fullCart,
}

export interface Order {
  _id: string;

  orderNumber: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  billingaddress: string;
  shippingaddress: string;
  createdAt: string;
}

export interface OrderState {
  orders: Order[];
  orderDetails: Order | null;
  loading: boolean;
  placingOrder: boolean;
  error: string | null;
  currentOrder: Order | null;
}
