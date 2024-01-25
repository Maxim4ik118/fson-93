import { createSelector } from '@reduxjs/toolkit';

const selectModal = state => state.modal;

export const selectIsOpenModal = createSelector(
  selectModal,
  modal => modal.isOpenModal
);
export const selectModalData = createSelector(
  selectModal,
  modal => modal.modalData
);
export const selectModalIsSpecialView = createSelector(
  selectModal,
  modal => modal.isSpecialView
);
