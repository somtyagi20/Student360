import { Router } from "express";
import {
  loginAdmin,
  forgotPassword,
  validateOTP,
  setNewPassword,
  getClasses,
  studentsByClass,
  getStudent,
} from "../Controllers/adminController.js";
import { verifyJWT } from "../Middlewares/authFaculty.js";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/forgotpassword").post(forgotPassword);
router.route("/validateotp").post(validateOTP);
router.route("/setnewpassword").post(verifyJWT, setNewPassword);
router.route("/getclasses").get(verifyJWT, getClasses);
router.route("/studentsbyclass").get(verifyJWT, studentsByClass);
router.route("/getstudent").get(verifyJWT, getStudent);

export default router;
