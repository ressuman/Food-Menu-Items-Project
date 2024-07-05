import { Pizza, PizzaProps } from "./model/Pizza";

// Form handling code
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".create") as HTMLFormElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // const titleInput = document.querySelector(
    //   'input[name="title"]'
    // ) as HTMLInputElement;
    // const descriptionInput = document.querySelector(
    //   'textarea[name="description"]'
    // ) as HTMLTextAreaElement;
    // const priceInput = document.querySelector(
    //   'input[name="price"]'
    // ) as HTMLInputElement;
    // const toppingInputs = document.querySelectorAll(
    //   'input[name="toppings"]:checked'
    // ) as NodeListOf<HTMLInputElement>;

    const data = new FormData(form);

    const newPizza: PizzaProps = {
      title: data.get("title") as string,
      description: data.get("description") as string,
      toppings: data.getAll("toppings") as string[],
      price: parseInt(data.get("price") as string),
    };

    try {
      const res = await Pizza.save(newPizza);

      if (res.status === 200 || res.status === 201) {
        // Redirect to homepage or handle success
        window.location.href = "/";
      } else {
        console.error("Failed to save the pizza, status code:", res.status);
      }
    } catch (error) {
      console.error("Error saving the pizza:", error);
    }
  });
});
