import {Directive, Input, ElementRef, OnChanges} from "@angular/core";
import {Utils} from "@sinequa/core/base";

@Directive({
    selector: "[sqAutofocus]"
})
export class Autofocus implements OnChanges {
    @Input("sqAutofocus") value: number;
    element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = <HTMLElement>elementRef.nativeElement;
    }

    private setFocus() {
        Utils.delay()
            .then(() => {
                if (this.element.offsetWidth !== 0) {
                    this.element.focus();
                }
            });
    }

    ngOnChanges() {
        this.setFocus();
    }
}