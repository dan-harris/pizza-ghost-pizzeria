import { Pizza } from "../../models-shared/pizza.model";

/**
 * custom element DOM selector
 */
export const PIZZA_ORDER_CARD_SELECTOR: string = "pgp-el-pizza-order-card";

/**
 * custom element events
 */
export const PIZZA_ORDER_CARD_EVENT_SELECTED: string = "pgp.selected";

/**
 * pizza selected event details
 */
export interface PizzaSelectedEvent {
  pizza: Pizza;
}
