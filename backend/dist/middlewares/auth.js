"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const isLoggedIn = async (req, res, next) => {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(402).json({
                success: false,
                message: "Login required."
            });
        }
        if (!jwtSecret) {
            throw new Error("secret key for jwt is not defined.");
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = await userModel_1.default.findById(decoded.id);
        next();
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};
exports.isLoggedIn = isLoggedIn;
