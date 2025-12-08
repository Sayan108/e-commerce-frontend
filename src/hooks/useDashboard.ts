// src/hooks/useDashboard.ts
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { RootState } from "@/lib/redux";
import { fetchDashboardStart } from "@/lib/redux/slices/dashboard.slice";

const useDashboard = () => {
  const dispatch = useDispatch();
  const { banners, videos, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStart());
  }, [dispatch]);

  return {
    banners,
    videos,
    loading,
    error,
  };
};

export default useDashboard;
