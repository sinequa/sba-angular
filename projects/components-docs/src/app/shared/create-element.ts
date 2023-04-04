import { ApplicationRef, inject, Type } from "@angular/core";
import { createCustomElement } from "@angular/elements";

export function createElement(selector: string, component: Type<any>) {
    const appRef = inject(ApplicationRef);
    const customElement = createCustomElement(component, { injector: appRef['_injector'] });
    customElements.get(selector) || customElements.define(selector, customElement);
}