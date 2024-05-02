import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/user.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api/v1/student", userRoutes);

export { app };
