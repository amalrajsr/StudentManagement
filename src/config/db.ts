import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connected successfully...");
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
