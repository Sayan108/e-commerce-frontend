import { useDispatch, useSelector } from "react-redux";
import {
  saveAddressRequest,
  fetchAddressRequest,
  updateAddressRequest,
  deleteAddressRequest,
  clearAddress,
} from "@/lib/redux/slices/address.slice";
import { Address } from "@/lib/redux/types/address.types";
import { AppDispatch, RootState } from "@/lib/redux";

export const useAddress = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.address
  );

  /* =======================
     ✅ ACTION DISPATCHERS
  ======================== */

  const saveAddress = (payload: Address) => {
    dispatch(saveAddressRequest(payload));
  };

  const fetchAddress = () => {
    dispatch(fetchAddressRequest());
  };

  const updateAddress = (payload: Address) => {
    dispatch(updateAddressRequest(payload));
  };

  const deleteAddress = (id: string) => {
    dispatch(deleteAddressRequest(id));
  };

  const resetAddress = () => {
    dispatch(clearAddress());
  };

  return {
    // ✅ state
    addresses: data, // ✅ array of addresses
    loading,
    error,

    // ✅ actions
    saveAddress,
    fetchAddress,
    updateAddress,
    deleteAddress,
    resetAddress,
  };
};
