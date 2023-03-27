import { inject, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";

export class CustomElementModule {
    injector = inject(Injector);

    createElement(selector: string, element: any) {
        const customElement = createCustomElement(element, { injector: this.injector });
        customElements.get(selector) || customElements.define(selector, customElement);
    }
}