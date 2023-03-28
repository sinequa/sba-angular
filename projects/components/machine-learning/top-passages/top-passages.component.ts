import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Results, TopPassage, AuditEvent, AuditEventType, AuditWebService } from "@sinequa/core/web-services";
import { AbstractFacet } from '@sinequa/components/facet';
import { SearchService } from "@sinequa/components/search";

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

  @Output() previewOpened = new EventEmitter<TopPassage>();
  @Output() titleClicked = new EventEmitter<{ item: TopPassage, isLink: boolean }>();

  passages?: TopPassage[];
  documentsNb: number;

  constructor(
    private auditService: AuditWebService,
    private searchService: SearchService,
    public cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.documentsNb = 0;
    this.passages = undefined;
    if(this.results.topPassages?.passages?.length) {
      this.fetchPassagesRecords(this.results.topPassages.passages);
    }
  }

  fetchPassagesRecords(passages: TopPassage[]): void {
    const ids = passages.filter(p => !p.$record).map(p => p.recordId);
    this.searchService.getRecords(ids)
      .subscribe((records) => {
        this.passages = passages;

        this.passages.forEach((passage) => {
          passage.$record = passage.$record || records.find(record => record?.id === passage.recordId);
        });

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
    this.previewOpened.next(passage);
  }

  // Open the big preview on title click
  onTitleClicked(isLink: boolean, passage: TopPassage) {
    this.notifyTopPassagesClick(passage);
    this.titleClicked.next({ item: passage, isLink });
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
    return {
      type,
      detail: {
        querytext: this.searchService.query.text,
        recordid: passage.recordId,
        passageid: passage.id,
        score: passage.score,
        rank
      }
    };
  }

}
