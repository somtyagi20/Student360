import "dotenv/config";
import connectDB from "./DB/Config.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
    app.on("error", (err) => {
      console.log("Error in starting server: ", err);
    });
  })
  .catch((err) => {
    console.log("Error in connecting to DB: ", err);
  });
