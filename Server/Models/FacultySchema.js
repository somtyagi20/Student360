import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
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
  password: {
    type: String,
    required: true,
  },
  profile_pic: String,
  role: {
    type: String,
    required: true,
  },
});

export const Faculty = mongoose.model("Faculty", facultySchema);
