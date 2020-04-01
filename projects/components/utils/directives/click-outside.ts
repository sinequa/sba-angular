import {Directive, Input, Output, ElementRef, OnInit, OnDestroy, EventEmitter} from "@angular/core";
import {Utils} from "@sinequa/core/base";

export interface ClickOutsideOptions {
    exclude?: string[];
}

@Directive({
    selector: "[sqClickOutside]"
})
export class ClickOutside implements OnInit, OnDestroy {
    @Input("sqClickOutside") options: ClickOutsideOptions;
    @Output("sqClickOutside") clickOutside = new EventEmitter<{click: UIEvent}>();
    element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = <HTMLElement>elementRef.nativeElement;
    }

    ngOnInit() {
        document.addEventListener("click", this.clickHandler);
        if (!this.options) {
            this.options = { exclude: ['.bs-datepicker'] }; // By default exclude bootstrap date picker
        }
    }

    ngOnDestroy() {
        document.removeEventListener("click", this.clickHandler);
    }

    private isActive(element: Element): boolean {
        let active = document["activeElement"];
        while (active) {
            if (element === active) {
                return true;
            }
            active = active.parentElement;
        }
        return false;
    }

    clickHandler = (event: MouseEvent) => {
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
        if (this.options.exclude) {
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
        // Call via timeout so we can check whether the click was leading to us taking focus
        // If we have the focus then we don't call clickOutside
        Utils.delay()
            .then(() => {
                if (!this.isActive(this.element)) {
                    this.clickOutside.emit({click: event});
                }
            });
    }
}