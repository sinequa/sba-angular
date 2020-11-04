import {Component, ElementRef, ViewChild, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {SearchService} from '../../search.service';

@Component({
  selector: 'sq-scroller',
  template: `<div #anchor></div>`,
  styleUrls: ['./scroller.scss']
})
export class BsScroller implements AfterViewInit, OnDestroy {
  @Input() options = {};
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  constructor(private host: ElementRef, private searchService: SearchService) {}

  get element() {
    return this.host.nativeElement;
  }

  ngAfterViewInit() {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) {
        this.searchService.loadMore();
      }
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

}