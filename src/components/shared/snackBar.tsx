"use client";

import { useDispatch, useSelector } from "react-redux";

import { hideSnackbar, ISnackBarType } from "@/lib/redux/slices/snackbar.slice";
import { useEffect } from "react";
import { X } from "lucide-react";
import { RootState } from "@/lib/redux";

export default function GlobalSnackbar() {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector(
    (state: RootState) => state.snackbar
  );

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => dispatch(hideSnackbar()), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  const typeClasses = {
    [ISnackBarType.success]: "bg-green-600 text-white",
    [ISnackBarType.error]: "bg-red-600 text-white",
    [ISnackBarType.info]: "bg-blue-600 text-white",
    [ISnackBarType.warning]: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fadeIn z-[9999] ${typeClasses[type]}`}
    >
      <span className="font-medium">{message}</span>

      <button onClick={() => dispatch(hideSnackbar())}>
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
