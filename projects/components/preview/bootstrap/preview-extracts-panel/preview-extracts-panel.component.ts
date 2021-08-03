import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Subscription} from 'rxjs';

import { HighlightValue, PreviewData } from '@sinequa/core/web-services';
import {Action} from "@sinequa/components/action";

import { PreviewDocument } from '../../preview-document';
import {PreviewService} from '../../preview.service';

export class Extract {
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
export class BsPreviewExtractsPanelComponent implements OnChanges, OnDestroy {
  @Input() previewData: PreviewData;
  @Input() previewDocument: PreviewDocument;
  @Input() downloadUrl: string;
  @Input() style: "light"|"dark" = "light";
  @ViewChild("scrollViewport") cdkScrollViewport: CdkVirtualScrollViewport;

  sortAction : Action;
  extracts: Extract[] = [];
  currentIndex = -1;
  loading = false;
  loadCompleteSubscription: Subscription;

  constructor(
    @Inject(DOCUMENT) document: Document,
    private previewService: PreviewService,
    private cdr: ChangeDetectorRef,
    private domSanitizer: DomSanitizer) { }

  ngOnDestroy() {
    if(this.loadCompleteSubscription) {
      this.loadCompleteSubscription.unsubscribe();
    }
  }
    
  /**
   * Extracts the list of extracts from the preview document
   */
  ngOnChanges(changes: SimpleChanges) {
    this.extracts = [];
    if (this.previewData && this.previewDocument) {
      const extracts = this.previewData.highlightsPerCategory["extractslocations"]?.values; //Extract locations Array ordered by "relevance"
      if (!!extracts && extracts.length > 0) {
        this.extractAll(extracts, this.previewDocument);
        return;
      }
    }
    
    if(this.previewData && this.downloadUrl){
      const extracts = this.previewData.highlightsPerCategory["extractslocations"]?.values; //Extract locations Array ordered by "relevance"
      if(!!extracts && extracts.length > 0){
        this.loading = true;

        if (this.previewDocument) {
          this.extractAll(extracts, this.previewDocument)
        } else {
          this.previewService.getHtmlPreview(this.downloadUrl)
            .subscribe((value) => {
              const previewDocument = this.createDocument(value);
              this.extractAll(extracts, previewDocument);
            });
        }
      }
    }
  }
  
  private createDocument(value: string): PreviewDocument {
    const doc = document.implementation.createHTMLDocument("");
    doc.write(value);
    doc.close();
    let previewDocument = new PreviewDocument(doc);

    const count = previewDocument.document.querySelectorAll("[id^='extractslocations']").length;
    if (count === 0 && this.previewDocument) {
      // use previous document to retrieve extracts
      previewDocument = this.previewDocument;
    }
    
    return previewDocument;
  }

  private extractAll(extracts:HighlightValue[], previewDocument: PreviewDocument) {
    // Init the extracts Array and storing the relevancy index = i because extractsLocations is already ordered by relevance
    // but extract's text is sort by "start", that why text is set to empty here
    this.extracts = extracts[0].locations.map((el, i) => ({
      text: "",
      startIndex: el.start,
      relevanceIndex: i,  // used to sort by relevance index
      textIndex: 0
    }));

    // next sort the array by startIndex to extract the correct extract's text
    // and set the textIndex
    this.extracts.sort((a, b) => a.startIndex - b.startIndex) // Sorting by start index (text index)
    .forEach((el, i) => {
      el.text = this.sanitize(previewDocument.getHighlightText("extractslocations", i)); // get the text
      el.textIndex = i // Storing the TextIndex to be able to select extracts
    });

    // do not take item without text
    this.extracts = this.extracts.filter(el => el.text !== '');
    
    // finally sort extracts by relevance
    this.extracts.sort((a,b) => a.relevanceIndex - b.relevanceIndex);
    
    this.buildSortAction();
          
    this.loading = false;
    this.currentIndex = -1;
    this.cdr.detectChanges();
  }

  /**
   * Build Sort Action for Extracts
   * @param i 
   */
  buildSortAction(){
    this.sortAction = new Action({
      title: "msg#sortSelector.sortByTitle",
      text:  "msg#preview.relevanceSortHighlightButtonText",
      children: [
        new Action({
          icon: 'fas fa-sort-amount-down',
          text: "msg#preview.relevanceSortHighlightButtonText",
          action: (item: Action, event: Event) => {
            // return a new map to re-render the collection
            this.extracts = this.extracts.map(el => el).sort((a, b) => a.relevanceIndex - b.relevanceIndex);
            this.sortAction.text = item.text;
            this.currentIndex = -1;
            }
        }),
        new Action({
          icon: 'fas fa-sort-amount-down',
          text: "msg#preview.textOrderSortHighlightButtonText",
          action: (item: Action, event: Event) => {
            // return a new map to re-render the collection
            this.extracts = this.extracts.map(el => el).sort((a,b) => a.textIndex-b.textIndex);
            this.sortAction.text = item.text;
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
      this.previewDocument.selectHighlight("extractslocations", extract.textIndex);
    }
    return false;
  }

  /**
   * Sanitize the text of a HTML formatted extract
   * @param text
   */
  sanitize(text: string): SafeHtml | string {
    return text !== "" ? this.domSanitizer.bypassSecurityTrustHtml(text.replace(/sq\-current/, "")) : "";
  }

  /**
   * Select the previous extract in the list
   */
  previousExtract(){
    this.currentIndex--;
    this.scrollTo();
  }

  /**
   * Select the next extract in the list
   */
  nextExtract(){
    this.currentIndex++;
    this.scrollTo();
  }
  
  private scrollTo() {
    this.cdkScrollViewport.scrollToIndex(this.currentIndex);
    const extract = this.extracts[this.currentIndex];
    this.scrollExtract(extract);
  }
}
