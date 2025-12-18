"use client";
import { RootState } from "@/lib/redux";
import {
  addReviewRequest,
  fetchProductsStart,
  getProductDetailRequested,
  getReviewsRequest,
  setProductFilter,
} from "@/lib/redux/slices/products.slice";
import { ProductFilter } from "@/lib/redux/types/product.types";
import { useDispatch, useSelector } from "react-redux";

const useProducts = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    reviewLoading,
    error,
    currentProduct,
    currentProductReview,
  } = useSelector((state: RootState) => state.products);

  const fetchProducts = (filter: ProductFilter) => {
    console.log(filter);
    dispatch(fetchProductsStart(filter));
  };

  const fetchProductByCategory = (categoryId: string) => {
    fetchProducts({ categoryId });
  };

  const updateFilter = (filter: ProductFilter) => {
    dispatch(setProductFilter(filter));
  };

  const getProductDetails = (productId: string) => {
    dispatch(getProductDetailRequested(productId));
  };

  const postProductReview = (payload: {
    rating: number;
    comment: string;
    productId: string;
  }) => dispatch(addReviewRequest(payload));

  return {
    products,
    currentProduct,
    loading,
    reviewLoading,
    currentProductReview,
    error,

    fetchProducts,
    getProductDetails,
    updateFilter,
    fetchProductByCategory,
    postProductReview,
  };
};

export default useProducts;
