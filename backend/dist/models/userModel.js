"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is a required field."]
    },
    email: {
        type: String,
        required: [true, "email is a required field."],
        validate: [validator_1.default.isEmail, "enter a valid email."]
    },
    password: {
        type: String,
        required: [true, "password is a required field."],
        minLength: [5, "password must contain atleast 5 characters."]
    },
    token: [
        {
            type: Object
        }
    ]
}, {
    timestamps: true
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcryptjs_1.default.hash(this.password, 10);
});
userSchema.methods.isPasswordValidated = function (password) {
    return bcryptjs_1.default.compare(password, this.password);
};
userSchema.methods.getJwtToken = function () {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jsonwebtoken_1.default.sign({ id: this._id }, jwtSecret);
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
