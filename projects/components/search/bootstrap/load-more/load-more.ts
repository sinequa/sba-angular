import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Action, IAction} from '@sinequa/components/action';
import {Subscription} from 'rxjs';

import {SearchService} from '../../search.service';

@Component({
    selector: "sq-load-more",
    templateUrl: "./load-more.html",
    standalone: false
})
export class BsLoadMore implements OnInit, OnDestroy {
  @Input() buttonsStyle = "outline-primary";
  @Input() actionsSize = "sm"

  private subscription: Subscription = new Subscription();
  loadMoreAction: IAction;
  hasMore = false;

  constructor(private searchService: SearchService) {
    this.loadMoreAction = new Action({
      text: "msg#facet.loadMore",
      title: "msg#facet.loadMore",
      action: (action) => {
        this.searchService.loadMore();
        action.update();
      },
      updater:() => {
        // hide button while fetching new data
        this.hasMore = false;
      }
    });
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
}