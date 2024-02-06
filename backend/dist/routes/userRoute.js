"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.route("/regitser").post(userController_1.registerUser);
router.route("/login").post(userController_1.loginUser);
router.route("/logout").get(auth_1.isLoggedIn, userController_1.logoutUser);
exports.default = router;
