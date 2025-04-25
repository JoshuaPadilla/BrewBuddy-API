import httpServer from "./app.js"; // not app anymore
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB successfully connected");
});

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log(`BrewBuddy backend is running on port: ${port}`);
});
