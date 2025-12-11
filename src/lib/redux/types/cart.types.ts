export interface CartItem {
  _id: string;
  itemname: string;
  productId: string;
  quantity: number;
  price: number;
  thumbnail?: string;
}
