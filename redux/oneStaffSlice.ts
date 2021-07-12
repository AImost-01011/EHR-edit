import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { oneStaffDataType, oneStaffType } from "../globalType";

const initialState: oneStaffType = {
  loading: false,
  error: false,
  errorMessage: "",
  message: {
    content: "",
    update: 0,
  },
  miAffiliation: [],
  navListSave: [],
  oriId_s: "",
  lastLogin: 0,
  isLogin: false,
  staffName: {
    name: "",
    hira: "",
  },
  workSpace: {
    mi: "",
    space: "",
  },
  email: "",
};

export const fetchStaff = createAsyncThunk<any, { email_s: string }>(
  "oneStaff/fetchStaff",
  (props) => {
    return axios
      .get(`/api/staff/read/${props.email_s}`)
      .then((result) => result.data)
      .catch((err) => err);
  }
);

export const setNavListSave = createAsyncThunk<
  any,
  { oriId_s: string; navListSave: string[] }
>("oneStaff/setNavListSave", (props) => {
  return axios
    .post("/api/staff/update/navListSave", {
      oriId_s: props.oriId_s,
      navListSave: props.navListSave,
    })
    .then((result) => result.data)
    .catch((err) => err);
});

export const updateMessage = createAsyncThunk<
  oneStaffDataType,
  { oriId_s: string; content: string }
>("oneStaff/updateMessage", (props) => {
  return axios
    .post("/api/staff/update/message", {
      oriId_s: props.oriId_s,
      content: props.content,
    })
    .then((result) => result.data)
    .catch((err) => err);
});

const oneStaffSlice = createSlice({
  name: "oneStaff",
  initialState: initialState,
  reducers: {
    serversideData(state, action: PayloadAction<oneStaffDataType>) {
      Object.assign(state, { ...action.payload });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStaff.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      fetchStaff.fulfilled,
      (state, action: PayloadAction<oneStaffDataType>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(fetchStaff.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });

    builder.addCase(setNavListSave.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      setNavListSave.fulfilled,
      (state, action: PayloadAction<oneStaffDataType>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(setNavListSave.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });

    builder.addCase(updateMessage.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      updateMessage.fulfilled,
      (state, action: PayloadAction<oneStaffDataType>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(updateMessage.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });
  },
});

export const { serversideData } = oneStaffSlice.actions;

export const oneStaffReducer = oneStaffSlice.reducer;
