"use client";
import { RootState } from "@/lib/redux";
import { fetchCategoriesStart } from "@/lib/redux/slices/categories.slice";
import {
  addReviewRequest,
  fetchProductsStart,
  getReviewsRequest,
  setCurrentProduct,
  setProductFilter,
} from "@/lib/redux/slices/products.slice";
import { Product, ProductFilter } from "@/lib/redux/types/product.types";
import { useDispatch, useSelector } from "react-redux";

const useProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error, currentProduct, currentProductReview } =
    useSelector((state: RootState) => state.products);

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

  const postProductReview = (payload: {
    rating: number;
    comment: string;
    productId: string;
  }) => dispatch(addReviewRequest(payload));

  const getProductReview = () =>
    dispatch(getReviewsRequest(currentProduct?._id ?? ""));

  return {
    products,
    currentProduct,
    loading,
    currentProductReview,
    error,

    fetchProducts,
    updateFilter,
    fetchProductByCategory,
    setProduct,
    postProductReview,
    getProductReview,
  };
};

export default useProducts;
