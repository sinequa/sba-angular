import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';

/**
 * Infinite Scroll Component
 *
 * The component handles the scrolling and splitting parts
 * It takes the whole list in which to scroll in input, and emits the updated one upon scrolling
 */
@Component({
  selector: 'sq-virtual-scroller',
  styles: [`:host {
    display: block;
  }`],
  template: `
<ng-content></ng-content>
<div #spacing class="d-block" style="height:1rem">&nbsp;</div>
    `
})
export class BsVirtualScroller implements OnChanges, AfterViewInit, OnDestroy {

  /**
     * The list to be scrolled
     */
  @Input() list: Object[];

  /**
   * The number of items per loaded pages
   */
  @Input() itemsNumber: number = 10;

  /**
   * When going to a specific index
   */
  @Input() scrollIndex: number;


  /**
   * The updated list after reaching one end of the container
   */
  @Output() newList = new EventEmitter<Object[]>();

  @ViewChild('spacing', { static: true }) spacing: ElementRef<HTMLDivElement>;

  private indexTo: number = this.itemsNumber;
  private observer: IntersectionObserver;

  get subList(): Object[] {
    return this.list?.slice(0, this.indexTo) || [];
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["list"]) {
      // Reset if new list
      this.indexTo = this.itemsNumber;
      this.newList.emit(this.subList);
    }
    if (changes["scrollIndex"]?.currentValue !== undefined && changes["scrollIndex"].currentValue !== -1) {
      // If forced selected index
      if (this.scrollIndex > this.indexTo) {
        this.indexTo = this.scrollIndex + this.itemsNumber < this.list.length
          ? this.scrollIndex + this.itemsNumber : this.list.length;
        this.newList.emit(this.subList);
      }
    }
  }

  ngAfterViewInit(): void {
    // Add intersection observer to load more data when the spacer div element comes into view
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const isLastPart = this.indexTo + this.itemsNumber >= this.list.length;
        this.indexTo = isLastPart ? this.list.length : this.indexTo + this.itemsNumber;
        this.newList.emit(this.subList);
      }
    });
    this.observer.observe(this.spacing.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

}