import { Injectable } from '@angular/core';
import { PreviewDocument, PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { AppService, Query } from '@sinequa/core/app-utils';
import { PreviewData, Results } from '@sinequa/core/web-services';
import { Record } from "@sinequa/core/web-services";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  query: Query = new Query('query');
  results: Results;
  pagesResults: Results;
  record: Record;
  previewData: PreviewData;
  previewDocument: PreviewDocument;

  constructor(private searchService: SearchService,
    private previewService: PreviewService,
    private appService: AppService) {

    this.query.text = '';
    this.query.action = 'search';
    this.query.page = 2;
    this.query.pageSize = 2;
    this.search();
  }

  search(): void {
    /** Trigger the search with the new criteria */
    this.searchService.getResults(this.query)
      .subscribe(results => {
        console.log('results', results);
        // results.page = 10; // for BsLoadMore
        this.results = results;
        this.results.tab = 'Tab1';
        this.searchService.setResults(this.results);
        if (results?.records?.length) {
          this.record = results.records[0];
          this.getPreviewData();
          console.log('record', this.record);
        }

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
              { name: 'Tab1', display: 'Tab1', value: 'value', isDefault: true, excludedIndices: '', excludedAggregations: '', sortingChoices: [
                // SORTING CHOICE ICI
              ] }
            ]
          };
          this.appService.ccquery.scopes = [
            { name: 'Scope1', },
            { name: 'Scope2' },
          ];
        }
      });
  }

  getPreviewData(): void {
    this.previewService.getPreviewData(this.record.id, this.query).subscribe(
      previewData => {
        this.previewData = previewData;
        const pageNumber = this.previewService.getPageNumber(previewData.record);
        if (pageNumber) {
          this.previewService.fetchPages(previewData.record.containerid!, this.query!)
            .subscribe(results => this.pagesResults = results);
        }
      });
  }
}
