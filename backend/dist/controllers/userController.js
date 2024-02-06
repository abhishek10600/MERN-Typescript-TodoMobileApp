"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createToken_1 = require("../utils/createToken");
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
        (0, createToken_1.createToken)(res, user);
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
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
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
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }
        const isPasswordValidated = user.isPasswordValidated(password);
        if (!isPasswordValidated) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }
        (0, createToken_1.createToken)(res, user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res, next) => {
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const userId = req.user._id;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Authorization failed."
                });
            }
            const setToken = [];
            await userModel_1.default.findByIdAndUpdate(userId, { token: setToken });
            res.status(200).json({
                success: true,
                message: "Logged out succesfully."
            });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: true,
            message: "Internal server error."
        });
    }
};
exports.logoutUser = logoutUser;
