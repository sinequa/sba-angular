import {Directive, Input, OnChanges, SimpleChanges, ElementRef} from "@angular/core";

export interface ScrollIntoViewOptions {
    active: boolean;
    first: boolean;
}

@Directive({
    selector: "[sqScrollIntoView]",
    standalone: false
})
export class ScrollIntoView implements OnChanges {
    @Input("sqScrollIntoView") options: ScrollIntoViewOptions;

    constructor(
        private elementRef: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges) {
        const change = changes['sqScrollIntoView'];
        if (change && this.options.active && !change.previousValue?.active) {
            this.elementRef.nativeElement.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }
}
