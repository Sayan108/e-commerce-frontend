"use client";

import React, { ReactNode, useEffect } from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/lib/redux";
import { setNavigator } from "@/hooks/useNavigation";
import { useRouter } from "next/router";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useRouter();
  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
