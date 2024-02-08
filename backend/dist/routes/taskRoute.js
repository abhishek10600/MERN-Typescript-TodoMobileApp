"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const taskController_1 = require("../controllers/taskController");
const router = express_1.default.Router();
router.route("/new").post(auth_1.isLoggedIn, taskController_1.newTask);
exports.default = router;
