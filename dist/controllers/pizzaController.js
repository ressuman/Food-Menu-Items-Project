"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePizza = exports.updatePizza = exports.createPizza = exports.getPizzaById = exports.getPizzas = void 0;
const pizzaModel_1 = require("../models/pizzaModel");
const isError = (error) => {
    return error instanceof Error;
};
const getPizzas = async (req, res) => {
    try {
        const pizzas = await pizzaModel_1.Pizza.find();
        res
            .status(200)
            .json({ message: "Pizzas retrieved successfully", data: pizzas });
    }
    catch (error) {
        if (isError(error)) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};
exports.getPizzas = getPizzas;
const getPizzaById = async (req, res) => {
    try {
        const pizza = await pizzaModel_1.Pizza.findById(req.params.id);
        if (!pizza) {
            return res.status(404).json({ message: "Pizza not found" });
        }
        res
            .status(200)
            .json({ message: "Pizza retrieved successfully", data: pizza });
    }
    catch (error) {
        if (isError(error)) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};
exports.getPizzaById = getPizzaById;
const createPizza = async (req, res) => {
    const { title, description, toppings, price } = req.body;
    const newPizza = new pizzaModel_1.Pizza({
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
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: "Unknown error" });
        }
    }
};
exports.createPizza = createPizza;
const updatePizza = async (req, res) => {
    try {
        const updatedPizza = await pizzaModel_1.Pizza.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedPizza) {
            return res.status(404).json({ message: "Pizza not found" });
        }
        res
            .status(200)
            .json({ message: "Pizza updated successfully", data: updatedPizza });
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: "Unknown error" });
        }
    }
};
exports.updatePizza = updatePizza;
const deletePizza = async (req, res) => {
    try {
        const deletedPizza = await pizzaModel_1.Pizza.findByIdAndDelete(req.params.id);
        if (!deletedPizza) {
            return res.status(404).json({ message: "Pizza not found" });
        }
        res.status(200).json({ message: "Pizza deleted successfully" });
    }
    catch (error) {
        if (isError(error)) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};
exports.deletePizza = deletePizza;
