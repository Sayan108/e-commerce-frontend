"use client";

import React, { ReactNode } from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/lib/redux";
import GlobalSnackbar from "@/components/shared/snackBar";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalSnackbar />
        {children}
      </PersistGate>
    </Provider>
  );
};
