"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pizza = void 0;
const mongoose_1 = require("mongoose");
const pizzaSchema = new mongoose_1.Schema({
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
exports.Pizza = (0, mongoose_1.model)("Pizza", pizzaSchema);
