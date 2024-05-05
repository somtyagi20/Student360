import { ApiError } from "./apiError.js";
import { Student } from "../Models/StudentSchema.js";

export const generateAccessAndRefreshToken = async (_id) => {
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
