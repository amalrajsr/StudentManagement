import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import AppError from "../utils/error";
import User from "../models/student";
import Task from "../models/task";

// Add a new student
export const addStudent = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, department, password } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(400, "Email already in use.");
  }

  // Create new student
  const student = await new User({
    name,
    email,
    department,
    password,
    role: "student",
  }).save();

  res.status(201).json({
    success: true,
    message: "Student added successfully.",
    data: {
      id: student._id,
      name: student.name,
      email: student.email,
      department: student.department,
      role: student.role,
    },
  });
});

// Get all students
export const getAllStudents = asyncHandler(
  async (req: Request, res: Response) => {
    const students = await User.find(
      { role: "student" },
      { password: 0, __v: 0 }
    );

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  }
);

// Assign task to student
export const assignTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, assignedTo, dueDate } = req.body;

  // Validate student existence
  const student = await User.findOne({ _id: assignedTo, role: "student" });
  if (!student) {
    throw new AppError(404, "Student not found.");
  }

  // Create task
  const task = await new Task({
    title,
    description,
    assignedTo,
    dueDate: new Date(dueDate),
  }).save();

  res.status(201).json({
    success: true,
    message: "Task assigned successfully.",
    data: task,
  });
});

// Get all tasks
export const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await Task.find().populate(
    "assignedTo",
    "name email department"
  );

  res.status(200).json({
    success: true,
    data: tasks,
  });
});
