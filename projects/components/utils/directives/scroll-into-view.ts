import {Directive, Input, OnChanges, ElementRef} from "@angular/core";

export interface ScrollIntoViewOptions {
    active: boolean;
    first: boolean;
}

@Directive({
    selector: "[sqScrollIntoView]"
})
export class ScrollIntoView implements OnChanges {
    @Input("sqScrollIntoView") options: ScrollIntoViewOptions;

    constructor(
        private elementRef: ElementRef) {
    }

    ngOnChanges() {
        if (this.options.active) {
            if (this.options.first) {
                this.elementRef.nativeElement.scrollIntoView(false);
            }
            else {
                this.elementRef.nativeElement.scrollIntoViewIfNeeded(false);
            }
        }
    }
}
