import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { Student } from "../Models/StudentSchema.js";
import { HighSchool } from "../Models/HighSchoolSchema.js";
import { Intermediate } from "../Models/IntermediateSchema.js";
import { Graduation } from "../Models/GraduationSchema.js";
import { Sgpa } from "../Models/SgpaSchema.js";
import { Internship } from "../Models/InternshipSchema.js";
import { Project } from "../Models/ProjectSchema.js";
import { ExtraCurricular } from "../Models/ExtraCurricularSchema.js";
import { MST } from "../Models/MST.js";
import { UploadOnCloudinary } from "../Utils/cloudinary.js";
import { generateAccessAndRefreshToken } from "../Utils/generateAccessToken.js";
import JWT from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

const loginStudent = asyncHandler(async (req, res) => {
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

  const user = await Student.findOne({
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

  const loggedInUser = await Student.findOne({
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
  // Get email from frontend
  const { email } = req.body;
  if (!email || email.trim() === "") {
    throw new ApiError(400, "Email is required");
  }

  // Search user by email in the database
  const user = await Student.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  // Generate a random OTP
  const otp = uuidv4().substring(0, 6); // Generating a 6-digit OTP

  // Save the OTP and its expiration time in the user document
  user.resetPasswordToken = otp;
  user.resetPasswordTokenExpires = Date.now() + 600000; // 10 minutes in milliseconds
  await user.save({ validateBeforeSave: false });

  // Send OTP via email
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

  const user = await Student.findOne({
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
  //get email, otp and new password from frontend
  //validate email, otp and password
  //search user by email in db
  //match otp
  //update password
  //send response

  const { newPassword } = req.body;
  if (newPassword.trim() === "") {
    throw new ApiError(400, "Email and password is required");
  }

  const user = await Student.findById(req.user._id);

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

const updatePersonalDetails = asyncHandler(async (req, res) => {
  //get user id from req.user
  //get updated details from frontend
  //update user details
  //send response

  const {
    name,
    email,
    contact_no,
    department,
    dob,
    studentClass,
    current_address,
    permanent_address,
    career_goals,
    skills,
  } = req.body;
  const user = await Student.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
      contact_no,
      department,
      dob,
      class: studentClass,
      current_address,
      permanent_address,
      career_goals,
      skills,
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details updated successfully"));
});

const updateHighSchoolDetails = asyncHandler(async (req, res) => {
  //get user id from req.user
  //get updated details from frontend
  //update user details
  //send response

  const { name, address, board_of_education, passing_year, percentage } =
    req.body;

  const highSchool = await HighSchool.findOne({ student: req.user._id });
  let updatedDetails;
  if (!highSchool) {
    updatedDetails = await HighSchool.create({
      name,
      address,
      board_of_education,
      passing_year,
      percentage,
      student: req.user._id,
    });
  } else {
    updatedDetails = await HighSchool.findByIdAndUpdate(
      highSchool._id,
      {
        name,
        address,
        board_of_education,
        passing_year,
        percentage,
      },
      { new: true }
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedDetails,
        "High school details updated successfully"
      )
    );
});

const updateIntermediateDetails = asyncHandler(async (req, res) => {
  //get user id from req.user
  //get updated details from frontend
  //update user details
  //send response

  const { name, address, board_of_education, passing_year, percentage } =
    req.body;

  const intermediate = await Intermediate.findOne({ student: req.user._id });
  let updatedDetails;
  if (!intermediate) {
    updatedDetails = await Intermediate.create({
      name,
      address,
      board_of_education,
      passing_year,
      percentage,
      student: req.user._id,
    });
  } else {
    updatedDetails = await Intermediate.findByIdAndUpdate(
      intermediate._id,
      {
        name,
        address,
        board_of_education,
        passing_year,
        percentage,
      },
      { new: true }
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedDetails,
        "Intermediate details updated successfully"
      )
    );
});

const updateGraduationDetails = asyncHandler(async (req, res) => {
  //get user id from req.user
  //get updated details from frontend
  //update user details
  //send response

  const { current_year, cgpa, current_semester, sgpa } = req.body;

  // Find SGPA details for the user
  const sgpaDB = await Sgpa.find({ student: req.user._id });
  let createdSgpa;

  // If SGPA details don't exist, create them
  if (
    !sgpaDB[0] ||
    !sgpaDB.some((sgpa) => sgpa.current_semester === current_semester)
  ) {
    createdSgpa = await Sgpa.create({
      current_semester,
      sgpa,
      student: req.user._id,
    });
  } else if (
    sgpaDB.some((sgpa) => sgpa.current_semester === current_semester)
  ) {
    // If SGPA details exist, update them
    const id = sgpaDB.find(
      (sgpa) => sgpa.current_semester === current_semester
    )._id;
    createdSgpa = await Sgpa.findByIdAndUpdate(
      id,
      {
        current_semester,
        sgpa,
      },
      { new: true }
    );
  }

  // Find graduation details for the user
  const graduation = await Graduation.findOne({ student: req.user._id });
  let updatedDetails;

  // If graduation details don't exist, create them
  if (!graduation) {
    updatedDetails = await Graduation.create({
      current_year,
      cgpa,
      sgpa: [createdSgpa._id],
      student: req.user._id,
    });
  } else {
    // If graduation details exist, update them
    updatedDetails = await Graduation.findByIdAndUpdate(
      graduation._id,
      {
        $set: {
          current_year,
          cgpa,
        },
        $addToSet: { sgpa: createdSgpa._id },
      },
      { new: true }
    );
  }

  // Send response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedDetails,
        "Graduation details updated successfully"
      )
    );
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

  const user = await Student.findByIdAndUpdate(req.user._id, {
    profile_pic: response.url,
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile picture updated successfully"));
});

const uploadProject = asyncHandler(async (req, res) => {
  const { title, description, github_link, hosted_link } = req.body;

  const documentation = req.files?.map((file) => file.path);
  const documentURL = await Promise.all(
    documentation.map(async (doc) => {
      const res = await UploadOnCloudinary(doc);
      return res.url;
    })
  );

  const project = await Project.create({
    title,
    description,
    github_link,
    hosted_link,
    documentation: documentURL,
    student: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project uploaded successfully"));
});

const updateProject = asyncHandler(async (req, res) => {
  //get user id from req.user
  //get project details from frontend
  //update project details
  //send response
  const { title, description, github_link, hosted_link } = req.body;

  const projectId = req.query.id;
  if (!projectId) throw new ApiError(400, "Project Id is required");

  const documentation = req.files?.map((file) => file.path);
  const documentURL = await Promise.all(
    documentation.map(async (doc) => {
      const res = await UploadOnCloudinary(doc);
      return res.url;
    })
  );

  const project = await Project.findByIdAndUpdate(
    projectId,
    {
      title,
      description,
      github_link,
      hosted_link,
      documentation: documentURL,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated successfully"));
});

const uploadInternship = asyncHandler(async (req, res) => {
  //get user id from req.user
  //get internship details from frontend
  //upload internship details
  //send response
  const { organisation, Start_date, End_date, description } = req.body;

  const internship = await Internship.create({
    organisation,
    Start_date,
    End_date,
    description,
    student: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, internship, "Internship uploaded successfully"));
});

const updateInternship = asyncHandler(async (req, res) => {
  //get user id from req.user
  //get internship details from frontend
  //update internship details
  //send response
  const { organisation, Start_date, End_date, description } = req.body;
  const internshipId = req.query.id;

  const internship = await Internship.findByIdAndUpdate(
    internshipId,
    {
      organisation,
      Start_date,
      End_date,
      description,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, internship, "Internship updated successfully"));
});

const uploadExtraCurricular = asyncHandler(async (req, res) => {
  const { title, issue_date } = req.body;

  const certificateUrl = req.file?.path;
  if (!certificateUrl) {
    throw new ApiError(401, "Certificate is required");
  }

  const response = await UploadOnCloudinary(certificateUrl);

  const extraCurricular = await ExtraCurricular.create({
    title,
    certificate: response.url,
    issue_date,
    student: req.user._id,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        extraCurricular,
        "Extra curricular uploaded successfully"
      )
    );
});

const updateExtraCurricular = asyncHandler(async (req, res) => {
  const { title, issue_date } = req.body;
  const activityId = req.query.id;

  const certificateUrl = req.file?.path;
  if (!certificateUrl) {
    throw new ApiError(401, "Certificate is required");
  }

  const response = await UploadOnCloudinary(certificateUrl);

  const extraCurricular = await ExtraCurricular.findByIdAndUpdate(
    activityId,
    {
      title,
      certificate: response.url,
      issue_date,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        extraCurricular,
        "Extra curricular updated successfully"
      )
    );
});

const getUserDetails = asyncHandler(async (req, res) => {
  const user = await Student.findById(req.user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json(new ApiResponse(200, user, "User details"));
});

const getMSTMarks = asyncHandler(async (req, res) => {
  const mstMarks = await MST.find({ student: req.user._id });

  return res.status(200).json(new ApiResponse(200, mstMarks, "User details"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "refresh Token unavailable");
  }

  const decodedToken = JWT.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await Student.findById(decodedToken._id).select("-password");

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "refresh token is expired or used");
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
      new ApiResponse(200, "access token refreshed successfully", {
        accessToken,
        refreshToken,
      })
    );
});

const getAcademicInfo = asyncHandler(async (req, res) => {
  const user = await Student.findById(req.user._id).select(
    "-password -refreshToken"
  );

  if (!user) throw new ApiError(400, "User not found");

  const highSchool = await HighSchool.findOne({ student: req.user._id });

  const intermediate = await Intermediate.findOne({ student: req.user._id });

  const graduation = await Graduation.findOne({ student: req.user._id });

  const sgpa = await Sgpa.find({ student: req.user._id });

  return res.status(200).json(
    new ApiResponse(200, {
      user,
      highSchool,
      intermediate,
      graduation,
      sgpa,
    })
  );
});

const getInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.find({ student: req.user._id });
  if (!internship) {
    throw new ApiError(400, "Internship details not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, internship, "Internship details"));
});

const getExtraCurricular = asyncHandler(async (req, res) => {
  const extraCurricular = await ExtraCurricular.find({ student: req.user._id });
  if (!extraCurricular) {
    throw new ApiError(400, "Extra curricular details not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, extraCurricular, "Extra curricular details"));
});

const getProject = asyncHandler(async (req, res) => {
  const project = await Project.find({ student: req.user._id });
  if (!project) {
    throw new ApiError(400, "Project details not found");
  }

  return res.status(200).json(new ApiResponse(200, project, "Project details"));
});

export {
  loginStudent,
  forgotPassword,
  validateOTP,
  setNewPassword,
  updatePersonalDetails,
  updateHighSchoolDetails,
  updateIntermediateDetails,
  updateGraduationDetails,
  updateProfilePicture,
  uploadProject,
  updateProject,
  uploadInternship,
  updateInternship,
  uploadExtraCurricular,
  updateExtraCurricular,
  getUserDetails,
  getMSTMarks,
  refreshAccessToken,
  getAcademicInfo,
  getInternship,
  getExtraCurricular,
  getProject,
};
