import express from "express";
import { isLoggedIn } from "../middlewares/auth";
import { newTask } from "../controllers/taskController";

const router = express.Router();

router.route("/new").post(isLoggedIn,newTask);

export default router;