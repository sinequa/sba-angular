import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PreviewData } from '@sinequa/core/web-services';
import { Action } from "@sinequa/components/action";

import { PreviewDocument } from '../../preview-document';
import { PreviewService, Extract } from '../../preview.service';


@Component({
  selector: 'sq-preview-extracts-panel',
  templateUrl: './preview-extracts-panel.component.html',
  styleUrls: ['./preview-extracts-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsPreviewExtractsPanelComponent implements OnChanges {
  @Input() previewData: PreviewData;
  @Input() previewDocument: PreviewDocument;
  @Input() downloadUrl: string;
  @Input() type = "extractslocations";
  @Input() style: "light" | "dark" = "light";

  /**
   * Whether the extracts pagination should be displayed at the footer of the side menu
   */
  @Input() showPagination = true;

  /**
   * The number of items per page
   */
  @Input() extractsNumber: number = 10;

  extracts: Extract[] = [];
  displayedExtracts: Extract[] = [];
  sortAction: Action;
  currentIndex = -1;
  scrollIndex: number;
  loading = false;

  constructor(
    private previewService: PreviewService,
    private cdr: ChangeDetectorRef) { }

  /**
   * Extracts the list of extracts from the preview document
   */
  ngOnChanges(changes: SimpleChanges) {
    this.extracts = [];
    if (this.previewData) {
      // HTML document already available
      if (this.previewDocument) {
        this.extractAll(this.previewData, this.previewDocument);
      }
      // This component can also directly download and parse the HTML itself
      else if (this.downloadUrl) {
        this.loading = true;
        this.previewService.getHtmlPreview(this.downloadUrl)
          .subscribe((value) => {
            const previewDocument = this.createDocument(value);
            this.extractAll(this.previewData, previewDocument);
          });
      }
    }
  }

  private createDocument(value: string): PreviewDocument {
    const doc = document.implementation.createHTMLDocument("");
    doc.write(value);
    doc.close();
    let previewDocument = new PreviewDocument(doc);

    const count = previewDocument.document.querySelectorAll(`[id^='${this.type}']`).length;
    if (count === 0 && this.previewDocument) {
      // use previous document to retrieve extracts
      previewDocument = this.previewDocument;
    }

    return previewDocument;
  }

  private extractAll(previewData: PreviewData, previewDocument: PreviewDocument) {
    this.extracts = this.previewService.getExtracts(previewData, previewDocument, this.type);

    this.buildSortAction();

    this.loading = false;
    this.currentIndex = this.extracts.length ? this.extracts[0].relevanceIndex : -1;
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
          action: (item: Action, event: Event) => {
            // return a new map to re-render the collection
            this.extracts = this.extracts.map(el => el).sort((a, b) => a.relevanceIndex - b.relevanceIndex);
            this.sortAction.text = item.text;
            this.sortAction.messageParams = { values: { text: item.text } };
            this.currentIndex = -1;
          }
        }),
        new Action({
          icon: 'fas fa-sort-amount-down',
          text: "msg#preview.textOrderSortHighlightButtonText",
          action: (item: Action, event: Event) => {
            // return a new map to re-render the collection
            this.extracts = this.extracts.map(el => el).sort((a, b) => a.textIndex - b.textIndex);
            this.sortAction.text = item.text;
            this.sortAction.messageParams = { values: { text: item.text } };
            this.currentIndex = -1;
          }
        })
      ]
    });

  }

  /**
   * Scroll to a specific extract
   * @param i
   */
  scrollExtract(extract: Extract, index?: number) {
    if (index !== undefined) {
      this.currentIndex = index;
    }

    if (this.previewDocument) {
      // extracts are always at textIndex position whatever the sort
      this.previewDocument.selectHighlight(this.type, extract.textIndex);
    }
    return false;
  }


  /**
   * Select the previous extract in the list
   */
  previousExtract() {
    this.currentIndex--;
    this.scrollIndex = this.currentIndex;
    this.scrollExtract(this.extracts[this.currentIndex]);
  }

  /**
   * Select the next extract in the list
   */
  nextExtract() {
    this.currentIndex++;
    this.scrollIndex = this.currentIndex;
    this.scrollExtract(this.extracts[this.currentIndex]);
  }
}
