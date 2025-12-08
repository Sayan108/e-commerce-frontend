// src/types/categories.types.ts

export interface Category {
  id: string;
  name: string;
  description: string;
  imageurl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}
