import { Pizza } from "./pizza.model";

/**
 * an order for a singular pizza 🍕
 */
export interface PizzaOrder {
  id: number;
  pizza: Pizza;
  additions?: ReadonlyArray<any>;
  total?: number;
}
