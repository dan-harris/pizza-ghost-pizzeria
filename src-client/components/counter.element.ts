import { customElement as CustomElement, html, LitElement, property as Property } from '@polymer/lit-element';

@CustomElement('my-element')
class MyElement extends LitElement {

    @Property()
    mood: string;

    constructor() {
        super();
        this.mood = '🔥';
    }

    render() {
        return html`
        <style> .mood { color: green; } </style>
        Web Components are 
        <span class="mood">${this.mood}</span>!
        `;
    }

}