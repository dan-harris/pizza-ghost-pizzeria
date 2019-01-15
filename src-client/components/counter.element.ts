import { customElement as CustomElement, html, LitElement, property as Property } from '@polymer/lit-element';

@CustomElement('my-element')
class MyElement extends LitElement {

    @Property({ type: Number })
    count: number;

    constructor() {
        super();
    }

    render() {
        return html`
        <style> .count { font-size: 1.3rem; opacity: 0.8; } </style>
        <span class="count">${this.count}</span>
        `;
    }

}