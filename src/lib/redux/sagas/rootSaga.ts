// src/store/rootSaga.ts
import { all } from "redux-saga/effects";
import authRootSaga from "./auth.saga";
import dashboardRootSaga from "./dashboard.saga";
import categoriesRootSaga from "./categories.saga";
import productsRootSaga from "./product.saga";
import addressRootSaga from "./address.saga";
import cartRootSaga from "./cart.saga";
import orderRootSaga from "./order.saga";

export default function* rootSaga() {
  yield all([
    authRootSaga(),
    dashboardRootSaga(),
    categoriesRootSaga(),
    productsRootSaga(),
    addressRootSaga(),
    cartRootSaga(),
    orderRootSaga(),
  ]);
}
