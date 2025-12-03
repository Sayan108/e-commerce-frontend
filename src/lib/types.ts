export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string;
  imageUrl: string;
  imageHint: string;
  category: string;
  categoryId: string;
  subcategory: string;
  subcategoryId: string;
  rating: number;
  reviews: number;
  imageId?: string;
}

export interface SubCategory {
  id: string;
  name:string;
  productCount: number;
}

export interface Category {
  id: string;
  name: string;
  subcategories: SubCategory[];
  productCount: number;
  imageUrl: string;
  imageHint: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work';
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id:string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: Address;
  paymentMethod: 'COD' | 'Online';
  trackingNumber?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
  orders: Order[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl: string;
  quote: string;
  city: string;
}
