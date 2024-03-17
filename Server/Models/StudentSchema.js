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
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic: {
    type: String,
  },
  department: {
    type: String,
  },
  dob: {
    type: Date,
  },
  class: {
    type: String,
  },
  current_address: {
    type: String,
  },
  permanent_address: {
    type: String,
  },
  career_goals: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);
