import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { onePatientDataType, patientType } from "../globalType";

const initialState: patientType = {
  loading: false,
  error: false,
  errorMessage: "",
  patient: [],
};

export const fetchAddList = createAsyncThunk<any, { miId: string }>(
  "add/fetchAddList",
  (props) => {
    return axios
      .get(`/api/patient/read/${props.miId}`)
      .then((result) => result.data)
      .catch((err) => err);
  }
);

export const searchAdd = createAsyncThunk<
  any,
  { oriId_m: string; category: string; search: string }
>("add/searchAdd", (props) => {
  return axios
    .post("/api/patient/read/search", {
      oriId_m: props.oriId_m,
      category: props.category,
      search: props.search,
    })
    .then((result) => result.data)
    .catch((err) => err);
});

const addSlice = createSlice({
  name: "oneStaff",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddList.pending, (state) => {
      Object.assign(state.loading, true);
    });
    builder.addCase(
      fetchAddList.fulfilled,
      (state, action: PayloadAction<onePatientDataType[]>) => {
        state.patient.splice(0);
        Object.assign(state, { loading: false, patient: action.payload });
      }
    );
    builder.addCase(fetchAddList.rejected, (state, action) => {
      Object.assign(state, { error: true, errorMessage: action.payload });
    });

    builder.addCase(searchAdd.pending, (state) => {
      Object.assign(state.loading, true);
    });
    builder.addCase(
      searchAdd.fulfilled,
      (state, action: PayloadAction<onePatientDataType[]>) => {
        state.patient.splice(0);
        Object.assign(state, { loading: false, patient: action.payload });
      }
    );
    builder.addCase(searchAdd.rejected, (state, action) => {
      Object.assign(state, { error: true, errorMessage: action.payload });
    });
  },
});

export const {} = addSlice.actions;

export const addReducer = addSlice.reducer;
