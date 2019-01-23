import { PizzaIcons } from "./pizza-icons.model";

/**
 * a pizza 🍕
 */
export interface Pizza {
  id: number;
  name: string;
  icon: PizzaIcons;
}
