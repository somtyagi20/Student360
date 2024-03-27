import mongoose from "mongoose";

const sgpaSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  current_semester: {
    type: Number,
  },
  sgpa: {
    type: Number,
  },
});

export const Sgpa = mongoose.model("Sgpa", sgpaSchema);
