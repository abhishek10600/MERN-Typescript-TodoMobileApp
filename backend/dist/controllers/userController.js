"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name is missing."
            });
        }
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "email is missing."
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "password is missing."
            });
        }
        let user = await userModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists."
            });
        }
        user = await userModel_1.default.create({
            name,
            email,
            password
        });
        user.password = undefined;
        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            user
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};
exports.registerUser = registerUser;
