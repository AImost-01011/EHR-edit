import mongoose from "mongoose";
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    email: String,
    oriId_p: String,
    patientName: {
      name: String,
      hira: String,
    },
    miId_p: [String],
    latestStaff: [String],
    birthday: Number,
    gender: String,
    medicineNote: [
      {
        dispenseDay: Number,
        prescriptionDay: Number,
        oriId_s: String,
        medicine: [
          { name: String, number: Number, term: Number, doseTiming: String },
        ],
        oriId_d: String,
      },
    ],
    smoke: {
      isSmoke: Boolean,
      startSmoke: Number,
      smokePerDay: Number,
      smokeComment: String,
    },
    location: {
      zip_p: String,
      address1_p: String,
      address2_p: String,
    },
    contact: {
      phone_p: String,
      emergency_p: String,
    },
    allergy: [
      {
        allergen: String,
        allergyComment: String,
      },
    ],
    medicalRecord: [
      {
        writer: String,
        mi: String,
        latestUpdate: Number,
        createUpdate: Number,
        subjective: String,
        objective: String,
        assessment: String,
        plan: String,
        //   objectiveImg:[String],
        respiration: Number,
        bodyTemp: Number,
        systolicBP: Number,
        diastolicBP: Number,
        pulse: Number,
        consciousLevel: Number,
        consciousAdd: String,
      },
    ],
    reservation_p: [
      {
        reservationDate: Number,
        update: Number,
        oriId_m: String,
        department: String,
        miName: String,
      },
    ],
  },
  { collection: "patients" }
);

export default mongoose.models.Patient ||
  mongoose.model("Patient", patientSchema);
