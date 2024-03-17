import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact_no: {
    type: String,
    required: true,
  },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

export const Parent = mongoose.model("Parent", parentSchema);
