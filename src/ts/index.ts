import { Pizza, PizzaProps } from "./model/Pizza";
//import dotenv from "dotenv";
//import "process/browser";

//dotenv.config();

const rootElement = document.querySelector(".root")!;

function createPizzaTemplate(pizza: PizzaProps): string {
  return `
    <div class="pizza">
      <h2>${pizza.title}</h2>
      <p class="toppings">${pizza.toppings.join(", ")}</p>
      <p>${pizza.description}</p>
      <span>£${pizza.price}</span>
    </div>
  `;
}

function renderTemplates(templates: string[], parent: Element): void {
  const templateElement = document.createElement("template");

  for (const t of templates) {
    templateElement.innerHTML += t;
  }

  parent.append(templateElement.content);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load the pizza data
    const pizzas = await Pizza.loadAll();

    // Create template string for each pizza
    const pizzaTemplates = pizzas.map(createPizzaTemplate);

    // Render pizza templates to DOM
    renderTemplates(pizzaTemplates, rootElement);
  } catch (error) {
    console.error("Error loading pizzas:", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Failed to load pizzas. Please try again later.";
    rootElement.appendChild(errorMessage);
  }
});
