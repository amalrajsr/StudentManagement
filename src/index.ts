import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth";
import studentRoutes from "./routes/student";
import adminRoutes from "./routes/admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7899;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/students", studentRoutes);

//404 endpoint
app.use("*", (req, res) => {
  res.json({ message: "Invalid Endpoint" });
});
// Error handling middleware
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
