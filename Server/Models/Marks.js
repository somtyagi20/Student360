import mongoose, { Schema } from "mongoose";

const MarksSchema = new Schema(
  {
    year: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    title: {
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

export const Marks = mongoose.model("Mark", MarksSchema);
