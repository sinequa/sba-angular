  import {Component, ElementRef, ViewChild, Input, OnDestroy, AfterViewInit} from '@angular/core';
  import {SearchService} from '../../search.service';

  @Component({
    selector: 'sq-scroller',
    template: `<div #anchor style="height:5px"></div>`
  })
  export class BsScroller implements AfterViewInit, OnDestroy {
  @Input() options = {};
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  constructor(private searchService: SearchService) {}

  ngAfterViewInit() {
    const options = {
      root: null,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) {
        this.searchService.loadMore();
      }
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

}