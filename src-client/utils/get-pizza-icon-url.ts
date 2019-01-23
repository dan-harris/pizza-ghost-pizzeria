import * as env from "../../env.json";
import { PizzaIcons } from "../models-shared/pizza-icons.model";

/**
 * get img src url for pizza icons
 */
export function getPizzaIconUrl(pizzaIcon: PizzaIcons): string {
  return `${env.URL_ASSETS_IMAGES}/pizza-${pizzaIcon.toLowerCase()}.svg`;
}
