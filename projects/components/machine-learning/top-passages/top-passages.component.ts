import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Results, TopPassage, AuditEvent, AuditEventType, AuditWebService } from "@sinequa/core/web-services";
import { AbstractFacet } from '@sinequa/components/facet';
import { SearchService } from "@sinequa/components/search";
import { Action } from "@sinequa/components/action";
import { defaultSummarizerConfig, SummarizerConfig } from "../summary.component";
import { UserPreferences } from "@sinequa/components/user-settings";

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
  @Input() answersFirst: boolean;
  @Input() defaultSummarizerConfig?: SummarizerConfig;

  @Output() previewOpened = new EventEmitter<TopPassage>();
  @Output() titleClicked = new EventEmitter<{ item: TopPassage, isLink: boolean }>();

  passages?: TopPassage[];
  passagesToSummarize?: TopPassage[];
  documentsNb: number;

  summarizeAction = new Action({
    text: "Summarize",
    disabled: true,
    action: () => {
      this.passagesToSummarize = this.passages?.filter(p => p.$checked);
      this.summarizeAction.disabled = true;
      this.cdRef.detectChanges();
    }
  });
  _actions: Action[] = [this.summarizeAction];
  override get actions() { return this._actions; }

  constructor(
    private auditService: AuditWebService,
    private searchService: SearchService,
    public prefs: UserPreferences,
    public cdRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.documentsNb = 0;
    this.passagesToSummarize = undefined;
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

        if (this.answersFirst) {
          this.passages.sort(this.comparePassages);
        }

        this.passages.forEach((passage) => {
          passage.$record = passage.$record || records.find(record => record?.id === passage.recordId);
          passage.$checked = true;
        });

        this.passageChecked();

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

  passageChecked() {
    const count = this.passages?.filter(p => p.$checked).length;
    this.summarizeAction.disabled = !count;
    if(count) {
      this.summarizeAction.text = `Summarize (${count})`;
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

  get summarizerConfig(): SummarizerConfig {
    return this.prefs.get("summarizer-config")
      || this.defaultSummarizerConfig
      || defaultSummarizerConfig;
  }

  set summarizerConfig(config: SummarizerConfig) {
    this.prefs.set("summarizer-config", config);
  }

  summarizerConfigEdit: SummarizerConfig;
  override onOpenSettings(open: boolean) {
    if(open) {
      this.summarizerConfigEdit = {...this.summarizerConfig}; // Initialize edited object
    }
    else {
      this.summarizerConfig = this.summarizerConfigEdit;
    }
  }
}
