import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { onePatientDataType, patientType } from "../globalType";

const initialState: patientType = {
  loading: false,
  error: false,
  errorMessage: "",
  patient: [],
};

export const fetchNavList = createAsyncThunk<any, { navListSave: string[] }>(
  "patient/fetchNavList",
  (props) => {
    return axios
      .post("/api/patient/read/navListSave", {
        navListSave: props.navListSave,
      })
      .then((result) => result.data)
      .catch((err) => err);
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNavList.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      fetchNavList.fulfilled,
      (state, action: PayloadAction<onePatientDataType[]>) => {
        state.patient.splice(0);
        Object.assign(state, {
          loading: false,
          patient: [...action.payload],
        });
      }
    );
    builder.addCase(fetchNavList.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });
  },
});

export const {} = patientSlice.actions;

export const patientReducer = patientSlice.reducer;
