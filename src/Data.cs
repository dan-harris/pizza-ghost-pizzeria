using PizzaGhostPizzeria.Models;
using static PizzaGhostPizzeria.Constants;

namespace PizzaGhostPizzeria {

    /// <summary>
    /// mock data
    /// </summary>
    public static class Data {

        /// <summary>
        /// available pizzas 🍕
        /// </summary>
        /// <value></value>
        public static Pizza[] Pizzas = new [] {
            new Pizza { Id = 1365, Name = "Pepperoni", Icon = PizzaIcons.PEPPERONI },
            new Pizza { Id = 2784, Name = "Vegetarian", Icon = PizzaIcons.VEGAN },
            new Pizza { Id = 3654, Name = "Supreme", Icon = PizzaIcons.SUPREME }
        };

        /// <summary>
        /// available pizza toppings 🍆
        /// </summary>
        /// <value></value>
        public static PizzaAddition[] PizzaAdditions = new [] {
            new PizzaAddition { Id = 183, Name = "Avocado", Icon = PizzaAdditionIcons.AVOCADO },
            new PizzaAddition { Id = 214, Name = "Bananas", Icon = PizzaAdditionIcons.BANANAS },
            new PizzaAddition { Id = 397, Name = "Capsicum", Icon = PizzaAdditionIcons.CAPSICUM },
            new PizzaAddition { Id = 435, Name = "Chilli", Icon = PizzaAdditionIcons.CHILLI },
            new PizzaAddition { Id = 508, Name = "Garlic", Icon = PizzaAdditionIcons.GARLIC },
            new PizzaAddition { Id = 623, Name = "Potatoes", Icon = PizzaAdditionIcons.POTATOES },
        };

    }

}