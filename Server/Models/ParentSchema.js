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
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

export const Parent = mongoose.model("Parent", parentSchema);
