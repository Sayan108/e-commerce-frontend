"use client";

import React, { ReactNode } from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/lib/redux";
import GlobalSnackbar from "@/components/shared/snackBar";
import NavigationProvider from "./navigation.provider";
import ProtectedRoute from "./protectedroute.provider";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NavigationProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ProtectedRoute>
            <GlobalSnackbar />
            {children}
          </ProtectedRoute>
        </PersistGate>
      </Provider>
    </NavigationProvider>
  );
};
