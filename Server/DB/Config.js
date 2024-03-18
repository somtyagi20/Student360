import mongoose from "mongoose";

const db = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/SRAS")
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log("DB Connection Error: " + err);
    });
};

export default db;
