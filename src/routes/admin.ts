import express from "express";
import {
  addStudent,
  getAllStudents,
  assignTask,
  getAllTasks,
} from "../controllers/admin";
import { authenticate, authorizeAdmin } from "../middlewares/auth";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate, authorizeAdmin);

router.route("/students").post(addStudent).get(getAllStudents);
router.route("/tasks").post(assignTask).get(getAllTasks);

export default router;
