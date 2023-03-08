import { Injectable } from '@angular/core';
import { PreviewDocument, PreviewService } from '@sinequa/components/preview';
import { AppService, Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { CCAutocomplete, CCLabels, PreviewData, Results } from '@sinequa/core/web-services';
import { Record } from "@sinequa/core/web-services";
import { filter, map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APP } from 'src/mocks/app';
import { RESULTS } from 'src/mocks/results';
import { DocSearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  query: Query = new Query('query');
  pagesResults: Results;
  previewData: PreviewData;
  previewDocument: PreviewDocument;

  private _results: Results;

  get results(): Results {
    return environment.mock ? RESULTS as any : this._results;
  }

  get records(): Record[] | undefined {
    return this.results?.records?.length ? this.results.records : undefined
  }

  get record(): Record | undefined {
    return this.records ? this.records[0] : undefined;
  }

  constructor(private searchService: DocSearchService,
    private previewService: PreviewService,
    private appService: AppService) {

    this.query.text = '';
    this.query.action = 'search';
    this.query.page = 2;
    this.query.pageSize = 2;
    if (!environment.mock) {
      this.search();
    } else {
      this.mockSetApp();
    }
  }

  search(): void {
    /** Trigger the search with the new criteria */
    this.searchService.getResults(this.query)
      .pipe(
        map((results => {
          this._results = results;
          this.results.tab = 'Tab1';
          this.searchService.setResults(this._results);

          this.appService.ccquery = {} as any;
          if (this.appService.ccquery) {
            this.appService.ccquery.tabSearch = {
              isActive: true,
              column: 'column',
              columnIsTree: true,
              totalIsSumOfTabTotals: true,
              loadAggregationsForSelectedTab: true,
              valueLevels: 5,
              postGroupBy: false,
              mergeGroups: false,
              tabs: [
                {
                  name: 'Tab1', display: 'Tab1', value: 'value', isDefault: true, excludedIndices: '', excludedAggregations: '', sortingChoices: [
                    { name: 'sortingChoice', description: 'description', display: 'choice1', orderByClause: 'test', isDefaultNoRelevance: true, isDefaultWithRelevance: true },
                    { name: 'sortingChoice', description: 'description', display: 'choice2', orderByClause: 'test', isDefaultNoRelevance: true, isDefaultWithRelevance: true }
                  ]
                }
              ]
            };
            this.appService.ccquery.scopes = [
              { name: 'Scope1', },
              { name: 'Scope2' },
            ];
          }
          return results.records;
        })),
        filter(records => (records?.length || 0) > 0),
        switchMap(records => this.getPreviewData())
      )
      .subscribe(pageResults => {
        this.pagesResults = pageResults;
      })
  }

  getPreviewData(): Observable<Results> {
    return this.previewService.getPreviewData(this.record!.id, this.query)
      .pipe(
        map(previewData => {
          this.previewData = previewData;
          const pageNumber = this.previewService.getPageNumber(previewData.record);
          return { record: previewData.record, pageNumber };
        }),
        filter(response => response.pageNumber === undefined),
        switchMap(({ record }) => this.previewService.fetchPages(record.containerid!, this.query))
      );
  }

  mockSetApp() {
    this.appService.app = APP as any;
    this.appService.cclabels = this.appService.getWebService<CCLabels>(this.appService.app!.labels);
    this.appService.ccautocomplete = this.appService.getWebService<CCAutocomplete>(this.appService.app!.autocomplete);
    // this.initDefaultQuery();
    // this.makeMaps();
    this.appService.suggestQueries = Utils.split(this.appService.ccautocomplete ? this.appService.ccautocomplete.suggestQueries : "", ",");
  }
}
