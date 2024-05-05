import { Router } from "express";
import {
  loginAdmin,
  forgotPassword,
  validateOTP,
  setNewPassword,
} from "../Controllers/adminController.js";
import { verifyJWT } from "../Middlewares/authAdmin.js ";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/forgotpassword").post(forgotPassword);
router.route("/validateotp").post(validateOTP);
router.route("/setnewpassword").post(verifyJWT, setNewPassword);

export default router;
