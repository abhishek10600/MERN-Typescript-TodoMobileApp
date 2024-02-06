import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userController";
import { isLoggedIn } from "../middlewares/auth";

const router = express.Router();

router.route("/regitser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isLoggedIn,logoutUser);

export default router;