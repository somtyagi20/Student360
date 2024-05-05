import mongoose, { Schema } from "mongoose";

const MSTSchema = new Schema(
  {
    year: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    mst_no: {
      type: String,
      required: true,
    },
    subject: {
      type: Map,
      of: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  {
    timestamps: true,
  }
);

export const MST = mongoose.model("MST", MSTSchema);
