"use client";
import { RootState } from "@/lib/redux";
import {
  fetchCategoriesStart,
  setCurrentCategory,
} from "@/lib/redux/slices/categories.slice";
import { Category } from "@/lib/redux/types/category.types";

import { useDispatch, useSelector } from "react-redux";

const useCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  const fetchCategory = (isFeatured?: boolean) => {
    dispatch(fetchCategoriesStart(isFeatured));
  };

  const updateCurrentCategory = (category: Category) => {
    dispatch(setCurrentCategory(category));
  };

  return {
    categories,
    loading,
    error,

    fetchCategory,
    updateCurrentCategory,
  };
};

export default useCategory;
