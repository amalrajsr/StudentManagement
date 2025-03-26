import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import AppError from "../utils/error"; // <-- your custom error class
import Task from "../models/task";

// Get tasks assigned to the current student
export const getMyTasks = asyncHandler(async (req: Request, res: Response) => {
  // `req.user` is populated by auth middleware; cast as any if not typed.
  const studentId = (req as any).user?._id;

  // Fetch tasks for the logged-in student
  const tasks = await Task.find({ assignedTo: studentId });

  // Check for overdue tasks and update their status
  const currentDate = new Date();
  const updatedTasks = await Promise.all(
    tasks.map(async (task) => {
      if (task.status === "pending" && task.dueDate < currentDate) {
        task.status = "overdue";
        await task.save();
      }
      return task;
    })
  );

  res.status(200).json({
    success: true,
    count: updatedTasks.length,
    data: updatedTasks,
  });
});

// Update task status (only for tasks assigned to the student)
export const updateTaskStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const { status } = req.body;
    const studentId = (req as any).user?._id;

    // Validate the requested status
    if (status !== "completed") {
      throw new AppError(400, "Students can only mark tasks as completed.");
    }

    // Find task assigned to this student
    const task = await Task.findOne({ _id: taskId, assignedTo: studentId });
    if (!task) {
      throw new AppError(404, "Task not found or not assigned to you.");
    }

    // Check if task is overdue
    const currentDate = new Date();
    if (task.dueDate < currentDate && task.status === "pending") {
      throw new AppError(400, "Cannot mark an overdue task as completed.");
    }

    // Update task status
    task.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      data: task,
    });
  }
);
