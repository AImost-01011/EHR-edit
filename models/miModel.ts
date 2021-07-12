import mongoose from "mongoose";
const Schema = mongoose.Schema;

const miSchema = new Schema(
  {
    miName: {
      name: String,
      hira: String,
    },
    oriId_m: String,
    email: String,
    location: {
      zip_m: String,
      address1_m: String,
      address2_m: String,
    },
    contact: {
      phone_m: String,
      fax_m: String,
      contactEmail: String,
    },
    businessContact: [
      {
        with: String,
        content: String,
        update: Number,
        isRead: Boolean,
        speaker: String,
      },
    ],
    notice_m: [
      {
        title: String,
        update: Number,
        content: String,
      },
    ],
    department: [String],
    reservation_m: [
      {
        reservationDate: Number,
        update: Number,
        oriId_p: String,
        department: String,
        isCome: Boolean,
        isInterviewed: Boolean,
      },
    ],
  },
  { collection: "MIs" }
);

export default mongoose.models.MI || mongoose.model("MI", miSchema);
