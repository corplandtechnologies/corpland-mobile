import mongoose from "mongoose";
import logger from "../logger";
import { DB_URL } from "../env";

const dbConnect = async () => {
  try {
    await mongoose.connect(DB_URL || "");
    logger.info("Connected to the database");
  } catch (error) {
    logger.info("Error connecting to the database", error);
  }
};

export default dbConnect;
