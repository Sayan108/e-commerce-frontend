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
  pagination: { total: number; page: number; limit: number; pages: number };
  loading: boolean;
  error: string | null;
  filter: ProductFilter;
  currentProduct: Product | null;
  reviewLoading: boolean;
  currentProductReview: ReviewType[];
  hasMore: boolean;
}

export enum SortOrder {
  asc = "asc",
  desc = "desc",
}
