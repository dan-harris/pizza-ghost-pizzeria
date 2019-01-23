/**
 * barrel file for core js
 * (essentially all shared code & css)
 */

/**
 * custom elements
 * (must be imported so they're inckuded in js bundle)
 */
import "../components/counter.element";
import "../components/pizza-order-card/pizza-order-card.element";
/**
 * global styles
 */
import "./styles/core.css";
/**
 * polyfills 😥
 * (TODO: move to conditional polyfill loads)
 */
import "./_polyfills";
