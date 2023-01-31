import { Directive, Input, OnChanges, EventEmitter, Output, SimpleChanges, AfterViewInit, ElementRef, OnDestroy } from "@angular/core";

/**
 * Infinite Scroll Directive
 *
 * The directive handles the scrolling and splitting parts
 * It takes the whole list in which to scroll in input, and emits the paginated one triggered on the scrolling
 */
@Directive({
    selector: "[sqVirtualScroll]"
})
export class VirtualScrollDirective implements OnChanges, AfterViewInit, OnDestroy {
    /**
     * The list to be scrolled
     */
    @Input() list: Object[];

    /**
     * The number of items to display in a page
     *
     * Note that it will be doubled when scrolling to have a better behaviour when scrolling back
     * and also to keep the last added items to scroll back to the one we were on after loading the new ones
     */
    @Input() itemsNumber: number = 10;

    /**
     * The unique parameter between the list items to scroll back to the element we were on after a new page load
     */
    @Input() idParameter: string = 'id';

    /**
     * Optional prefix for the elements' HTML id (so for ids like "extract-1" it would be "extract")
     */
    @Input() idPrefix: string;

    /**
     * To force going to a specific index
     */
    @Input() scrollIndex: number;


    /**
     * The updated list after reaching one end of the container
     */
    @Output() newList = new EventEmitter<Object[]>();

    private indexTo: number = this.itemsNumber;
    private observer: IntersectionObserver;

    get subList(): Object[] {
        return this.list?.slice(0, this.indexTo) || [];
    }

    constructor(private elementRef: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["list"]) {
            // Reset if new list
            this.indexTo = this.itemsNumber;
            this.newList.emit(this.subList);
        }
        if (changes["scrollIndex"]?.currentValue !== undefined && changes["scrollIndex"].currentValue !== -1) {
            // If forced selected index
            this.indexTo = this.scrollIndex + this.itemsNumber < this.list.length
                ? this.scrollIndex + this.itemsNumber : this.list.length - 1;
            this.newList.emit(this.subList);
            this.scrollTo(this.scrollIndex);
        }
    }

    ngAfterViewInit(): void {
        // Add spacers at the top and bottom of the list which prevent strange behavior when doing some forced scrolling
        // like if we force scroll to an element, it is set at the top and if no spacer is here it will think we have scrolled top and go to the previous page
        this.elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div id="infinite-scroll-spacing" class="d-block" style="height:1rem">&nbsp;</div>');
        const element = document.querySelector('#infinite-scroll-spacing');
        if (element) {
            this.observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    const isLastPart = this.indexTo + this.itemsNumber >= this.list.length;
                    const id = this.subList[this.subList.length - 1][this.idParameter];
                    this.indexTo = isLastPart ? this.list.length - 1 : this.indexTo + this.itemsNumber;
                    this.newList.emit(this.subList);
                    this.scrollTo(id);
                }
            });
            this.observer.observe(element);
        }
    }

    ngOnDestroy(): void {
        this.observer.disconnect();
    }

    private scrollTo(id: number): void {
        setTimeout(() => {
            const elementId = this.idPrefix ? `${this.idPrefix}-${id}` : String(id);
            document.getElementById(elementId)?.scrollIntoView();
        });
    }
}