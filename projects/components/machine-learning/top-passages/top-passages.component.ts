import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { Results, TopPassage, AuditEvent, AuditEventType, AuditWebService } from "@sinequa/core/web-services";
import { AbstractFacet } from '@sinequa/components/facet';
import { BehaviorSubject } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
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

    // reset values
    this.currentPage = 0;
    const pages = this.passages.length / this.itemsPerPage;
    this.pageNumber = this.itemsPerPage === 1
      ? this.passages.length
      : (pages % 1 === 0 ? pages : Math.floor(pages) + 1);
  }
  @Input() collapsed: boolean;
  @Input() hideDate: boolean = false;
  @Input() dateFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  // Number of passages per page
  @Input() itemsPerPage = 3;

  // Number of lines displayed for each passages text
  @Input() lineNumber = 3;

  @Output() previewOpened = new EventEmitter<TopPassage>();
  @Output() titleClicked = new EventEmitter<{ item: TopPassage, isLink: boolean }>();

  passages: TopPassage[];
  page: number;
  pageNumber: number;
  currentPassages$: BehaviorSubject<TopPassage[]> = new BehaviorSubject<TopPassage[]>([]);
  selected: number;

  // Used to know if we should display the expand chevron
  MIN_HEIGHT: number;

  get currentPage() {
    return this.page;
  }

  set currentPage(page: number) {
    this.page = page;

    // Get the records of the passages without it
    const index = page * this.itemsPerPage;
    const passages = this.passages.slice(index, index + this.itemsPerPage);
    this.searchService.getRecords(passages.filter(p => !p.$record).map(p => p.recordId))
      .subscribe((records) => {
        passages.map(passage => passage.$record = passage.$record || records.find(record => record?.id === passage.recordId));
        this.notifyTopPassagesDisplay(passages);
        this.currentPassages$.next(passages);
      });
  }

  // Get the range of passages displayed to display in the pagination
  get currentRange() {
    if (this.itemsPerPage === 1) {
      return this.currentPage + 1;
    }

    const from = this.currentPage * this.itemsPerPage + 1;
    const to = this.currentPage * this.itemsPerPage + this.itemsPerPage > this.passages.length ? this.passages.length : this.currentPage * this.itemsPerPage + this.itemsPerPage;
    return from < to ? `${from}-${to}` : String(from);
  }

  // Used to handle dynamically the lines number per passage
  @HostBinding("attr.style")
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--line-clamp: ${this.lineNumber}`);
  }

  constructor(private sanitizer: DomSanitizer,
    private auditService: AuditWebService,
    private searchService: SearchService) {
    super();
    this.setMinHeight();
  }

  // Expand one passage's text
  expand(passage: TopPassage) {
    if (this.selected !== passage.id) {
      this.selected = passage.id;
    } else {
      this.selected = -1;
    }
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

  // Calculation of the height for the display of the expand icon
  private setMinHeight() {
    const lineHeight = window.getComputedStyle(document.body).getPropertyValue('line-height') || '24';
    this.MIN_HEIGHT = parseFloat(lineHeight) * (this.lineNumber === 0 ? 1000 : this.lineNumber || 1);
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
}
