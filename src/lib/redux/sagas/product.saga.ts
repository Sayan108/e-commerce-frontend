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

// Fetch Products Data with Filters and Pagination

// Fetch Products by Category
function* fetchProducts() {
  try {
    const { filter } = store.getState().products;
    const response: AxiosResponse = yield call(getProducts, filter);

    yield put(fetchProductsSuccess(response.data));
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
