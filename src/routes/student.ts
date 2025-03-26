import express from "express";
import { getMyTasks, updateTaskStatus } from "../controllers/student";
import { authenticate, authorizeStudent } from "../middlewares/auth";

const router = express.Router();

// All student routes require authentication and student role
router.use(authenticate, authorizeStudent);

router.get("/tasks", getMyTasks);
router.patch("/tasks/:taskId", updateTaskStatus);

export default router;
