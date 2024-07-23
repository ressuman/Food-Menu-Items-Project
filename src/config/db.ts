import mongoose from "mongoose";

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
