// src/store/sagas/dashboardSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getBanner,
  getContactUsInfo,
  getFAQs,
  getVideos,
} from "../../services/api.services";
import {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  fetchFaqSuccess,
  fetchFaqError,
  fetchFaqStart,
  fetchContactUsInfoStart,
  fetchContactUsInfoSuccess,
  fetchContactUsInfoError,
} from "../slices/dashboard.slice";
import { AxiosResponse } from "axios";
import { Banner, Video } from "../types/dashboard.types";

// Fetch Dashboard Data (Banners and Videos)
function* fetchDashboardSaga() {
  try {
    const bannersResponse: AxiosResponse = yield call(getBanner);
    const videosResponse: AxiosResponse = yield call(getVideos);
    console.log(bannersResponse.data);

    const banners: Banner[] = bannersResponse.data.banners;
    const videos: Video[] = videosResponse.data.videos;

    yield put(fetchDashboardSuccess({ banners, videos }));
  } catch (error: any) {
    yield put(
      fetchDashboardFailure(error?.message || "Failed to load dashboard data")
    );
  }
}

function* fetchFAQsaga() {
  try {
    const response: AxiosResponse = yield call(getFAQs);
    yield put(fetchFaqSuccess(response?.data?.result));
  } catch (error) {
    yield put(fetchFaqError(error));
  }
}

function* fetchContactUsInfosaga() {
  try {
    const response: AxiosResponse = yield call(getContactUsInfo);
    yield put(fetchContactUsInfoSuccess(response?.data?.result));
  } catch (error) {
    yield put(fetchContactUsInfoError(error));
  }
}

// Watcher saga
export default function* dashboardRootSaga() {
  yield takeLatest(fetchDashboardStart.type, fetchDashboardSaga);
  yield takeLatest(fetchFaqStart.type, fetchFAQsaga);
  yield takeLatest(fetchContactUsInfoStart.type, fetchContactUsInfosaga);
}
