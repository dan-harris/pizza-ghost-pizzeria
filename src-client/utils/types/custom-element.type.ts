/**
 * helper for typing custom elements
 * (mostly used so ts doesnt complain about accessing custom element attributes)
 */
export interface CustomElement extends HTMLElement {
    [key: string]: any;
}