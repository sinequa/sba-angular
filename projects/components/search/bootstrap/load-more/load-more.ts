import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {SearchService} from '../../search.service';

@Component({
  selector: "sq-load-more-button",
  templateUrl: "./load-more.html"
})
export class BsLoadMoreButton implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  hasMore = false;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.subscription = this.searchService.resultsStream
      .subscribe(results => {
        this.hasMore = this.searchService.hasMore();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadMore(event: Event) {
    this.searchService.loadMore();
  }
}