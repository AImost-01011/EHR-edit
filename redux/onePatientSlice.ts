import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { onePatientDataType, onePatientType } from "../globalType";

const initialState: onePatientDataType = {
  email: "",
  oriId_p: "",
  patientName: {
    name: "",
    hira: "",
  },
  miId_p: [],
  latestStaff: [],
  birthday: 0,
  gender: "",

  medicineNote: [],
  smoke: { isSmoke: false, startSmoke: 0, smokePerDay: 0, smokeComment: "" },
  location: {
    zip_p: "",
    address1_p: "",
    address2_p: "",
  },
  contact: {
    phone_p: "",
    emergency_p: "",
  },
  allergy: [],
  medicalHistory: [],
  medicalRecord: [],
};

export const fetchPatient = createAsyncThunk<any, { oriId_p: string }>(
  "onePatient/fetchPatient",
  (props) => {
    return axios
      .post("/api/patient/read/oriId_p", { oriId_p: props.oriId_p })
      .then((result) => result.data)
      .catch((err) => err);
  }
);

export const updateMedicalRecord = createAsyncThunk<
  any,
  {
    oriId_p: string;
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
    respiration: number | string;
    bodyTemp: number | string;
    systolicBP: number | string;
    diastolicBP: number | string;
    pulse: number | string;
    consciousLevel: number;
    consciousAdd: string;
    latestRecord: number;
    oriId_s: string;
    oriId_m: string;
  }
>("onePatient/updateMedicalRecord", (props) => {
  return axios
    .post("/api/patient/update/medicalRecord", {
      oriId_p: props.oriId_p,
      subjective: props.subjective,
      objective: props.objective,
      assessment: props.assessment,
      plan: props.plan,
      respiration: props.respiration,
      bodyTemp: props.bodyTemp,
      systolicBP: props.systolicBP,
      diastolicBP: props.diastolicBP,
      pulse: props.pulse,
      consciousLevel: props.consciousLevel,
      consciousAdd: props.consciousAdd,
      latestRecord: props.latestRecord,
      oriId_s: props.oriId_s,
      oriId_m: props.oriId_m,
    })
    .then((result) => result.data)
    .catch((err) => err);
});

const onePatientSlice = createSlice({
  name: "onePatient",
  initialState: initialState,
  reducers: {
    serversidePatient(state, action: PayloadAction<onePatientDataType>) {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPatient.fulfilled,
      (state, action: PayloadAction<onePatientDataType>) => {
        Object.assign(state, action.payload);
      }
    );

    builder.addCase(updateMedicalRecord.pending, (state) => {
      Object.assign(state, { loading: true });
    });
    builder.addCase(
      updateMedicalRecord.fulfilled,
      (state, action: PayloadAction<onePatientDataType>) => {
        Object.assign(state, { loading: false, ...action.payload });
      }
    );
    builder.addCase(updateMedicalRecord.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: true,
        errorMessage: action.payload,
      });
    });
  },
});

export const { serversidePatient } = onePatientSlice.actions;

export const onePatientReducer = onePatientSlice.reducer;
