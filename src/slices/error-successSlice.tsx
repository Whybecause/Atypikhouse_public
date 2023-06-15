import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IError {
    showModal: boolean,
    success: boolean,
    message: string
}

const initialState = { showModal: false, success: null, message: "" } as IError;

const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    showErrorModal(state, action: PayloadAction<string>) {
      state.showModal = true;
      state.message = action.payload;
    },
    resetErrorSuccessModal(state) {
      state.showModal = false;
      state.success = null;
      state.message = "";
    },
    showSuccessModal(state, action: PayloadAction<string>) {
      state.showModal = true;
      state.success = true;
      state.message = action.payload;
    }
  },
});

export const { showErrorModal, showSuccessModal, resetErrorSuccessModal, } = errorsSlice.actions;

export default errorsSlice.reducer;

