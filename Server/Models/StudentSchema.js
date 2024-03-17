import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  enrollment_no: {
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
  department: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  current_address: {
    type: String,
    required: true,
  },
  permanent_address: {
    type: String,
    required: true,
  },
  career_goals: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  role: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);
