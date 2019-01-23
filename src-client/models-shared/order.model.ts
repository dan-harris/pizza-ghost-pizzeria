import { PizzaOrder } from "./pizza-order.model";

/**
 * a total order for a customer 😲
 */
export interface Order {
  id: number;
  customerId: number;
  pizzaOrders: ReadonlyArray<PizzaOrder>;
  total: number;
}
