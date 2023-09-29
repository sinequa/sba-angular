import { Injectable } from '@angular/core';
import { Action, ActionSeparator } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';
import { AppService, Query } from '@sinequa/core/app-utils';
import { LoginService } from '@sinequa/core/login';
import { PreviewData, Results } from '@sinequa/core/web-services';
import { Record } from "@sinequa/core/web-services";
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  query: Query = new Query('query');
  results: Results;
  previewData: PreviewData;
  // previewDocument: PreviewDocument;

  //loading = true;
  loading = new BehaviorSubject<boolean>(true);

  actions: Action[] = [
    new Action({
      icon: "fas fa-sync",
      title: "action 2",
      action: () => { }
    }),
    new Action({
      icon: "fas fa-shield-alt",
      title: "action 1",
      children: [
        new Action({
          text: "sub action 1",
          action: () => { }
        }),
        new Action({
          text: "sub action 2",
          action: () => { }
        }),
        ActionSeparator,
        new Action({
          text: "sub action 3",
          action: () => { }
        })
      ]
    })
  ];

  get records(): Record[] | undefined {
    return this.results?.records?.length ? this.results.records : undefined
  }

  get record(): Record | undefined {
    return this.records ? this.records[0] : undefined;
  }

  constructor(private searchService: SearchService,
    public loginService: LoginService,
    private appService: AppService) {

    this.query.text = environment.mock ? 'text' : '';
    this.query.action = 'search';
    this.query.page = 2;
    this.query.pageSize = 2;

    this.loginService.events.pipe(
        filter(event => event.type === "login-complete" || event.type === "session-changed"),
        switchMap(() => this.appService.init())
    ).subscribe(
        (data) =>  {
            this.search();
            this.loading.next(false);
        });
  }

  search(): void {
    /** Trigger the search with the new criteria */
    this.searchService.getResults(this.query)
      .subscribe(results => this.results = results);
  }
}
