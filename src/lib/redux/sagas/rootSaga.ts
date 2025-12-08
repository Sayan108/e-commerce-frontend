// src/store/rootSaga.ts
import { all } from "redux-saga/effects";
import authRootSaga from "./auth.saga";
import dashboardRootSaga from "./dashboard.saga";
import categoriesRootSaga from "./categories.saga";

export default function* rootSaga() {
  yield all([authRootSaga(), dashboardRootSaga(), categoriesRootSaga()]);
}
