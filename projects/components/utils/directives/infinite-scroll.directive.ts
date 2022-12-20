import { Directive, Input, OnChanges, EventEmitter, Output, SimpleChanges, HostListener, ElementRef, AfterViewInit } from "@angular/core";

/**
 * Infinite Scroll Directive
 *
 * The directive handles the scrolling and splitting parts
 * It takes the whole list in which to scroll in input, and emits the paginated one triggered on the scrolling
 */
@Directive({
    selector: "[sqInfiniteScroll]"
})
export class InfiniteScrollDirective implements OnChanges, AfterViewInit {
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

    private indexFrom: number = 0;
    private indexTo: number = this.itemsNumber;
    private showTopSpacer = false;

    get subList(): Object[] {
        return this.list?.slice(this.indexFrom, this.indexTo) || [];
    }

    @HostListener("scroll", ["$event"])
    onScrollTriggered(event: Event): void {
        const target = event.target as HTMLElement;
        const isStart = target.scrollTop === 0;
        const isEnd = target.scrollTop + target.clientHeight === target.scrollHeight;
        const isFirstPart = this.indexTo - this.itemsNumber < this.itemsNumber;
        const isLastPart = this.indexTo + this.itemsNumber >= this.list.length;

        if (isStart && this.indexFrom) {
            // If reached the top of the items list
            this.setTopSpacerVisibility(false);
            const id = 0 + this.indexFrom;
            this.indexFrom = isFirstPart ? 0 : this.indexFrom - this.itemsNumber;
            this.indexTo = isFirstPart ? this.itemsNumber
                : (isLastPart ? this.list.length - 1 : this.indexTo - this.itemsNumber);
            this.newList.emit(this.subList);
            this.scrollTo(id);
        } else if (isEnd && this.indexTo < this.list.length) {
            // If reached the bottom of the items list
            const id = this.subList[this.subList.length - 1][this.idParameter];
            this.indexFrom = isLastPart ? this.list.length - this.itemsNumber
                : (isFirstPart ? this.indexFrom : this.indexFrom + this.itemsNumber);
            this.indexTo = isLastPart ? this.list.length - 1 : this.indexTo + this.itemsNumber;
            this.newList.emit(this.subList);
            this.scrollTo(id);
        } else if (this.indexFrom > 0 && !this.showTopSpacer) {
            // Display the small spacer at the top of the list
            this.setTopSpacerVisibility(true);
        }
    }

    constructor(private elementRef: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["list"]) {
            // Reset if new list
            this.indexFrom = 0;
            this.indexTo = this.itemsNumber;
            this.newList.emit(this.subList);
        }
        if (changes["scrollIndex"]?.currentValue !== undefined && changes["scrollIndex"].currentValue !== -1) {
            // If forced selected index
            this.indexTo = this.scrollIndex + this.itemsNumber < this.list.length
                ? this.scrollIndex + this.itemsNumber : this.list.length - 1;
            this.indexFrom = this.indexTo - this.itemsNumber > 0
                ? this.indexTo - this.itemsNumber : 0;
            this.newList.emit(this.subList);

            if (this.indexFrom > 0 && !this.showTopSpacer) {
                this.setTopSpacerVisibility(true);
            }

            this.scrollTo(this.scrollIndex);
        }
    }

    ngAfterViewInit(): void {
        // Add spacers at the top and bottom of the list which prevent strange behavior when doing some forced scrolling
        this.elementRef.nativeElement.insertAdjacentHTML('afterbegin', '<div id="infinite-scroll-top-spacing" class="d-none" style="height:1rem">&nbsp;</div>');
        this.elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div id="infinite-scroll-bottom-spacing" class="d-block" style="height:1rem">&nbsp;</div>');
    }

    private setTopSpacerVisibility(visible: boolean): void {
        this.showTopSpacer = visible;
        const elt = document.getElementById('infinite-scroll-top-spacing');
        if (elt) {
            elt.className = visible ? 'd-block' : 'd-none';
        }
    }

    private scrollTo(id: number): void {
        setTimeout(() => {
            const elementId = this.idPrefix ? `${this.idPrefix}-${id}` : String(id);
            document.getElementById(elementId)?.scrollIntoView();
        });
    }
}