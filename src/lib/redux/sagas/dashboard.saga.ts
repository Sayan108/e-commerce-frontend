// src/store/sagas/dashboardSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { getBanner, getVideos } from "../../services/api.services";
import {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} from "../slices/dashboard.slice";
import { AxiosResponse } from "axios";

// Fetch Dashboard Data (Banners and Videos)
function* fetchDashboardSaga() {
  try {
    const bannersResponse: AxiosResponse = yield call(getBanner);
    const videosResponse: AxiosResponse = yield call(getVideos);

    const banners = bannersResponse.data;
    const videos = videosResponse.data;

    yield put(fetchDashboardSuccess({ banners, videos }));
  } catch (error: any) {
    yield put(
      fetchDashboardFailure(error?.message || "Failed to load dashboard data")
    );
  }
}

// Watcher saga
export default function* dashboardRootSaga() {
  yield takeLatest(fetchDashboardStart.type, fetchDashboardSaga);
}
