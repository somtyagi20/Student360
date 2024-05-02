import { Router } from "express";

const router = Router();

//import routes
import { loginStudent } from "../Controllers/userController.js";

//route implementation
router.route("/login").post(loginStudent);

export default router;
