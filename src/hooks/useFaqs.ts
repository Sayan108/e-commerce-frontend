import { RootState } from "@/lib/redux";
import {
  fetchDashboardStart,
  fetchFaqStart,
} from "@/lib/redux/slices/dashboard.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFaqs = () => {
  const dispatch = useDispatch();
  const { faqs, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchFaqStart());
  }, [dispatch]);
  return {
    faqs,
    loading,
  };
};

export default useFaqs;
