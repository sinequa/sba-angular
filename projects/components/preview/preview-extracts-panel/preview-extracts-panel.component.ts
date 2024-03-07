import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { PreviewData } from '@sinequa/core/web-services';
import { Action } from "@sinequa/components/action";
import { Preview, PreviewHighlightColors } from '../preview.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

export type Extract = {
  id: string,
  text: SafeHtml, // Sanitized HTML text
  startIndex : number, // this is the start index of the extracts within the Document Text
  relevanceIndex : number, // 0 the most relevant to N the less relevant
  textIndex : number // index of the extract in the text. e.g 0 is the first extract displayed in the document
}

type ExtractsLocations = Extract & {
  text: string // HTML text
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

      // first extract all the extracts locations
      let extractslocations = locations.map((l, relevanceIndex) => ({
        startIndex: l.start,
        relevanceIndex
      })) as ExtractsLocations[];

      // sort them by start index
      extractslocations.sort((a,b) => a.startIndex - b.startIndex);

      // then extract the text of each extract
      extractslocations  = extractslocations.map((ex,textIndex) =>  ({
        ...ex,
        textIndex: textIndex,
        text: extracts[textIndex] || "",
        id: `${this.type}_${textIndex}`,
      }));

      // then sanitize the text and remove empty extracts
      this.extracts = extractslocations.filter(item => item.text.trim().length > 0).map(item =>  ({
        ...item,
        text: this.sanitizer.bypassSecurityTrustHtml(item.text)
      }));


      // finally sort them by relevance index
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
          action: item => this.updateSort(item.text!, 'relevanceIndex')
        }),
        new Action({
          icon: 'fas fa-sort-amount-down',
          text: "msg#preview.textOrderSortHighlightButtonText",
          action: item => this.updateSort(item.text!, 'textIndex')
        })
      ]
    });

  }

  updateSort(text: string, key: 'textIndex' | 'relevanceIndex') {
    // return a new map to re-render the collection
    this.extracts = this.extracts.map(el => el).sort((a, b) => a[key] - b[key]);
    this.sortAction.text = text;
    this.sortAction.messageParams = { values: { text } };
    this.currentIndex = 0;
    this.scrollExtract(this.extracts[0]);
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
