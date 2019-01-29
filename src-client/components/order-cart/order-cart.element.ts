import {
  customElement as CustomElement,
  html,
  LitElement,
  property as Property,
  TemplateResult
} from "lit-element";
import { Order } from "../../models-shared/order.model";
import { PizzaOrder } from "../../models-shared/pizza-order.model";
import { getPageStateByKey } from "../../models/page.model";
import { getImageUrl } from "../../utils/get-image-url";
import "../order-cart-item/order-cart-item.element";
import { ORDER_CART_SELECTOR } from "./order-cart.model";

@CustomElement(ORDER_CART_SELECTOR)
class OrderCartElement extends LitElement {
  @Property({ type: Object })
  orders: ReadonlyArray<PizzaOrder> = getPageStateByKey<Order>("order")
    ? getPageStateByKey<Order>("order").pizzaOrders
    : [];

  @Property({ attribute: false })
  isMenuOpen: boolean = false;

  async onClick(event) {
    await this.updateComplete;
    this.isMenuOpen = !this.isMenuOpen;
  }

  getOrderItems(): Array<TemplateResult> {
    if (this.orders.length > 0)
      return this.orders.map(
        pizzaOrder =>
          html`
            <pgp-el-order-cart-item
              .pizza="${pizzaOrder.pizza}"
            ></pgp-el-order-cart-item>
          `
      );
    else
      return [
        html`
          <span class="menu__placeholder"></span>
        `
      ];
  }

  getOrderCount(): number {
    return this.orders.length ? this.orders.length : 0;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        :host {
          width: 1rem;
          height: 1rem;
          margin: 0 1.25rem;
          position: relative;
        }

        .menu__button {
          display: inline-block;
          margin-top: -0.25rem;
          height: 3rem;
          width: 3rem;
          position: relative;
          transition: transform 0.1s ease-out;
          z-index: +2;
        }

        .menu__button.open {
          background-color: #fafafa;
        }

        .menu__button:hover {
          transform: scale(1.1);
          cursor: pointer;
        }

        .menu__button img {
          height: 3rem;
          width: 3rem;
        }

        .menu__amount {
          position: absolute;
          right: 0;
          bottom: 0;
          margin: 0 -1px -1px 0;
          background-color: #f2cf90;
          display: block;
          padding: 0.5rem;
          font-size: 1.2rem;
          font-weight: 550;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
          text-align: center;
          color: #dc691d;
        }

        .menu {
          display: none;
          width: 200px;
          position: absolute;
          top: 2.75rem;
          right: 0;
          margin-right: -1.95rem;
          background-color: #fafafa;
          padding: 1rem;
          z-index: +1;
          overflow: hidden;
        }

        .menu.open {
          display: block;
          position: absolute;
          right: 0;
        }
      </style>
      <a
        class="menu__button ${this.isMenuOpen ? "open" : ""}"
        @click="${this.onClick}"
      >
        <img src="${getImageUrl("pizza-box.svg")}" />
        <span class="menu__amount">${this.getOrderCount()}</span>
      </a>
      <article class="menu ${this.isMenuOpen ? "open" : ""}">
        ${this.getOrderItems()}
      </article>
    `;
  }
}
