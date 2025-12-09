"use client";
import { RootState } from "@/lib/redux";
import { fetchCategoriesStart } from "@/lib/redux/slices/categories.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return {
    categories,
    loading,
    error,
  };
};

export default useCategory;
