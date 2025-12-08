// src/store/sagas/categoriesSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import {
  fetchCategoriesFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "../slices/categories.slice";
import { getCategories } from "@/lib/services/api.services";

// Fetch Categories Data
function* fetchCategoriesSaga() {
  try {
    const response: AxiosResponse = yield call(getCategories);

    const categories = response.data;

    yield put(fetchCategoriesSuccess(categories));
  } catch (error: any) {
    yield put(
      fetchCategoriesFailure(error?.message || "Failed to load categories")
    );
  }
}

// Watcher saga
export default function* categoriesRootSaga() {
  yield takeLatest(fetchCategoriesStart.type, fetchCategoriesSaga);
}
