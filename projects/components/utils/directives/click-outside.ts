import {Directive, Input, Output, ElementRef, EventEmitter, HostListener} from "@angular/core";

export interface ClickOutsideOptions {
    exclude?: string[];
}

@Directive({
    selector: "[sqClickOutside]"
})
export class ClickOutside {
    @Input("sqClickOutside") options?: ClickOutsideOptions;
    @Output("sqClickOutside") clickOutside = new EventEmitter<{click: UIEvent}>();
    element: HTMLElement;
    wasInside: boolean;

    constructor(elementRef: ElementRef) {
        this.element = <HTMLElement>elementRef.nativeElement;
    }

    @HostListener('click', ['$event'])
    click(event: Event) {
      this.wasInside = true;
    }

    @HostListener('document:click', ['$event'])
    clickHandler(event: MouseEvent) {
        const _wasInside = this.wasInside;
        this.wasInside = false;
        if (!event || !event.target) {
            return;
        }
        if (this.element.offsetWidth === 0) {
            return;
        }
        if (event.target === document.body && document.elementFromPoint(event.pageX, event.pageY) !== event.target) {
            return;
        }
        if (this.element.contains(<HTMLElement>event.target)) {
            return;
        }
        if (this.options?.exclude) {
            let targetRoot = <HTMLElement>event.target;
            while (!!targetRoot.parentElement) {
                targetRoot = targetRoot.parentElement;
            }
            for (const selector of this.options.exclude) {
                const elts = Array.from(targetRoot.querySelectorAll(selector));
                for (const elt of elts) {
                    if (elt && elt.contains(<Node>event.target)) {
                        return;
                    }
                }
            }
        }
        if (!_wasInside) {
            this.clickOutside.emit({click: event});
        }
    }
}
