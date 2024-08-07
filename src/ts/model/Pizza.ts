import { DataResource } from "../services/dataResource";
import dotenv from "dotenv";
import "process/browser";

dotenv.config();

export interface PizzaProps {
  title: string;
  description: string;
  toppings: string[];
  price: number;
  id?: number;
}

const pizzaMenuListItemsServer = process.env.PIZZA_MENU_LIST_ITEMS_SERVER;

if (!pizzaMenuListItemsServer) {
  throw new Error(
    "PIZZA_MENU_LIST_ITEMS_SERVER is not defined in the environment variables"
  );
}

export const Pizza = new DataResource<PizzaProps>(pizzaMenuListItemsServer);

// Pizza.save({
// 	title: 'my new pizza',
// 	description: 'yummy',
// 	toppings: ['mushrooms', 'peppers', 'olives'],
// 	price: 10,
// })
