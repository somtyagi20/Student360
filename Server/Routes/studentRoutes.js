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
  getMarks,
  refreshAccessToken,
  validateOTP,
  setNewPassword,
  getAcademicInfo,
  getInternship,
  getExtraCurricular,
  getProject,
  deleteProject,
  deleteExtraCurricular,
  uploadPlacementDetail,
  deleteInternship,
  deletePlacementDetail,
  getPlacementDetail,
} from "../Controllers/studentController.js";

//route implementation
router.route("/login").post(loginStudent);
router.route("/forgotPassword").post(forgotPassword);
router.route("/validateOTP").post(validateOTP);
router.route("/setNewPassword").post(verifyJWT, setNewPassword);

router
  .route("/updatePersonalDetails")
  .post(verifyJWT, upload.single("pass_photo"), updatePersonalDetails);

router
  .route("/updateHighSchoolDetails")
  .post(verifyJWT, updateHighSchoolDetails);

router
  .route("/updateIntermediateDetails")
  .post(verifyJWT, updateIntermediateDetails);

router
  .route("/updateGraduationDetails")
  .post(verifyJWT, upload.single("marksheet"), updateGraduationDetails);

router
  .route("/updateProfilePicture")
  .post(verifyJWT, upload.single("profile_pic"), updateProfilePicture);

router.route("/uploadProject").post(verifyJWT, upload.any(), uploadProject);

router.route("/updateProject").post(verifyJWT, upload.any(), updateProject);

router
  .route("/uploadInternship")
  .post(verifyJWT, upload.single("offerLetter"), uploadInternship);

router
  .route("/updateInternship")
  .post(verifyJWT, upload.single("offerLetter"), updateInternship);

router
  .route("/uploadExtraCurricular")
  .post(verifyJWT, upload.single("certificate"), uploadExtraCurricular);

router
  .route("/updateExtraCurricular")
  .post(verifyJWT, upload.single("certificate"), updateExtraCurricular);

router.route("/getUserDetails").get(verifyJWT, getUserDetails);
router.route("/getMarks").get(verifyJWT, getMarks);
router.route("/refreshAcessToken").post(refreshAccessToken);
router.route("/getAcademicInfo").get(verifyJWT, getAcademicInfo);
router.route("/getInternship").get(verifyJWT, getInternship);
router.route("/getExtraCurricular").get(verifyJWT, getExtraCurricular);
router.route("/getProject").get(verifyJWT, getProject);
router.route("/deleteProject").delete(verifyJWT, deleteProject);
router.route("/deleteExtraCurricular").delete(verifyJWT, deleteExtraCurricular);
router
  .route("/uploadPlacementDetail")
  .post(verifyJWT, upload.single("offerLetter"), uploadPlacementDetail);

router.route("/deleteInternship").delete(verifyJWT, deleteInternship);
router.route("/deletePlacement").delete(verifyJWT, deletePlacementDetail);
router.route("/getPlacement").get(verifyJWT, getPlacementDetail);

export default router;
