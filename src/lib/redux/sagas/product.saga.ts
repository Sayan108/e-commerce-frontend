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
  fetchMoreProductsStart,
  fetchMoreProductsSuccess,
  fetchMoreProductsFailure,
} from "../slices/products.slice";

import { AxiosResponse } from "axios";
import {
  getNewArrivals,
  getProductById,
  getProducts,
  getReviews,
  postReview,
} from "@/lib/services/api.services";

// Fetch Products Data with Filters and Pagination

// Fetch Products by Category
function* fetchProducts(action: ReturnType<typeof fetchProductsStart>) {
  try {
    let response: AxiosResponse;
    if (Object.keys(action.payload).length > 0)
      response = yield call(getProducts, action.payload);
    else response = yield call(getNewArrivals);
    console.log(response.data.newarrivals);

    yield put(
      fetchProductsSuccess({
        products: response?.data?.data?.data ?? response?.data?.data,

        pagination: response.data.data.pagination,
      })
    );
  } catch (error: any) {
    yield put(
      fetchProductsFailure(error?.message || "Failed to load products")
    );
  }
}

function* fetchMoreProducts(action: ReturnType<typeof fetchMoreProductsStart>) {
  try {
    const response: AxiosResponse = yield call(getProducts, action.payload);

    yield put(
      fetchMoreProductsSuccess({
        products: response?.data?.data?.data,
        pagination: response.data.data.pagination,
      })
    );
  } catch (error: any) {
    yield put(
      fetchMoreProductsFailure(error?.message || "Failed to load products")
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
  yield takeLatest(fetchMoreProductsStart.type, fetchMoreProducts);
}
