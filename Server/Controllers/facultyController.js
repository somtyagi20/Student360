import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { Student } from "../Models/StudentSchema.js";
import { Graduation } from "../Models/GraduationSchema.js";
import { Faculty } from "../Models/FacultySchema.js";
import { HighSchool } from "../Models/HighSchoolSchema.js";
import { Intermediate } from "../Models/IntermediateSchema.js";
import { Project } from "../Models/ProjectSchema.js";
import { ExtraCurricular } from "../Models/ExtraCurricularSchema.js";
import { UploadOnCloudinary } from "../Utils/cloudinary.js";
import { Marks } from "../Models/Marks.js";
import ExcelJS from "exceljs";
import XLSX from "xlsx";
import fs from "fs";

const generateAccessAndRefreshToken = async (_id) => {
  try {
    const user = await Faculty.findById(_id).select("-password");
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Access Token Generation Failed");
  }
};

const loginFaculty = asyncHandler(async (req, res) => {
  //get email and password from frontend
  //validate email and password
  //search user by email in db
  //match password
  //generate Access and refresh Token
  //send response

  const { email, password } = req.body;
  if (email.trim() === "" || password.trim() === "") {
    throw new ApiError(400, "Username and password is required");
  }

  const user = await Faculty.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new ApiError(400, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await Faculty.findOne({
    email,
  }).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          loggedInUser,
          accessToken,
        },
        "user logged in successfully"
      )
    );
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email || email.trim() === "") {
    throw new ApiError(400, "Email is required");
  }

  const user = await Faculty.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const otp = uuidv4().substring(0, 6); // Generating a 6-digit OTP

  user.resetPasswordToken = otp;
  user.resetPasswordTokenExpires = Date.now() + 600000; // 10 minutes in milliseconds
  await user.save({ validateBeforeSave: false });

  const subject = "Reset Password";
  const text = `Your OTP to reset password is ${otp}`;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new ApiError(400, "Email could not be sent");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, null, "OTP sent to your email"));
    }
  });
});

const validateOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (email.trim() === "" || otp.trim() === "") {
    throw new ApiError(400, "Email and OTP is required");
  }

  const user = await Faculty.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  if (user.resetPasswordToken !== otp) {
    return res
      .status(200)
      .json(new ApiResponse(400, { isOTPCorrect: false }, "OTP is incorrect"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { isOTPCorrect: true, accessToken },
        "OTP is correct"
      )
    );
});

const setNewPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  if (newPassword.trim() === "") {
    throw new ApiError(400, "password is required");
  }

  const user = await Faculty.findById(req.user._id);

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  user.password = newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordTokenExpires = null;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully"));
});

const getClasses = asyncHandler(async (req, res) => {
  const user = await Faculty.findById(req.user._id);
  let classes;
  if (user) {
    classes = await Student.distinct("class");
    return res
      .status(200)
      .json(new ApiResponse(200, classes, "Classes fetched successfully"));
  } else {
    throw new ApiError(400, "Not authorized to access this route");
  }
});

const studentsByClass = asyncHandler(async (req, res) => {
  const user = await Faculty.findById(req.user._id);
  let students;
  if (user) {
    students = await Student.find({ class: req.query.class });
    return res
      .status(200)
      .json(new ApiResponse(200, students, "Students fetched successfully"));
  } else {
    throw new ApiError(400, "Not authorized to access this route");
  }
});

const getStudent = asyncHandler(async (req, res) => {
  const user = await Faculty.findById(req.user._id);
  let student;
  let highSchool;
  let intermediate;
  let project;
  let extracurricularActivity;
  let graduation;

  highSchool = await HighSchool.findOne({
    student: req.query.id,
  });
  intermediate = await Intermediate.findOne({
    student: req.query.id,
  });
  project = await Project.find({
    student: req.query.id,
  });
  extracurricularActivity = await ExtraCurricular.find({
    student: req.query.id,
  });
  graduation = await Graduation.findOne({
    student: req.query.id,
  });

  if (user) {
    student = await Student.findById(req.query.id);
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          student,
          highSchool,
          intermediate,
          project,
          extracurricularActivity,
          graduation,
        },
        "Student fetched successfully"
      )
    );
  } else {
    throw new ApiError(400, "Not authorized to access this route");
  }
});

const updatePersonalDetails = asyncHandler(async (req, res) => {
  console.log(req.user._id);

  const { name, email, department, contact_no } = req.body;
  if (
    name.trim() === "" ||
    email.trim() === "" ||
    department.trim() === "" ||
    contact_no.trim() === ""
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await Faculty.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
      department,
      contact_no,
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details updated successfully"));
});

const updateProfilePicture = asyncHandler(async (req, res) => {
  const fileUrl = req.file?.path;
  if (!fileUrl) {
    throw new ApiError(401, "Profile picture is required");
  }

  const response = await UploadOnCloudinary(fileUrl);
  if (!response) {
    throw new ApiError(500, "Profile picture upload failed");
  }

  const user = await Faculty.findByIdAndUpdate(req.user._id, {
    profile_pic: response.url,
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile picture updated successfully"));
});

const downloadStudentData = asyncHandler(async (req, res) => {
  const students = await Student.find({ class: req.query.class });
  if (students.length === 0) {
    throw new ApiError(400, "No students found");
  }
  const highSchools = await HighSchool.find({
    student: { $in: students.map((s) => s._id) },
  });
  const intermediates = await Intermediate.find({
    student: { $in: students.map((s) => s._id) },
  });
  const projects = await Project.find({
    student: { $in: students.map((s) => s._id) },
  });
  const extracurricularActivities = await ExtraCurricular.find({
    student: { $in: students.map((s) => s._id) },
  });

  const mergedData = students.map((student) => {
    const highSchool = highSchools.find((h) => h.student.equals(student._id));
    const intermediate = intermediates.find((i) =>
      i.student.equals(student._id)
    );
    const project = projects.find((p) => p.student.equals(student._id));
    const extracurricularActivity = extracurricularActivities.find((e) =>
      e.student.equals(student._id)
    );

    return {
      ...student.toObject(),
      ...(highSchool ? highSchool.toObject() : {}),
      ...(intermediate ? intermediate.toObject() : {}),
      ...(project ? project.toObject() : {}),
      ...(extracurricularActivity ? extracurricularActivity.toObject() : {}),
    };
  });

  console.log(mergedData);

  const fields = [
    "name",
    "enrollment_no",
    "email",
    "contact_no",
    "class",
    "current_address",
    "permanent_address",
    "career_goals",
    "skills",
    "dob",
    "highSchool.name",
    "highSchool.address",
    "highSchool.board_of_education",
    "highSchool.passing_year",
    "highSchool.percentage",
    "intermediate.name",
    "intermediate.address",
    "intermediate.board_of_education",
    "intermediate.passing_year",
    "intermediate.percentage",
    "project.title",
    "project.description",
    "project.technologies",
    "extracurricularActivity.title",
    "extracurricularActivity.issue_date",
    "extracurricularActivity.certificate",
  ];

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Students");

  // Define columns
  const columns = fields.map((field) => {
    return { header: field, key: field };
  });

  worksheet.columns = columns;

  // Add rows
  mergedData.forEach((data) => {
    worksheet.addRow(data);
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");

  await workbook.xlsx.writeFile("students.xlsx");
  return res.status(200).end();
});

const uploadMarks = asyncHandler(async (req, res) => {
  const fileUrl = req.file?.path;
  if (!fileUrl) {
    throw new ApiError(401, "File is required");
  }
  const { category, title } = req.body;
  // Read the Excel file
  const workbook = XLSX.readFile(fileUrl);

  // Get the first worksheet (or replace 'Sheet1' with the name of the worksheet you want to convert)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert the worksheet data to JSON
  // Assume jsonData is the array of JSON objects
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  for (let data of jsonData) {
    const marks = new Marks({
      year: data.year.toString(),
      semester: data.semester.toString(),
      category,
      title,
      student: await Student.findOne({ enrollment_no: data.enrollment_no })._id,
    });

    // Create the subject map
    const subjectMap = new Map();
    for (let key in data) {
      if (key !== "year" && key !== "semester" && key !== "enrollment_no") {
        subjectMap.set(key, data[key].toString());
      }
    }
    marks.subject = subjectMap;
    await mst.save();
  }

  fs.unlinkSync(fileUrl);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Marks uploaded successfully"));
});

const mailStudentsOfClass = asyncHandler(async (req, res) => {
  const { class: className, msg } = req.body;
  if (!className) {
    throw new ApiError(400, "Class is required");
  }

  const students = await Student.find({ class: className });

  if (students.length === 0) {
    throw new ApiError(400, "No students found for the given class");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailPromises = students.map((student) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: "Reminder: Please Update Your Details",
      text: msg,
    };

    return transporter.sendMail(mailOptions);
  });

  await Promise.all(mailPromises);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Emails sent to students successfully"));
});

export {
  loginFaculty,
  forgotPassword,
  validateOTP,
  setNewPassword,
  getClasses,
  studentsByClass,
  getStudent,
  updatePersonalDetails,
  updateProfilePicture,
  downloadStudentData,
  mailStudentsOfClass,
  uploadMarks,
};
