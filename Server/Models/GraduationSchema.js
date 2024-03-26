import mongoose from "mongoose";

const graduationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  current_year: {
    type: Number,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
  sgpa: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sgpa",
    },
  ],
});

export const Graduation = mongoose.model("Graduation", graduationSchema);
