"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const createToken = async (res, user) => {
    try {
        const newToken = user.getJwtToken();
        if (user.token.length) {
            user.token.pop();
            const token = [{
                    token: newToken,
                    signedAt: Date.now().toString()
                }];
            user.token = token;
            await userModel_1.default.findByIdAndUpdate(user._id, { token });
        }
        else {
            const token = [{
                    token: newToken,
                    signedAt: Date.now().toString()
                }];
            await userModel_1.default.findByIdAndUpdate(user._id, { token });
        }
        user.password = undefined;
        user.token = undefined;
        res.status(200).json({
            success: true,
            token: newToken,
            user
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
exports.createToken = createToken;
