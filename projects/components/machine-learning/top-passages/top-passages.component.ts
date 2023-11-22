import { delay } from "rxjs";

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

import { AbstractFacet } from '@sinequa/components/facet';
import { SearchService } from "@sinequa/components/search";
import { AuditEvent, AuditEventType, AuditWebService, Record, Results, TopPassage } from "@sinequa/core/web-services";

@Component({
  selector: 'sq-top-passages',
  templateUrl: 'top-passages.component.html',
  styleUrls: ['./top-passages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPassagesComponent extends AbstractFacet implements OnChanges {
  @Input() results: Results;
  @Input() hideDate: boolean = false;
  @Input() dateFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  @Output() passageClicked = new EventEmitter<TopPassage>();
  @Output() documentOpened = new EventEmitter<Record>();

  passages?: TopPassage[];
  documentsNb: number;

  constructor(
    private auditService: AuditWebService,
    private searchService: SearchService,
    public cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnChanges(): void {
    this.documentsNb = 0;
    this.passages = undefined;
    if(this.results.topPassages?.passages?.length) {
      this.fetchPassagesRecords(this.results.topPassages.passages);
    }
  }

  fetchPassagesRecords(passages: TopPassage[]): void {
    const ids = passages.filter(p => !p.$record).map(p => p.recordId);
    this.searchService.getRecords(ids)
      .pipe(delay(0)) // Force async refresh of the view to scroll to the top
      .subscribe((records) => {
        // Post process passages
        this.passages = passages
          // Fill missing records
          .map(p => ({...p, $record: p.$record || records.find(record => record?.id === p.recordId)}))
          // Remove records that cannot be retrieved
          .filter(p => p.$record)
          // Put answers first
          .sort((a, b) => (b.answerScore ? (b.answerScore + 100) : b.score)
                        - (a.answerScore ? (a.answerScore + 100) : a.score));

        this.notifyTopPassagesDisplay(this.passages);

        // Set the numbers of unique documents
        const uniqueRecords = [...new Set(this.passages.map(p => p.recordId))];
        this.documentsNb = uniqueRecords.length;

        this.cdRef.detectChanges();
      });
  }

  // Open the mini preview on text click
  openPreview(passage: TopPassage) {
    this.notifyTopPassagesClick(passage);
    this.passageClicked.emit(passage);
  }

  // Open the big preview on title click
  onTitleClicked(isLink: boolean, passage: TopPassage) {
    this.notifyTopPassagesClick(passage);
    // If isLink === true, then we are navigating outside the app
    if(!isLink && passage.$record) {
      this.documentOpened.emit(passage.$record);
    }
  }

  private notifyTopPassagesClick(passage: TopPassage) {
    const auditEvent: AuditEvent = this.makeAuditEvent(AuditEventType.TopPassages_Click, passage);
    this.auditService.notify(auditEvent);
  }

  private notifyTopPassagesDisplay(passages: TopPassage[]) {
    const auditEvents: AuditEvent[] = passages
      .map((passage: TopPassage) => this.makeAuditEvent(AuditEventType.TopPassages_Display, passage));
    this.auditService.notify(auditEvents);
  }

  private makeAuditEvent(type: string, passage: TopPassage): AuditEvent {
    const rank = this.passages?.indexOf(passage);
    const answer = !!passage.answer;
    return {
      type,
      detail: {
        querytext: this.searchService.query.text,
        recordid: passage.recordId,
        passageid: passage.id,
        score: passage.score,
        rank,
        answer
      }
    };
  }

  public override isHidden(): boolean {
    return !this.passages?.length;
  }
}
