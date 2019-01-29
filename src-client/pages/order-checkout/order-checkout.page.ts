import { Injectable } from "injection-js";
import "reflect-metadata";
import { initPage, initPageState } from "../../models/page.model";
import { HttpService } from "../../services/http.service";
import { Bind } from "../../utils/decorators/bind.decorator";
import { OrderCheckoutPageState } from "./order-checkout-page-state.model";

/**
 * local constants
 */
export const ORDER_PAGE_BASE_URL: string = "Order/Checkout";
export const ORDER_PAGE_HANDLER_ORDER: string = "order";

@Injectable()
class OrderCheckoutPage {
  @Bind<OrderCheckoutPageState>({ order: null })
  state: OrderCheckoutPageState;

  constructor(private readonly httpService: HttpService) {
    initPageState(this.state);
  }
}

/**
 *  init the page
 */
initPage<OrderCheckoutPage>(OrderCheckoutPage, [HttpService]);
