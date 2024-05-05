import { Router } from "express";
import { verifyJWT } from "../Middlewares/authStudent.js";
import { upload } from "../Middlewares/multer.js";

const router = Router();

//import routes
import {
  loginStudent,
  forgotPassword,
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
  validateOTP,
  setNewPassword,
  getAcademicInfo,
  getInternship,
  getExtraCurricular,
  getProject,
} from "../Controllers/studentController.js";

//route implementation
router.route("/login").post(loginStudent);
router.route("/forgotPass").post(forgotPassword);
router.route("/validateOTP").post(validateOTP);
router.route("/setNewPassword").post(verifyJWT, setNewPassword);
router.route("/updatePersonalDetails").post(verifyJWT, updatePersonalDetails);

router
  .route("/updateHighSchoolDetails")
  .post(verifyJWT, updateHighSchoolDetails);

router
  .route("/updateIntermediateDetails")
  .post(verifyJWT, updateIntermediateDetails);

router
  .route("/updateGraduationDetails")
  .post(verifyJWT, updateGraduationDetails);

router
  .route("/updateProfilePicture")
  .post(verifyJWT, upload.single("profile_pic"), updateProfilePicture);

router.route("/uploadProject").post(verifyJWT, upload.any(), uploadProject);
router.route("/updateProject").post(verifyJWT, upload.any(), updateProject);
router.route("/uploadInternship").post(verifyJWT, uploadInternship);
router.route("/updateInternship").post(verifyJWT, updateInternship);

router
  .route("/uploadExtraCurricular")
  .post(verifyJWT, upload.single("certificate"), uploadExtraCurricular);

router
  .route("/updateExtraCurricular")
  .post(verifyJWT, upload.single("certificate"), updateExtraCurricular);

router.route("/getUserDetails").get(verifyJWT, getUserDetails);
router.route("/getMSTMarks").get(verifyJWT, getMSTMarks);
router.route("/refreshAcessToken").post(refreshAccessToken);
router.route("/getAcademicInfo").get(verifyJWT, getAcademicInfo);
router.route("/getInternship").get(verifyJWT, getInternship);
router.route("/getExtraCurricular").get(verifyJWT, getExtraCurricular);
router.route("/getProject").get(verifyJWT, getProject);

export default router;
