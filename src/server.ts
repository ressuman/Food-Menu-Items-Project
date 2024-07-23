import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pizzaRoutes from "./routes/pizzaRoutes";
import { connectDB } from "./config/db";

dotenv.config();

// Database connection
connectDB();

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("api/v1/pizzas", pizzaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
