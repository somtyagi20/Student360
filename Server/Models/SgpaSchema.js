import mongoose from "mongoose";

const sgpaSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  current_semester: {
    type: Number,
    required: true,
  },
  sgpa: {
    type: Number,
    required: true,
  },
  marksheet: {
    type: String,
    required: true,
  },
});

export const Sgpa = mongoose.model("Sgpa", sgpaSchema);
