import { Order } from "../../models-shared/order.model";

/**
 * state model for order checkout page
 * (includes initial state)
 */
export interface OrderCheckoutPageState {
  order: Order;
}
