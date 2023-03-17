import { Injectable } from '@angular/core';
import { PreviewDocument, PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { AppService, Query } from '@sinequa/core/app-utils';
import { PreviewData, Results } from '@sinequa/core/web-services';
import { Record } from "@sinequa/core/web-services";
import { filter, map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  query: Query = new Query('query');
  results: Results;
  pagesResults: Results;
  previewData: PreviewData;
  previewDocument: PreviewDocument;

  loading = true;

  get records(): Record[] | undefined {
    return this.results?.records?.length ? this.results.records : undefined
  }

  get record(): Record | undefined {
    return this.records ? this.records[0] : undefined;
  }

  constructor(private searchService: SearchService,
    private previewService: PreviewService,
    private appService: AppService) {

    this.query.text = '';
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
      .pipe(
        map((results => {
          this.results = results;
          return results.records;
        })),
        filter(records => (records?.length || 0) > 0),
        switchMap(() => this.getPreviewData())
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
}
