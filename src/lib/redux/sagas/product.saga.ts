// src/store/sagas/productsSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";

import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../slices/products.slice";

import { AxiosResponse } from "axios";
import { getProducts } from "@/lib/services/api.services";
import { store } from "..";
import { Product } from "../types/product.types";

// Fetch Products Data with Filters and Pagination

// Fetch Products by Category
function* fetchProducts() {
  console.log("ggghgh");
  try {
    const { filter } = store.getState().products;
    const response: AxiosResponse = yield call(getProducts, filter);
    const products: Product[] = response.data.data.data.map((product: any) => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      imageurl: product.imageUrl,
      categoryId: product.categoryId,
    }));
    console.log(products, "getting products ");
    yield put(
      fetchProductsSuccess({
        data: products,
        totalCount: response.data.data.pagination.total,
      })
    );
  } catch (error: any) {
    yield put(
      fetchProductsFailure(error?.message || "Failed to load products")
    );
  }
}

// Watcher saga
export default function* productsRootSaga() {
  yield takeLatest(fetchProductsStart.type, fetchProducts);
}
