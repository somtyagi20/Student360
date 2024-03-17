import mongoose from "mongoose";

const db = mongoose
  .connect("mongodb://localhost:27017/SRAS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connection Error: " + err);
  });

export default db;
