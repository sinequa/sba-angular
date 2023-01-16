import { Injectable } from '@angular/core';
import { PreviewDocument, PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { Query } from '@sinequa/core/app-utils';
import { PreviewData, Results } from '@sinequa/core/web-services';
import { Record } from "@sinequa/core/web-services";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  query: Query = new Query('training_query');
  results: Results;
  record: Record;
  previewData: PreviewData;
  previewDocument: PreviewDocument;

  constructor(private searchService: SearchService,
    private previewService: PreviewService) {
      this.query.text = 'Paris';
    this.search();
  }

  search(): void {
    /** Trigger the search with the new criteria */
    this.searchService.getResults(this.query)
      .subscribe(results => {
        console.log('results', results);
        this.results = results;
        if (results?.records?.length) {
          this.record = results.records[0];
          this.getPreviewData();
          console.log('record', this.record);
        }
      });
  }

  getPreviewData(): void {
    this.previewService.getPreviewData(this.record.id, this.query).subscribe(
      previewData => {
        this.previewData = previewData;
      });
  }
}
