import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenModal: false,
  modalData: null,
  isSpecialView: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpenModal = true;
      state.modalData = action.payload;
    },
    closeModal: state => {
      state.isOpenModal = false;
      state.modalData = null;
    },
    setSpecialModalView: (state, action) => {
      state.isSpecialView = action.payload;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
