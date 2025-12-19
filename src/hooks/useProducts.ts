"use client";
import { RootState } from "@/lib/redux";
import {
  addReviewRequest,
  fetchMoreProductsStart,
  fetchProductsStart,
  getProductDetailRequested,
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
    pagination,
    moreLoading,
  } = useSelector((state: RootState) => state.products);

  const fetchProducts = (filter: ProductFilter) => {
    dispatch(fetchProductsStart(filter));
  };

  const fetchPaginatedProducts = (payload: ProductFilter) => {
    const { limit, page, totalPages } = pagination;
    console.log(payload);

    if (totalPages > page) {
      const filter: ProductFilter = { ...payload, limit, page: page + 1 };
      dispatch(fetchMoreProductsStart(filter));
    }
  };

  const fetchProductByCategory = (categoryId: string) => {
    fetchProducts({ categoryId, limit: 12, page: 1 });
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
    moreLoading,
    error,

    fetchProducts,
    getProductDetails,
    fetchProductByCategory,
    postProductReview,
    fetchPaginatedProducts,
  };
};

export default useProducts;
