import {Directive, ElementRef, Output, EventEmitter, AfterViewInit, OnDestroy, NgZone} from "@angular/core";
import {UIService} from "../ui.service";

@Directive({
    selector: "[sqResize]"
})
export class ResizeEventDirective implements AfterViewInit, OnDestroy {
    @Output("sqResize") resizeEvent = new EventEmitter<DOMRectReadOnly>();
    // NB we don't use one of the ResizeObserver polyfills as they rely on polling
    // for changes which continuously consumes cpu time...
    protected resizeObserver: /*ResizeObserver*/any;

    constructor(
        protected elementRef: ElementRef,
        protected zone: NgZone,
        protected uiService: UIService
    ) {
    }

    protected raiseEvent = () => {
        const contentRect = this.elementRef.nativeElement.getBoundingClientRect();
        this.resizeEvent.emit(contentRect);
    }

    ngAfterViewInit() {
        if ((window as any).ResizeObserver) {
            this.resizeObserver = new (window as any).ResizeObserver((entries) => {
                this.zone.run(() => {
                    const contentRect = (entries?.length === 1 && entries[0].contentRect);
                    this.resizeEvent.emit(contentRect);
                });
            });
            this.resizeObserver.observe(this.elementRef.nativeElement);
        }
        else {
            this.uiService.addElementResizeListener(this.elementRef.nativeElement, this.raiseEvent);
        }
    }

    ngOnDestroy() {
        if ((window as any).ResizeObserver) {
            this.resizeObserver.unobserve(this.elementRef.nativeElement);
        }
        else {
            this.uiService.removeElementResizeListener(this.elementRef.nativeElement, this.raiseEvent);
        }
    }
}
