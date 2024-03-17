import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  contact_no: {
    type: String,
  },
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

export const Parent = mongoose.model("Parent", parentSchema);
