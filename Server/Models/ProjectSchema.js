import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  github_link: {
    type: String,
    required: true,
  },
  hosted_link: {
    type: String,
    required: true,
  },
  documentation: [
    {
      type: String,
      required: true,
    },
  ],
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

export const Project = mongoose.model("Project", projectSchema);
