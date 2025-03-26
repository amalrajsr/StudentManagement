import express from "express";
import { login } from "../controllers/auth";
import { validateLogin } from "../middlewares/validation";

const router = express.Router();

router.post("/login", validateLogin, login);

export default router;
