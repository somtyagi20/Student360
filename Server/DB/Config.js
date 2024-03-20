import "dotenv/config";
import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const db = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_Name}`
    );
    console.log(`Database Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Database Connection Error: ", error);
    process.exit(1);
  }
};

export default db;
