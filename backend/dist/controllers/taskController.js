"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTask = void 0;
const taskModel_1 = __importDefault(require("../models/taskModel"));
const newTask = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "title is missing."
            });
        }
        const task = await taskModel_1.default.create({
            title,
            description,
            user: userId
        });
        res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};
exports.newTask = newTask;
