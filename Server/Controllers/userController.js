import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Student } from "../Models/StudentSchema.js";

const generateAccessAndRefreshToken = async (_id) => {
  try {
    const user = await Student.findById(_id).select("-password");

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Access Token Generation Failed");
  }
};

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
  }).select("-password -refreshToken -__v -createdAt -updatedAt");

  console.log(accessToken, refreshToken);
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

export { loginStudent };
