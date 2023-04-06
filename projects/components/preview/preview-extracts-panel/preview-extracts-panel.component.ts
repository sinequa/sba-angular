import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { PreviewData } from '@sinequa/core/web-services';
import { Action } from "@sinequa/components/action";
import { Preview, PreviewHighlightColors } from '../preview.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

export class Extract {
  id: string;
  text: SafeHtml; // Sanitized HTML text
  startIndex : number; // this is the start index of the extracts within the Document Text
  relevanceIndex : number; // 0 the most relevant to N the less relevant
  textIndex : number; // index of the extract in the text. e.g 0 is the first extract displayed in the document
}

@Component({
  selector: 'sq-preview-extracts-panel',
  templateUrl: './preview-extracts-panel.component.html',
  styleUrls: ['./preview-extracts-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewExtractsPanelComponent implements OnChanges, OnDestroy {
  @Input() previewData: PreviewData;
  @Input() preview: Preview;
  @Input() type = "extractslocations";
  @Input() highlights: PreviewHighlightColors[];

  /** Whether the extracts pagination should be displayed at the footer of the side menu */
  @Input() showPagination = true;

  /** The number of items per page */
  @Input() extractsNumber: number = 10;

  extracts: Extract[] = [];
  displayedExtracts: Extract[] = [];
  sortAction: Action;
  currentIndex = -1;
  scrollIndex: number;
  loading = false;

  constructor(
    public cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer
  ) { }

  /**
   * Extracts the list of extracts from the preview document
   */
  ngOnChanges(changes: SimpleChanges) {
    if(changes.previewData && this.previewData) {
      this.fetchExtracts(this.previewData);
    }
    if(this.preview && !this.sub) {
      this.sub = this.preview.selectedId$.subscribe(() => this.updateCurrentIndex());
    }
  }

  sub?: Subscription;
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private fetchExtracts(data: PreviewData) {
    this.loading = true;
    this.preview.getHtml(this.type).subscribe(extracts => {
      // extracts contains the html of extracts in chronological order
      // locations contains the list of start positions sorted by score
      const locations = data.highlightsPerCategory[this.type]?.values[0]?.locations || [];

      this.extracts = locations.map((l, relevanceIndex) => ({
        startIndex: l.start,
        relevanceIndex
      })) as Extract[];

      this.extracts.sort((a,b) => a.startIndex - b.startIndex);

      this.extracts.forEach((ex,textIndex) => {
        ex.textIndex = textIndex;
        ex.text = this.sanitizer.bypassSecurityTrustHtml(extracts[textIndex]);
        ex.id = `${this.type}_${textIndex}`;
      });

      this.extracts.sort((a,b) => a.relevanceIndex - b.relevanceIndex);

      this.loading = false;
      this.buildSortAction();
      this.updateCurrentIndex();
    });
  }

  updateCurrentIndex() {
    const selectedId = this.preview.selectedId$.getValue();
    this.currentIndex = this.extracts.length && selectedId ? this.extracts.findIndex(e => e.id === selectedId) : -1;
    this.cdr.detectChanges();
  }

  /**
   * Build Sort Action for Extracts
   * @param i
   */
  buildSortAction() {
    this.sortAction = new Action({
      icon: 'fas fa-sort-amount-down',
      title: "msg#sortSelector.sortByTitle",
      messageParams: { values: { text: "msg#preview.relevanceSortHighlightButtonText" } },
      text: "msg#preview.relevanceSortHighlightButtonText",
      children: [
        new Action({
          icon: 'fas fa-sort-amount-down',
          text: "msg#preview.relevanceSortHighlightButtonText",
          action: item => {
            // return a new map to re-render the collection
            this.extracts = this.extracts.map(el => el).sort((a, b) => a.relevanceIndex - b.relevanceIndex);
            this.sortAction.text = item.text;
            this.sortAction.messageParams = { values: { text: item.text } };
            this.currentIndex = 0;
            this.scrollExtract(this.extracts[0]);
          }
        }),
        new Action({
          icon: 'fas fa-sort-amount-down',
          text: "msg#preview.textOrderSortHighlightButtonText",
          action: item => {
            // return a new map to re-render the collection
            this.extracts = this.extracts.map(el => el).sort((a, b) => a.textIndex - b.textIndex);
            this.sortAction.text = item.text;
            this.sortAction.messageParams = { values: { text: item.text } };
            this.currentIndex = 0;
            this.scrollExtract(this.extracts[0]);
          }
        })
      ]
    });

  }

  /**
   * Scroll to a specific extract
   * @param i
   */
  scrollExtract(extract: Extract) {
    // extracts are always at textIndex position whatever the sort
    this.preview.select(`${this.type}_${extract.textIndex}`);
  }


  /**
   * Select the previous extract in the list
   */
  previousExtract() {
    this.currentIndex--;
    this.scrollIndex = this.currentIndex;
    this.scrollExtract(this.displayedExtracts[this.currentIndex]);
  }

  /**
   * Select the next extract in the list
   */
  nextExtract() {
    this.currentIndex++;
    this.scrollIndex = this.currentIndex;
    this.scrollExtract(this.displayedExtracts[this.currentIndex]);
  }
}
