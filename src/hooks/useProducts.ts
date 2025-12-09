"use client";
import { RootState } from "@/lib/redux";
import { fetchCategoriesStart } from "@/lib/redux/slices/categories.slice";
import {
  fetchProductsStart,
  setProductFilter,
} from "@/lib/redux/slices/products.slice";
import { ProductFilter } from "@/lib/redux/types/product.types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const fetchProducts = () => {
    dispatch(fetchProductsStart());
  };

  const fetchProductByCategory = (categoryId: string) => {
    dispatch(setProductFilter({ categoryId }));
    fetchProducts();
  };

  const updateFilter = (filter: ProductFilter) => {
    dispatch(setProductFilter(filter));
  };

  return {
    products,
    loading,
    error,

    fetchProducts,
    updateFilter,
    fetchProductByCategory,
  };
};

export default useProducts;
