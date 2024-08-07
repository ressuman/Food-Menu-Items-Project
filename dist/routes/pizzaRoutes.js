"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pizzaController_1 = require("../controllers/pizzaController");
const router = express_1.default.Router();
router.route("/").get(pizzaController_1.getPizzas).post(pizzaController_1.createPizza);
router.route("/:id").get(pizzaController_1.getPizzaById).put(pizzaController_1.updatePizza).delete(pizzaController_1.deletePizza);
exports.default = router;
