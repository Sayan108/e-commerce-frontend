// src/store/sagas/dashboardSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { getBanner, getVideos } from "../../services/api.services";
import {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} from "../slices/dashboard.slice";
import { AxiosResponse } from "axios";
import { Banner, Video } from "../types/dashboard.types";

// Fetch Dashboard Data (Banners and Videos)
function* fetchDashboardSaga() {
  try {
    const bannersResponse: AxiosResponse = yield call(getBanner);
    const videosResponse: AxiosResponse = yield call(getVideos);
    console.log(bannersResponse.data);

    const banners: Banner[] = bannersResponse.data.banners.map(
      (banner: any) => ({
        id: banner._id,
        description: banner.description,
        name: banner.name,
        imageurl: banner.imageurl,
        link: banner.link,
      })
    );
    const videos: Video[] = videosResponse.data.videos.map((video: any) => ({
      id: video._id,
      title: video.title,
      description: video.description,
      videoink: video.videolink,
      thumbnail: video.thumbnail,
    }));

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
