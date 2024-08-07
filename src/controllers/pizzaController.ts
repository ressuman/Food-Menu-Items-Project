import { Request, Response } from "express";
import { Pizza } from "../models/pizzaModel";

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const getPizzas = async (req: Request, res: Response) => {
  try {
    const pizzas = await Pizza.find();
    res
      .status(200)
      .json({ message: "Pizzas retrieved successfully", data: pizzas });
  } catch (error) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const getPizzaById = async (req: Request, res: Response) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res
      .status(200)
      .json({ message: "Pizza retrieved successfully", data: pizza });
  } catch (error) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const createPizza = async (req: Request, res: Response) => {
  const { title, description, toppings, price } = req.body;

  const newPizza = new Pizza({
    title,
    description,
    toppings,
    price,
  });

  try {
    const savedPizza = await newPizza.save();
    res
      .status(201)
      .json({ message: "Pizza created successfully", data: savedPizza });
  } catch (error) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Unknown error" });
    }
  }
};

export const updatePizza = async (req: Request, res: Response) => {
  try {
    const updatedPizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedPizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res
      .status(200)
      .json({ message: "Pizza updated successfully", data: updatedPizza });
  } catch (error) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Unknown error" });
    }
  }
};

export const deletePizza = async (req: Request, res: Response) => {
  try {
    const deletedPizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!deletedPizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res.status(200).json({ message: "Pizza deleted successfully" });
  } catch (error) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};
