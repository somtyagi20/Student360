import mongoose, { Schema } from "mongoose";

const placementSchema = new mongoose.Schema({
  company: {
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

export const Placement = mongoose.model("Placement", placementSchema);
