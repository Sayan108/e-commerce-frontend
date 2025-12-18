// src/types/products.types.ts

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageurl: string;
  categoryId: string;
  reviewCount: number;
  rating: number;
}

export interface ProductFilter {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: string;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
}

export interface ReviewType {
  userId: string;
  productId: string;
  _id: string;
  rating: number;
  comment: string;
  userName: string;
  userProfilePicture: string;
}

export interface ProductState {
  products: Product[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  filter: ProductFilter;
  currentProduct: Product | null;
  reviewLoading: boolean;
  currentProductReview: ReviewType[];
}

export enum SortOrder {
  asc = "asc",
  desc = "desc",
}
