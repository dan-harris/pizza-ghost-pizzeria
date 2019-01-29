import {
  customElement as CustomElement,
  html,
  LitElement,
  property as Property
} from "lit-element";
import { Pizza } from "../../models-shared/pizza.model";
import { getImageUrl } from "../../utils/get-image-url";
import { ORDER_CART_ITEM_SELECTOR } from "./order-cart-item.model";

@CustomElement(ORDER_CART_ITEM_SELECTOR)
class OrderCartItemElement extends LitElement {
  @Property({ type: Object })
  pizza: Pizza = null;

  onClick(event) {
    console.log("🍕", { pizza: this.pizza });
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        :host {
          width: 250px;
          margin: 1rem;
          position: relative;
    display: inline-block;
        }

        img {
          height: 2rem;
          width: 2rem;
          position: absolute;
          left: 0;
        }

        h4 {
          margin: 0;
    padding: 0.25rem 3rem 0;
        }
      </style>
      <img src="${getImageUrl("pizza-slice.svg")}" />
      <h4> ${this.pizza ? this.pizza.name : ""} </h4>
    `;
  }
}
