import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Results, TopPassage, AuditEvent, AuditEventType, AuditWebService } from "@sinequa/core/web-services";
import { AbstractFacet } from '@sinequa/components/facet';
import { BehaviorSubject } from "rxjs";
import { SearchService } from "@sinequa/components/search";

@Component({
  selector: 'sq-top-passages',
  templateUrl: 'top-passages.component.html',
  styleUrls: ['./top-passages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPassagesComponent extends AbstractFacet {
  @Input() set results(results: Results) {
    // extract top passages from Results object
    this.passages = results.topPassages?.passages || [];
    this.fetchPassagesRecords();
  }
  @Input() hideDate: boolean = false;
  @Input() dateFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  @Input() answersFirst: boolean;
  @Input() passagesToSummarize: TopPassage[];

  @Output() checkedPassages = new EventEmitter<TopPassage[]>();
  @Output() previewOpened = new EventEmitter<TopPassage>();
  @Output() titleClicked = new EventEmitter<{ item: TopPassage, isLink: boolean }>();

  passages: TopPassage[];
  currentPassages$: BehaviorSubject<TopPassage[]> = new BehaviorSubject<TopPassage[]>([]);
  documentsNb: number;

  constructor(
    private auditService: AuditWebService,
    private searchService: SearchService
  ) {
    super();
  }

  fetchPassagesRecords(): void {
    this.documentsNb = 0;
    this.searchService.getRecords(this.passages.filter(p => !p.$record).map(p => p.recordId))
      .subscribe((records) => {
        setTimeout(() => { // to make sure answersFirst is resolved
          if (this.answersFirst) {
            this.passages.sort(this.comparePassages);
          }

          this.passages.map((passage, index) => {
            passage.$record = passage.$record || records.find(record => record.id === passage?.recordId);
            passage.$checked = index < 10;
            return passage;
          });

          this.checkedPassages.emit(this.passages.filter(p => p.$checked));
          this.notifyTopPassagesDisplay(this.passages);
          this.currentPassages$.next(this.passages);

          // Set the numbers of unique documents
          const uniqueRecords = [...new Set(this.passages.map(p => p.recordId))];
          this.documentsNb = uniqueRecords.length;
        });
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

  passageChecked(event: Event): void {
    event.stopPropagation();
    setTimeout(() => {
      this.checkedPassages.emit(this.passages.filter(p => p.$checked));
    });
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
    const rank = this.passages.indexOf(passage);
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

  // sort passages to have the ones with an answer first, ordered by answer score
  private comparePassages(a: TopPassage, b: TopPassage) {
    const aAnswer: boolean = !!a.answer && !!a.answerScore;
    const bAnswer: boolean = !!b.answer && !!b.answerScore;
    if (aAnswer && !bAnswer) {
      return -1;
    }
    if (bAnswer && !aAnswer) {
      return 1;
    }
    if (aAnswer && bAnswer) {
      return a.answerScore! > b.answerScore! ? -1 : 1;
    }
    return 0;
  }

}
