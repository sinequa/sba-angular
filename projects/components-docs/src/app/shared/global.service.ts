import { Injectable } from '@angular/core';
import { Action, ActionSeparator } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';
import { AppService, Query } from '@sinequa/core/app-utils';
import { PreviewData, Results } from '@sinequa/core/web-services';
import { Record } from "@sinequa/core/web-services";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  query: Query = new Query('query');
  results: Results;
  previewData: PreviewData;
  // previewDocument: PreviewDocument;

  loading = true;

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
    private appService: AppService) {

    this.query.text = environment.mock ? 'text' : '';
    this.query.action = 'search';
    this.query.page = 2;
    this.query.pageSize = 2;
    if (environment.mock) {
      this.appService.init().subscribe(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
    this.search();
  }

  search(): void {
    /** Trigger the search with the new criteria */
    this.searchService.getResults(this.query)
      .subscribe(results => this.results = results);
  }
}
