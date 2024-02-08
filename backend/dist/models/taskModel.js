"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "title is a required field."]
    },
    description: {
        type: String
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
