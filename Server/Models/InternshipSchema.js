import mongoose, { Schema } from "mongoose";

const internshipSchema = new mongoose.Schema({
  organisation: {
    type: String,
    required: true,
  },
  Start_date: {
    type: Date,
    required: true,
  },
  End_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  offerLetter: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

export const Internship = mongoose.model("Internship", internshipSchema);
