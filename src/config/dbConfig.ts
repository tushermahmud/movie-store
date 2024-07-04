// src/config.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("MongoDB connected");
  } catch (error: unknown) {
    console.error("MongoDB connection failed:", (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
