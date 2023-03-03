import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { JsonMethodPluginService, TopPassage } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { map, Observable, tap } from "rxjs";

export interface SummarizerConfig {
  extendBefore: number;
  extendAfter: number;
  modelTemperature: number;
  promptBefore: string;
  promptAfter: string;
}

export const defaultConfig: SummarizerConfig = {
  extendBefore: 0,
  extendAfter: 0,
  modelTemperature: 0.7,
  promptBefore: "The below passages are extracts from documents returned by a search engine. Your job is to summarize these passages in order to provide an answer to the following query: {queryText}",
  promptAfter: ""
}

@Component({
  selector: 'sq-summary',
  template: `
  <div class="spinner-grow text-success d-block mx-auto my-5" role="status" *ngIf="loading">
    <span class="visually-hidden">Loading...</span>
  </div>

  <div *ngIf="summary$ | async as summary">
    <div><b>Generated summary:</b></div>
    <p class="m-0" [innerHTML]="summary"></p>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnChanges {
  @Input() passages?: TopPassage[];
  @Input() config = defaultConfig;

  loading = false;
  summary$?: Observable<string>;

  constructor(
    public jsonMethodWebService: JsonMethodPluginService,
    public searchService: SearchService
  ){}

  ngOnChanges() {
    if(this.passages) {
      this.fetchSummary(this.passages);
    }
    else {
      delete this.summary$;
      this.loading = false;
    }
  }

  private fetchSummary(passages: TopPassage[]): void {
    this.loading = true;
    const data = {
      debug: true,
      ...this.config,
      removeOverlap: true,
      removeDuplicates: true,
      promptInsertBeforePassages: this.config.promptBefore.replace(/{queryText}/g, this.searchService.query.text || ''),
      promptInsertAfterPassages: this.config.promptAfter.replace(/{queryText}/g, this.searchService.query.text || ''),
      queryText: this.searchService.query.text || '',
      passages: passages.map(p => ({docId: p.recordId, passageIndex: p.id, index: p.index}))
    }
    this.summary$ = this.jsonMethodWebService.post("OpenAITextDavinci3", data).pipe(
      map((res) => res.summary),
      tap(() => this.loading = false)
    );
  }
}
