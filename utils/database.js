import mongoose from "mongoose";
import logger from "./logger.js";
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    logger.info("MongoDB is Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    logger.info("MongoDB is Connected");
  } catch (error) {
    logger.error(error);
  }
};
