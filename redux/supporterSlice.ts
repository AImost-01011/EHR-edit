import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supportType } from "../globalType";

const initialState: supportType = {
  isAddOpen: false,
  isCreateOpen: false,
  openCards: [],
};

const supporterSlice = createSlice({
  name: "supporter",
  initialState: initialState,
  reducers: {
    openCreateDia(state) {
      state.isCreateOpen = true;
    },
    closeCreateDia(state) {
      state.isCreateOpen = false;
    },
    openAddDia(state) {
      state.isAddOpen = true;
    },
    closeAddDia(state) {
      state.isAddOpen = false;
    },
    updateOpenCards(state, action: PayloadAction<string[]>) {
      state.openCards = action.payload;
    },
  },
});

export const {
  openAddDia,
  openCreateDia,
  closeAddDia,
  closeCreateDia,
  updateOpenCards,
} = supporterSlice.actions;

export const supporterReducer = supporterSlice.reducer;
