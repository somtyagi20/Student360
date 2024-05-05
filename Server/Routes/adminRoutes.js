import { Router } from "express";
import {
  loginAdmin,
  forgotPassword,
  validateOTP,
  setNewPassword,
  getClasses,
  studentsByClass,
  getStudent,
  getFaculty,
  giveAccess,
} from "../Controllers/adminController.js";
import { verifyJWT } from "../Middlewares/authAdmin.js ";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/forgotpassword").post(forgotPassword);
router.route("/validateotp").post(validateOTP);
router.route("/setnewpassword").post(verifyJWT, setNewPassword);
router.route("/getclasses").get(verifyJWT, getClasses);
router.route("/studentsbyclass").get(verifyJWT, studentsByClass);
router.route("/getstudent").get(verifyJWT, getStudent);
router.route("/getfaculty").get(verifyJWT, getFaculty);
router.route("/giveaccess").post(verifyJWT, giveAccess);

export default router;
