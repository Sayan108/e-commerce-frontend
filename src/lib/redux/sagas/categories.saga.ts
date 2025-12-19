// src/store/sagas/categoriesSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import {
  fetchCategoriesFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "../slices/categories.slice";
import {
  getCategories,
  getFeaturedCategories,
} from "@/lib/services/api.services";

// Fetch Categories Data
function* fetchCategoriesSaga(action: ReturnType<typeof fetchCategoriesStart>) {
  try {
    let response: AxiosResponse;
    if (!action.payload) response = yield call(getCategories);
    else response = yield call(getFeaturedCategories);

    yield put(
      fetchCategoriesSuccess(response.data.featured ?? response.data.list)
    );
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
