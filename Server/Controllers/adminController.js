import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { Admin } from "../Models/AdminSchema.js";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { Student } from "../Models/StudentSchema.js";
import { Faculty } from "../Models/FacultySchema.js";
import { UploadOnCloudinary } from "../Utils/cloudinary.js";
import { HighSchool } from "../Models/HighSchoolSchema.js";
import { Intermediate } from "../Models/IntermediateSchema.js";
import { Project } from "../Models/ProjectSchema.js";
import { ExtraCurricular } from "../Models/ExtraCurricularSchema.js";
import { Graduation } from "../Models/GraduationSchema.js";
import ExcelJS from "exceljs";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateAccessAndRefreshToken = async (_id) => {
  try {
    const user = await Admin.findById(_id).select("-password");

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Access Token Generation Failed");
  }
};

const loginAdmin = asyncHandler(async (req, res) => {
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

  const user = await Admin.findOne({
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

  const loggedInUser = await Admin.findOne({
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

  const user = await Admin.findOne({ email });
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

  const user = await Admin.findOne({
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

  const user = await Admin.findById(req.user._id);

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
  const user = await Admin.findById(req.user._id);
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
  const user = await Admin.findById(req.user._id);
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
  const user = await Admin.findById(req.user._id);
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

const getFaculty = asyncHandler(async (req, res) => {
  const user = await Admin.findById(req.user._id);
  let faculty;
  if (user) {
    faculty = await Faculty.find();
    return res
      .status(200)
      .json(new ApiResponse(200, faculty, "Faculty fetched successfully"));
  } else {
    throw new ApiError(400, "Not authorized to access this route");
  }
});

const giveAccess = asyncHandler(async (req, res) => {
  const user = await Admin.findById(req.user._id);
  if (user) {
    const faculty = await Faculty.findById(req.query.id);
    faculty.accessed_class.push(req.body.class);
    await faculty.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Access given successfully"));
  } else {
    throw new ApiError(400, "Not authorized to access this route");
  }
});

const updatePersonalDetails = asyncHandler(async (req, res) => {
  //get user id from req.user
  //get updated details from frontend
  //update user details
  //send response

  const { name, email } = req.body;
  const user = await Admin.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
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

  const user = await Admin.findByIdAndUpdate(req.user._id, {
    profile_pic: response.url,
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile picture updated successfully"));
});

const mailStudentsOfClass = asyncHandler(async (req, res) => {
  const { className, msg } = req.body;
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

const downloadStudentData = asyncHandler(async (req, res) => {
  const students = await Student.find({});
  const graduations = await Graduation.find({});
  const highSchools = await HighSchool.find({});
  const intermediates = await Intermediate.find({});
  const projects = await Project.find({});
  const extraCurriculars = await ExtraCurricular.find({});
  const marks = await Marks.find({});

  // Compile the data
  const studentsData = students.map((student) => {
    const studentId = student._id;
    return {
      student,
      highSchoolInfo: highSchools.find((info) =>
        info.student.equals(studentId)
      ),
      intermediateInfo: intermediates.find((info) =>
        info.student.equals(studentId)
      ),
      graduationInfo: graduations.find((info) =>
        info.student.equals(studentId)
      ),
      projectsInfo: projects.filter((info) => info.student.equals(studentId)),
      extraCurricularsInfo: extraCurriculars.filter((info) =>
        info.student.equals(studentId)
      ),
      marksInfo: marks.filter((info) => info.student.equals(studentId)),
    };
  });

  // Create an Excel file
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Students Data");

  // Add headers
  worksheet.columns = [
    { header: "Name", key: "name" },
    { header: "Enrollment No", key: "enrollment_no" },
    { header: "Email", key: "email" },
    { header: "High School", key: "highSchool" },
    { header: "High School Percentage", key: "highSchoolPercentage" },
    { header: "Intermediate School", key: "intermediateSchool" },
    { header: "Intermediate Percentage", key: "intermediatePercentage" },
    { header: "Graduation CGPA", key: "cgpa" },
    { header: "Projects", key: "projects" },
    { header: "Extra Curriculars", key: "extraCurriculars" },
  ];

  // Add rows for each student
  studentsData.forEach((studentData) => {
    worksheet.addRow({
      name: studentData.student.name,
      enrollment_no: studentData.student.enrollment_no,
      email: studentData.student.email,
      highSchool: studentData.highSchoolInfo?.name || "",
      highSchoolPercentage: studentData.highSchoolInfo?.percentage || "",
      intermediateSchool: studentData.intermediateInfo?.name || "",
      intermediatePercentage: studentData.intermediateInfo?.percentage || "",
      cgpa: studentData.graduationInfo?.cgpa || "",
      projects: studentData.projectsInfo
        .map((project) => project.title)
        .join(", "),
      extraCurriculars: studentData.extraCurricularsInfo
        .map((activity) => activity.title)
        .join(", "),
    });
  });

  // const filePath = path.resolve(__dirname, "students_data.xlsx");
  // await workbook.xlsx.writeFile(filePath);

  // Generate the buffer
  const excelBuffer = await workbook.xlsx.writeBuffer();

  // Send the buffer as a downloadable file
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=students_data.xlsx"
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.send(excelBuffer);
});

const filteredStudentData = asyncHandler(async (req, res) => {
  const { students } = req.body;

  // Compile the data
  const studentsDataPromises = students.map(async (studentId) => {
    const student = await Student.findById(studentId);
    const graduations = await Graduation.find({ student: studentId });
    const highSchools = await HighSchool.find({ student: studentId });
    const intermediates = await Intermediate.find({ student: studentId });
    const projects = await Project.find({ student: studentId });
    const extraCurriculars = await ExtraCurricular.find({ student: studentId });

    return {
      student,
      highSchools,
      intermediates,
      graduations,
      projects,
      extraCurriculars,
    };
  });
  const studentsData = await Promise.all(studentsDataPromises);
  console.log(JSON.stringify(studentsData, null, 2));
  // Create an Excel file
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Students Data");

  // Add headers
  worksheet.columns = [
    { header: "Name", key: "name" },
    { header: "Enrollment No", key: "enrollment_no" },
    { header: "Email", key: "email" },
    { header: "High School", key: "highSchool" },
    { header: "High School Percentage", key: "highSchoolPercentage" },
    { header: "Intermediate School", key: "intermediateSchool" },
    { header: "Intermediate Percentage", key: "intermediatePercentage" },
    { header: "Graduation CGPA", key: "cgpa" },
    { header: "Projects", key: "projects" },
    { header: "Extra Curriculars", key: "extraCurriculars" },
  ];

  // Add rows for each student
  studentsData.forEach((studentData) => {
    worksheet.addRow({
      name: studentData.student.name,
      enrollment_no: studentData.student.enrollment_no,
      email: studentData.student.email,
      highSchool: studentData.highSchools[0]?.name || "",
      highSchoolPercentage: studentData.highSchools[0]?.percentage || "",
      intermediateSchool: studentData.intermediates[0]?.name || "",
      intermediatePercentage: studentData.intermediates[0]?.percentage || "",
      cgpa: studentData.graduations[0]?.cgpa || "",
      projects: studentData.projects.map((project) => project.title).join(", "),
      extraCurriculars: studentData.extraCurriculars
        .map((activity) => activity.title)
        .join(", "),
    });
  });

  // const filePath = path.resolve(__dirname, "students_data.xlsx");
  // await workbook.xlsx.writeFile(filePath);

  // Generate the buffer
  const excelBuffer = await workbook.xlsx.writeBuffer();

  // Send the buffer as a downloadable file
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=students_data.xlsx"
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.send(excelBuffer);
});

export {
  loginAdmin,
  forgotPassword,
  validateOTP,
  setNewPassword,
  getClasses,
  studentsByClass,
  getStudent,
  getFaculty,
  giveAccess,
  updatePersonalDetails,
  updateProfilePicture,
  mailStudentsOfClass,
  downloadStudentData,
  filteredStudentData,
};
