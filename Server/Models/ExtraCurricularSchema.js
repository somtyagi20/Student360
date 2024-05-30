import mongoose from "mongoose";

const extraCurricularSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  },
  issue_date: {
    type: Date,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  category: {
    type: String,
    required: true,
  },
});

export const ExtraCurricular = mongoose.model(
  "ExtraCurricular",
  extraCurricularSchema
);
