import mongoose from "mongoose";

const intermediateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  board_of_education: {
    type: String,
    required: true,
  },
  passing_year: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

export const Intermediate = mongoose.model("Intermediate", intermediateSchema);
