"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI is not defined in the environment variables");
        process.exit(1);
    }
    mongoose_1.default.connect(uri).then(() => {
        console.log("Connected to the database successfully");
    }).catch((error) => {
        console.error("Connection to the database failed");
        console.error(error);
        process.exit(1);
    });
};
exports.default = connectToDatabase;
