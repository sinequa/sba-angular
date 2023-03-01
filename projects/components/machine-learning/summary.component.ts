import { ChangeDetectionStrategy, Component, Input, OnChanges } from "@angular/core";
import { JsonMethodPluginService, TopPassage } from "@sinequa/core/web-services";
import { map, Observable, tap } from "rxjs";

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

  loading = false;
  summary$?: Observable<string>;

  constructor(
    public jsonMethodWebService: JsonMethodPluginService
  ){}

  ngOnChanges() {
    if(this.passages) {
      this.fetchSummary(this.passages);
    }
  }

  private fetchSummary(passages: TopPassage[]): void {
    this.loading = true;
    const data = {
      debug: true,
      extendBefore: 0,
      extendAfter: 0,
      removeOverlap: true,
      removeDuplicates: true,
      passages: passages.map(p => ({docId: p.recordId, passageIndex: p.id, index: p.index}))
    }
    this.summary$ = this.jsonMethodWebService.post("OpenAITextDavinci3", data).pipe(
      map((res) => res.summary),
      tap(() => this.loading = false)
    );
  }
}
