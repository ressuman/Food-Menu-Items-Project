import { Schema, model, Document } from "mongoose";

interface IPizza extends Document {
  title: string;
  description: string;
  toppings: string[];
  price: number;
}

const pizzaSchema = new Schema<IPizza>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  toppings: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Pizza = model<IPizza>("Pizza", pizzaSchema);
