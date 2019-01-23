import { Injectable } from "injection-js";
import "reflect-metadata";
import {
  PizzaSelectedEvent,
  PIZZA_ORDER_CARD_EVENT_SELECTED,
  PIZZA_ORDER_CARD_SELECTOR
} from "../../components/pizza-order-card/pizza-order-card.model";
import { Order } from "../../models-shared/order.model";
import { initPage } from "../../models/page.model";
import { Bind } from "../../utils/decorators/bind.decorator";
import { ListenAll } from "../../utils/decorators/listen-all.decorator";
import { QueryAll } from "../../utils/decorators/query-all.decorator";
import { Watch } from "../../utils/decorators/watch.decorator";
import { CustomElement } from "../../utils/types/custom-element.type";

@Injectable()
class OrderPage {
  @QueryAll(PIZZA_ORDER_CARD_SELECTOR)
  pizzaOrderCards: NodeListOf<CustomElement>;

  @Bind<{ order: Order }>({ order: null })
  orderBinding: { order: Order };

  constructor() {
    this.orderBinding.order = window["INITIAL_STATE"].order;
  }

  @ListenAll(PIZZA_ORDER_CARD_EVENT_SELECTED, PIZZA_ORDER_CARD_SELECTOR)
  onClickAnywhere({ detail }: CustomEvent<PizzaSelectedEvent>) {
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
  logState(order: { order: Order }) {
    console.log("🥡", { order: order.order });
  }
}

// init the page
initPage<OrderPage>(OrderPage, []);
