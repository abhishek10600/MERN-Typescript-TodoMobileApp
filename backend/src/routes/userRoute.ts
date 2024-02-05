import express from "express";
import { registerUser } from "../controllers/userController";

const router = express.Router();

router.route("/regitser").post(registerUser);

export default router;