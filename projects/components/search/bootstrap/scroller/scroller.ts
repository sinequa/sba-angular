import {animate, style, transition, trigger} from '@angular/animations';
import {Component, ElementRef, ViewChild, Input, OnDestroy, AfterViewInit, OnInit} from '@angular/core';
import {SearchService} from '../../search.service';

export type FloatStyle = "float-right" | "float-left-15" | "float-left-35";

@Component({
  selector: 'sq-scroller',
  styleUrls: ['./scroller.scss'],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({opacity: 0}),
        animate('1s', style({opacity: 1}))
      ]),
      transition(":leave", [
        animate('0.5s', style({opacity: 0}))
      ])
    ])
  ],
  template: `
<div @fadeInOut *ngIf="hasMore" class="load-more-indicator" [ngClass]="position">
  <div class="arrow arrow-color bounce">
    <i class="fas fa-chevron-down fa-2x"></i>
  </div>
</div>
<div #anchor style="height:5px"></div>
    `
})
export class BsScroller implements AfterViewInit, OnDestroy, OnInit {

  @Input() options = {};
  @Input() position: FloatStyle = 'float-left-35';

  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  hasMore = true;

  private observer: IntersectionObserver;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    // when a search occurs, check if has mare results
    this.searchService.resultsStream
      .subscribe(results => {
        this.hasMore = this.searchService.hasMore();
      });
  }

  ngAfterViewInit() {
    const options = {
      root: null,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.searchService.loadMore();
      }
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

}