import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { oneMiDataType, oneMiType } from "../globalType";

const initialState: oneMiType = {
  loading: false,
  error: false,
  errorMessage: "",
  miName: {
    name: "",
    hira: "",
  },
  oriId_m: "",
  email: "",
  location: {
    zip_m: "",
    address1_m: "",
    address2_m: "",
  },
  contact: {
    phone_m: "",
    fax_m: "",
    contactEmail: "",
  },
  businessContact: [],
  notice_m: [],
};

export const fetchMi = createAsyncThunk<oneMiDataType, { oriId_m: string }>(
  "oneMi/fetchMi",
  (props) => {
    return axios
      .get(`/api/mi/read/${props.oriId_m}`)
      .then((result) => result.data)
      .catch((err) => err);
  }
);

export const addBusiness = createAsyncThunk<
  oneMiDataType,
  { oriId_m: string; with: string; speaker: string; content: string }
>("oneMi/addBusiness", (props) => {
  return axios
    .post("/api/mi/update/businessMessage/add", {
      with: props.with,
      speaker: props.speaker,
      content: props.content,
      oriId_m: props.oriId_m,
    })
    .then((result) => result.data)
    .catch((err) => err);
});

const oneMiSlice = createSlice({
  name: "oneMi",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMi.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      fetchMi.fulfilled,
      (state, action: PayloadAction<oneMiDataType>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(fetchMi.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });

    builder.addCase(addBusiness.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      addBusiness.fulfilled,
      (state, action: PayloadAction<oneMiDataType>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(addBusiness.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });
  },
});

export const {} = oneMiSlice.actions;

export const oneMiReducer = oneMiSlice.reducer;
