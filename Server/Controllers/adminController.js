import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { Admin } from "../Models/AdminSchema.js";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { Student } from "../Models/StudentSchema.js";
import { Faculty } from "../Models/FacultySchema.js";

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
  if (email.trim === "" || password.trim === "") {
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
    .json(new ApiResponse(200, { isOTPCorrect: true }, "OTP is correct"));
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
  if (user) {
    student = await Student.findById(req.query.id);
    return res
      .status(200)
      .json(new ApiResponse(200, student, "Student fetched successfully"));
  } else {
    throw new ApiError(400, "Not authorized to access this route");
  }
});

const getFaculty = asyncHandler(async (req, res) => {
  const user = await Admin.findById(req.user._id);
  let faculty;
  if (user) {
    faculty = await Faculty.findById(req.query.id);
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
};
