import express from "express";
import connectDB from "./DB/Config.js";

const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
