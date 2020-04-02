import {Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter} from "@angular/core";

@Directive({
    selector: "[sqLoad]"
})
export class Load implements OnInit, OnDestroy {
    element: HTMLElement;
    @Output("sqLoad") load: EventEmitter<{event: Event}>;

    constructor(elementRef: ElementRef) {
        this.element = <HTMLElement>elementRef.nativeElement;
        this.load = new EventEmitter<{event: Event}>();
    }

    loadListener = (event: Event) => {
        this.load.emit({event: event});
    }

    ngOnInit() {
        this.element.addEventListener("load", this.loadListener);
    }

    ngOnDestroy() {
        this.element.removeEventListener("load", this.loadListener);
    }
}