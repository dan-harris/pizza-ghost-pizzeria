import { Injectable } from "injection-js";
import "reflect-metadata";
import { ORDER_CART_SELECTOR } from "../../components/order-cart/order-cart.model";
import {
  PizzaSelectedEvent,
  PIZZA_ORDER_CARD_EVENT_SELECTED,
  PIZZA_ORDER_CARD_SELECTOR
} from "../../components/pizza-order-card/pizza-order-card.model";
import { Order } from "../../models-shared/order.model";
import { PizzaOrder } from "../../models-shared/pizza-order.model";
import { Pizza } from "../../models-shared/pizza.model";
import { initPage, initPageState } from "../../models/page.model";
import { HttpService } from "../../services/http.service";
import { Bind } from "../../utils/decorators/bind.decorator";
import { ListenAll } from "../../utils/decorators/listen-all.decorator";
import { QueryAll } from "../../utils/decorators/query-all.decorator";
import { Query } from "../../utils/decorators/query.decorator";
import { Watch } from "../../utils/decorators/watch.decorator";
import { CustomElement } from "../../utils/types/custom-element.type";
import { OrderPageState } from "./order-page-state.model";

/**
 * local constants
 */
export const ORDER_PAGE_BASE_URL: string = "order";
export const ORDER_PAGE_HANDLER_TIME: string = "time";
export const ORDER_PAGE_HANDLER_ORDER: string = "order";

@Injectable()
class OrderPage {
  @QueryAll(PIZZA_ORDER_CARD_SELECTOR)
  pizzaOrderCards: NodeListOf<CustomElement>;

  @Query(ORDER_CART_SELECTOR)
  orderCart: CustomElement;

  @Bind<OrderPageState>({ order: null })
  state: OrderPageState;

  constructor(private readonly httpService: HttpService) {
    initPageState(this.state);
    this.updateOrderCart(this.state);
  }

  @ListenAll(PIZZA_ORDER_CARD_EVENT_SELECTED, "pizzaOrderCards")
  onSelectPizzaOrderCard({ detail }: CustomEvent<PizzaSelectedEvent>) {
    const { pizza } = detail;
    console.log("🍕", { pizza });
    this.state.order = {
      ...this.state.order,
      pizzaOrders: [
        ...this.state.order.pizzaOrders,
        { id: this.state.order.pizzaOrders.length, pizza }
      ]
    };
  }

  @Watch<OrderPageState>("state")
  async updateOrders({ order }: OrderPageState) {
    await this.httpService.put<Order>(
      `./${ORDER_PAGE_BASE_URL}?handler=${ORDER_PAGE_HANDLER_ORDER}`,
      order
    );
    console.log("🥡", { order });
  }

  @Watch<OrderPageState>("state")
  async updatePizzaOrderCards({ order }: OrderPageState) {
    this.pizzaOrderCards.forEach(pizzaOrderCard => {
      const pizza: Pizza = pizzaOrderCard.pizza;
      const matchingOrders: ReadonlyArray<
        PizzaOrder
      > = order.pizzaOrders.filter(
        pizzaOrder => pizzaOrder.pizza.id === pizza.id
      );
      pizzaOrderCard.amount = matchingOrders.length;
    });
  }

  @Watch<OrderPageState>("state")
  async updateOrderCart({ order }: OrderPageState) {
    this.orderCart.orders = order.pizzaOrders;
  }
}

/**
 *  init the page
 */
initPage<OrderPage>(OrderPage, [HttpService]);
