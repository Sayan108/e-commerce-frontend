import { RootState } from "@/lib/redux";
import { fetchContactUsInfoStart } from "@/lib/redux/slices/dashboard.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useContactUsInfo = () => {
  const dispatch = useDispatch();
  const { contactUsInfo, loading } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchContactUsInfoStart());
  }, [dispatch]);
  return {
    contactUsInfo,
    loading,
  };
};

export default useContactUsInfo;
