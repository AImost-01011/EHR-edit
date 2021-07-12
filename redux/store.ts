import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { supporterReducer } from "./supporterSlice";
import { oneStaffReducer } from "./oneStaffSlice";
import { patientReducer } from "./patientSlice";
import { addReducer } from "./addSlice";
import { onePatientReducer } from "./onePatientSlice";
import { oneMiReducer } from "./oneMiSlice";

const comReducer = combineReducers({
  supporter: supporterReducer,
  oneStaff: oneStaffReducer,
  patient: patientReducer,
  add: addReducer,
  onePatient: onePatientReducer,
  oneMi: oneMiReducer,
});

const store = configureStore({
  reducer: comReducer,
});

export type RootState = ReturnType<typeof comReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
