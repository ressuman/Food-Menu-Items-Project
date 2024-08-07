import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Pizza } from "./models/pizzaModel";

dotenv.config();

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (isError(error)) {
      console.error(`MongoDB connection error: ${error.message}`);
    } else {
      console.error("Unknown error");
    }
    process.exit(1);
  }
};

const readJSONFiles = (filePath: string) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    if (isError(error)) {
      console.error(`Error reading JSON file at ${filePath}: ${error.message}`);
    } else {
      console.error("Unknown error while reading JSON file");
    }
    process.exit(1);
  }
};

const validatePizzaData = (pizzas: any[]) => {
  return pizzas.every((pizza) => {
    return pizza.title && pizza.description && pizza.toppings && pizza.price;
  });
};

const importData = async () => {
  try {
    const dataPath = path.resolve(__dirname, "../data/db.json");
    const data = readJSONFiles(dataPath);
    const pizzas = data.pizzas;

    if (!validatePizzaData(pizzas)) {
      console.error(
        "Invalid data format in db.json. Ensure all required fields are present."
      );
      process.exit(1);
    }

    await Pizza.create(pizzas);
    console.log("Data Imported...");
    process.exit();
  } catch (error) {
    if (isError(error)) {
      console.error(`Error importing data: ${error.message}`);
    } else {
      console.error("Unknown error");
    }
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Pizza.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (error) {
    if (isError(error)) {
      console.error(`Error deleting data: ${error.message}`);
    } else {
      console.error("Unknown error");
    }
    process.exit(1);
  }
};

const processData = async () => {
  // Check if the command is for importing or deleting data
  if (process.argv[2] === "-i") {
    await importData();
  } else if (process.argv[2] === "-d") {
    await deleteData();
  } else {
    console.error(
      "Invalid command. Usage: node dist/seeder -i (import) | -d (delete)"
    );
    process.exit(1);
  }
};

connectDB()
  .then(processData)
  .catch((error) => {
    if (isError(error)) {
      console.error(
        `Error in initial connection or processing: ${error.message}`
      );
    } else {
      console.error("Unknown error in initial connection or processing");
    }
    process.exit(1);
  });
