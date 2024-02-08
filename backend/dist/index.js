"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    "path": "./.env"
});
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
(0, database_1.default)();
const port = process.env.PORT;
app_1.default.listen(port, () => {
    console.log(`App running on port ${port}`);
});
