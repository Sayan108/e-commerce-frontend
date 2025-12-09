// src/types/products.types.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageurl: string;
  categoryId: string;
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

export interface ProductState {
  products: Product[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  filter: ProductFilter;
}

export enum SortOrder {
  asc = "asc",
  desc = "desc",
}
