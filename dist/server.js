"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const pizzaRoutes_1 = __importDefault(require("./routes/pizzaRoutes"));
const db_1 = require("./config/db");
dotenv_1.default.config();
// Database connection
(0, db_1.connectDB)();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/v1/pizzas", pizzaRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
