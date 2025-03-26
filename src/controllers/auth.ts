import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import AppError from "../utils/error";
import User from "../models/student";
import createToken from "../utils/createToken";

// Login controller
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new AppError(400, "Please provide email and password.");
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(401, "Invalid credentials.");
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError(401, "Invalid credentials.");
  }

  // Generate token using the utility function
  const token = createToken({ id: user._id.toString(), role: user.role });

  res.json({
    success: true,
    message: "Login successful.",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
      token,
    },
  });
});
