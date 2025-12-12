import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export enum ISnackBarType {
  success,

  error,

  info,

  warning,
}
interface SnackbarState {
  open: boolean;
  message: string;
  type: ISnackBarType;
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  type: ISnackBarType.info,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; type?: SnackbarState["type"] }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type || ISnackBarType.info;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
