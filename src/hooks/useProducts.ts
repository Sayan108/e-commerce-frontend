"use client";
import { RootState } from "@/lib/redux";
import { fetchCategoriesStart } from "@/lib/redux/slices/categories.slice";
import {
  fetchProductsStart,
  setCurrentProduct,
  setProductFilter,
} from "@/lib/redux/slices/products.slice";
import { Product, ProductFilter } from "@/lib/redux/types/product.types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error, currentProduct } = useSelector(
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

  const setProduct = (product: Product) => {
    dispatch(setCurrentProduct(product));
  };

  return {
    products,
    currentProduct,
    loading,
    error,

    fetchProducts,
    updateFilter,
    fetchProductByCategory,
    setProduct,
  };
};

export default useProducts;
