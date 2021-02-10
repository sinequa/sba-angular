import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { LoginService } from '@sinequa/core/login';
import { SearchService } from '@sinequa/components/search';
import { SavedQueriesService } from '../../saved-queries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sq-saved-queries-menu',
  templateUrl: './saved-queries-menu.component.html'
})
export class BsSavedQueriesMenuComponent implements OnInit, OnDestroy {
  @Input() searchRoute: string = "/search";
  @Input() icon: string = "far fa-save";
  @Input() autoAdjust: boolean = true;
  @Input() autoAdjustBreakpoint: string = 'xl';
  @Input() collapseBreakpoint: string = 'sm';
  @Input() size: string;

  menu: Action | undefined;

  // Saved queries actions
  manageAction: Action;
  saveAction: Action;

  constructor(
    public loginService: LoginService,
    public savedQueriesService: SavedQueriesService,
    public searchService: SearchService) {

    this.saveAction = new Action({
      text: "msg#savedQueries.saveCurrentQuery",
      title: "msg#savedQueries.saveCurrentQuery",
      action: () => { this.savedQueriesService.createSavedQueryModal(); }
    });

    this.manageAction = new Action({
      text: "msg#savedQueries.manageSavedQueries",
      title: "msg#savedQueries.manageSavedQueries",
      action: () => { this.savedQueriesService.manageSavedQueriesModal(); }
    });

  }

  ngOnInit() {
    this.updateMenu();
    this._savedQueriesSubscription = this.savedQueriesService.changes.subscribe({
      next: () => { this.updateMenu(); }
    });
    this._loginSubscription = this.loginService.events.subscribe(event => {
      if(event.type === "session-changed"){
        this.updateMenu();
      }
    });
    this._searchSubscription = this.searchService.resultsStream.subscribe(results => {
      this.updateMenu();
    });
  }

  private _savedQueriesSubscription: Subscription;
  private _loginSubscription: Subscription;
  private _searchSubscription: Subscription;
  ngOnDestroy(){
    if(this._savedQueriesSubscription){
      this._savedQueriesSubscription.unsubscribe();
    }
    if(this._loginSubscription){
      this._loginSubscription.unsubscribe();
    }
    if(this._searchSubscription){
      this._searchSubscription.unsubscribe();
    }
  }

  updateMenu() {

    if (!this.loginService.complete) {
      this.menu = undefined;
      return;
    }

    const savedQueriesActions: Action[] = [];

    if (this.savedQueriesService.hasSavedQuery) {
        const scrollGroup = new Action({
            scrollGroup: true,
            children: this.savedQueriesService.savedqueries.map(savedQuery => new Action({
              text: savedQuery.name,
              title: savedQuery.name,
              data: savedQuery,
              action: item => this.savedQueriesService.searchSavedQuery(item.data, this.searchRoute)
          }))
        });
        savedQueriesActions.push(scrollGroup);
    }

    if (!!this.searchService.results) {
      savedQueriesActions.push(this.saveAction);
    }

    if (this.savedQueriesService.hasSavedQuery) {
      savedQueriesActions.push(this.manageAction);
    }

    this.menu = new Action({
        icon: this.icon,
        text: "msg#savedQueries.savedQueries",
        children: savedQueriesActions
    });
  }
}
