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
  getProductDetailRequested,
  getProductRequestSuccess,
  getProductDetailsFailure,
} from "../slices/products.slice";

import { AxiosResponse } from "axios";
import {
  getProductById,
  getProducts,
  getReviews,
  postReview,
} from "@/lib/services/api.services";
import { store } from "..";

// Fetch Products Data with Filters and Pagination

// Fetch Products by Category
function* fetchProducts(action: ReturnType<typeof fetchProductsStart>) {
  try {
    const response: AxiosResponse = yield call(getProducts, action.payload);

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

function* fetchProductDetailsById(
  action: ReturnType<typeof getProductDetailRequested>
) {
  try {
    const response: AxiosResponse = yield call(getProductById, action.payload);
    yield put(getProductRequestSuccess(response.data.product));
    yield put(getReviewsRequest(response.data.product._id));
  } catch (error) {
    yield put(getProductDetailsFailure(error));
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
    yield put(addReviewSuccess(newReview.data.review));
  } catch (err: any) {
    yield put(addReviewFailure(err.message));
  }
}

// Watcher saga
export default function* productsRootSaga() {
  yield takeLatest(fetchProductsStart.type, fetchProducts);
  yield takeLatest(getProductDetailRequested.type, fetchProductDetailsById);
  yield takeLatest(getReviewsRequest.type, handleGetReviews);
  yield takeLatest(addReviewRequest.type, handleAddReview);
}
