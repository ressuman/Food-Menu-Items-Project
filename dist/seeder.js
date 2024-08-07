"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const pizzaModel_1 = require("./models/pizzaModel");
dotenv_1.default.config();
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
const readJSONFiles = (filePath) => {
    try {
        return JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    }
    catch (error) {
        if (isError(error)) {
            console.error(`Error reading JSON file at ${filePath}: ${error.message}`);
        }
        else {
            console.error("Unknown error while reading JSON file");
        }
        process.exit(1);
    }
};
const validatePizzaData = (pizzas) => {
    return pizzas.every((pizza) => {
        return pizza.title && pizza.description && pizza.toppings && pizza.price;
    });
};
const importData = async () => {
    try {
        const dataPath = path_1.default.resolve(__dirname, "../data/db.json");
        const data = readJSONFiles(dataPath);
        const pizzas = data.pizzas;
        if (!validatePizzaData(pizzas)) {
            console.error("Invalid data format in db.json. Ensure all required fields are present.");
            process.exit(1);
        }
        await pizzaModel_1.Pizza.create(pizzas);
        console.log("Data Imported...");
        process.exit();
    }
    catch (error) {
        if (isError(error)) {
            console.error(`Error importing data: ${error.message}`);
        }
        else {
            console.error("Unknown error");
        }
        process.exit(1);
    }
};
const deleteData = async () => {
    try {
        await pizzaModel_1.Pizza.deleteMany();
        console.log("Data Destroyed...");
        process.exit();
    }
    catch (error) {
        if (isError(error)) {
            console.error(`Error deleting data: ${error.message}`);
        }
        else {
            console.error("Unknown error");
        }
        process.exit(1);
    }
};
const processData = async () => {
    // Check if the command is for importing or deleting data
    if (process.argv[2] === "-i") {
        await importData();
    }
    else if (process.argv[2] === "-d") {
        await deleteData();
    }
    else {
        console.error("Invalid command. Usage: node dist/seeder -i (import) | -d (delete)");
        process.exit(1);
    }
};
(0, exports.connectDB)()
    .then(processData)
    .catch((error) => {
    if (isError(error)) {
        console.error(`Error in initial connection or processing: ${error.message}`);
    }
    else {
        console.error("Unknown error in initial connection or processing");
    }
    process.exit(1);
});
