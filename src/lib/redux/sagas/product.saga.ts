// src/store/sagas/productsSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";

import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  getReviewsRequest,
  getReviewsSuccess,
  getReviewsFailure,
  addReviewRequest,
  addReviewSuccess,
  addReviewFailure,
} from "../slices/products.slice";

import { AxiosResponse } from "axios";
import {
  getProducts,
  getReviews,
  postReview,
} from "@/lib/services/api.services";
import { store } from "..";

// Fetch Products Data with Filters and Pagination

// Fetch Products by Category
function* fetchProducts() {
  console.log("ggghgh");
  try {
    const { filter } = store.getState().products;
    const response: AxiosResponse = yield call(getProducts, filter);

    yield put(
      fetchProductsSuccess({
        data: response.data.data.data,
        totalCount: response.data.data.pagination.total,
      })
    );
  } catch (error: any) {
    yield put(
      fetchProductsFailure(error?.message || "Failed to load products")
    );
  }
}

function* handleGetReviews(action: ReturnType<typeof getReviewsRequest>) {
  try {
    const reviews: AxiosResponse = yield call(getReviews, action.payload);
    yield put(getReviewsSuccess(reviews.data.list));
  } catch (err: any) {
    yield put(getReviewsFailure(err.message));
  }
}

function* handleAddReview(action: ReturnType<typeof addReviewRequest>) {
  try {
    const newReview: AxiosResponse = yield call(postReview, action.payload);
    yield put(addReviewSuccess(newReview.data.data));
  } catch (err: any) {
    yield put(addReviewFailure(err.message));
  }
}

// Watcher saga
export default function* productsRootSaga() {
  yield takeLatest(fetchProductsStart.type, fetchProducts);
  yield takeLatest(getReviewsRequest.type, handleGetReviews);
  yield takeLatest(addReviewRequest.type, handleAddReview);
}
