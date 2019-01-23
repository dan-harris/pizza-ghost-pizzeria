import { Injectable } from "injection-js";
import "reflect-metadata";
import {
  PizzaSelectedEvent,
  PIZZA_ORDER_CARD_EVENT_SELECTED,
  PIZZA_ORDER_CARD_SELECTOR
} from "../../components/pizza-order-card/pizza-order-card.model";
import { Order } from "../../models-shared/order.model";
import { PizzaOrder } from "../../models-shared/pizza-order.model";
import { Pizza } from "../../models-shared/pizza.model";
import { initPage } from "../../models/page.model";
import { HttpService } from "../../services/http.service";
import { Bind } from "../../utils/decorators/bind.decorator";
import { ListenAll } from "../../utils/decorators/listen-all.decorator";
import { QueryAll } from "../../utils/decorators/query-all.decorator";
import { Watch } from "../../utils/decorators/watch.decorator";
import { CustomElement } from "../../utils/types/custom-element.type";

/**
 * local constants
 */
export const ORDER_PAGE_BASE_URL: string = "Order";
export const ORDER_PAGE_HANDLER_TIME: string = "time";
export const ORDER_PAGE_HANDLER_ORDER: string = "order";

@Injectable()
class OrderPage {
  @QueryAll(PIZZA_ORDER_CARD_SELECTOR)
  pizzaOrderCards: NodeListOf<CustomElement>;

  @Bind<{ order: Order }>({ order: null })
  orderBinding: { order: Order };

  constructor(private readonly httpService: HttpService) {
    this.orderBinding.order = window["INITIAL_STATE"].order;
  }

  @ListenAll(PIZZA_ORDER_CARD_EVENT_SELECTED, "pizzaOrderCards")
  onSelectPizzaOrderCard({ detail }: CustomEvent<PizzaSelectedEvent>) {
    const { pizza } = detail;
    console.log("🍕", { pizza });
    this.orderBinding.order = {
      ...this.orderBinding.order,
      pizzaOrders: [
        ...this.orderBinding.order.pizzaOrders,
        { id: this.orderBinding.order.pizzaOrders.length, pizza }
      ]
    };
  }

  @Watch<{ order: Order }>("orderBinding")
  async updateOrders({ order }: { order: Order }) {
    await this.httpService.put<Order>(
      `./${ORDER_PAGE_BASE_URL}?handler=${ORDER_PAGE_HANDLER_ORDER}`,
      order
    );
    console.log("🥡", { order: order });
  }

  @Watch<{ order: Order }>("orderBinding")
  async updatePizzaOrderCards({ order }: { order: Order }) {
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
}

// init the page
initPage<OrderPage>(OrderPage, [HttpService]);
