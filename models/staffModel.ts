import mongoose from "mongoose";
const Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    navListSave: [String],
    oriId_s: String,
    staffName: {
      name: String,
      hira: String,
    },
    miAffiliation: [
      {
        oriId_m: String,
        role: [String],
      },
    ],
    message: {
      content: String,
      update: Number,
    },
    workSpace: {
      mi: String,
      space: String,
    },
    lastLogin: Number,
    isLogin: Boolean,
  },
  { collection: "staff" }
);

export default mongoose.models.Staff || mongoose.model("Staff", staffSchema);
