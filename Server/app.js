import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/studentRoutes.js";
import facultyRoutes from "./Routes/facultyRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/student", userRoutes);
app.use("/api/v1/faculty", facultyRoutes);
app.use("/api/v1/admin", adminRoutes);

export { app };
