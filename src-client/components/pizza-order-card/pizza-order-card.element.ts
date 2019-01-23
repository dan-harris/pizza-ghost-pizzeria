import {
  customElement as CustomElement,
  html,
  LitElement,
  property as Property
} from "@polymer/lit-element";
import { PizzaIcons } from "../../models-shared/pizza-icons.model";
import { Pizza } from "../../models-shared/pizza.model";
import { getPizzaIconUrl } from "../../utils/get-pizza-icon-url";
import {
  PizzaSelectedEvent,
  PIZZA_ORDER_CARD_EVENT_SELECTED,
  PIZZA_ORDER_CARD_SELECTOR
} from "./pizza-order-card.model";

@CustomElement(PIZZA_ORDER_CARD_SELECTOR)
class PizzaOrderCardElement extends LitElement {
  @Property({ type: Object })
  pizza: Pizza = {
    id: 0,
    name: "",
    icon: PizzaIcons.PEPPERONI
  };

  @Property({ type: Number })
  amount: number = 0;

  async onClick(event) {
    await this.updateComplete;
    this.dispatchEvent(
      new CustomEvent<PizzaSelectedEvent>(PIZZA_ORDER_CARD_EVENT_SELECTED, {
        detail: { pizza: this.pizza }
      })
    );
  }

  getAmountOrderedTemplate() {
    return this.amount > 0
      ? html`
          <span class="card__amount">${this.amount}</span>
        `
      : "";
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
        }

        .card:hover {
          background-color: #f5f5f5;
          transform: scale(1.05);
          cursor: pointer;
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 1rem 2rem 1rem;
          background-color: #fafafa;
          transition: transform 0.1s ease-out;
          position: relative;
        }

        .card__image img {
          width: 200px;
          height: 200px;
        }

        .card__amount {
          position: absolute;
          right: 0.5rem;
          top: 0.5rem;
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
      </style>
      <article class="card" @click="${this.onClick}">
        ${this.getAmountOrderedTemplate()}
        <h3 class="card__header">${this.pizza.name}</h3>
        <div class="card__image">
          <img src="${getPizzaIconUrl(this.pizza.icon)}" />
        </div>
      </article>
    `;
  }
}
