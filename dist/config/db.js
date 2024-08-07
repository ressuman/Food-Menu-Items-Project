"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const isError = (error) => {
    return error instanceof Error;
};
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        if (isError(error)) {
            console.error(`MongoDB connection error: ${error.message}`);
        }
        else {
            console.error("Unknown error");
        }
        process.exit(1);
    }
};
exports.connectDB = connectDB;
