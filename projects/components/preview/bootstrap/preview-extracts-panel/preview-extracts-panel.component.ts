import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PreviewData } from '@sinequa/core/web-services';
import { PreviewDocument } from '../../preview-document';
import {Action} from "@sinequa/components/action";

export class Extract {
  text: SafeHtml; // Sanitized HTML text
  startIndex : number; // this is the start index of the extracts within the Document Text  
  relevanceIndex : number; // 0 the most relevant to N the less relevant
  textIndex : number; // index of the extract in the text. e.g 0 is the first extract displayed in the document
}

@Component({
  selector: 'sq-preview-extracts-panel',
  templateUrl: './preview-extracts-panel.component.html',
  styleUrls: ['./preview-extracts-panel.component.scss']
})
export class BsPreviewExtractsPanelComponent implements OnChanges {
  @Input() previewData: PreviewData;
  @Input() previewDocument: PreviewDocument;

  sortAction : Action;
  extracts: Extract[] = [];
  currentExtract = -1;

  constructor(
    private domSanitizer: DomSanitizer) { }

  /**
   * Extracts the list of extracts from the preview document
   */
  ngOnChanges() {
    if(this.previewData && this.previewDocument){
      const extracts = this.previewData.highlightsPerCategory["extractslocations"].values; //Extract locations Array ordered by "relevance"
      if(!!extracts && extracts.length > 0){

        var extractsLocations = extracts[0].locations;

        // Init the extracts Array and storing the relevancy index = i because extractsLocations is already ordered by relevance
        extractsLocations.forEach((el,i) => {
          this.extracts.push({
            text: "",
            startIndex: el.start,
            relevanceIndex: i,
            textIndex: 0
          })
        });

        
        this.extracts
        .sort((a,b)=> a.startIndex - b.startIndex) // Sorting by start index (text index)
        .forEach((el,i) => {
            el.text = this.sanitize(this.previewDocument.getHighlightText("extractslocations", i)) // Retrieving the text using getHighlightText
            el.textIndex = i // Storing the TextIndex to be able to select extracts
        }) 

        // Sorting by Relevance to display extract ordered by Relevance
        this.extracts.sort((a,b) => a.relevanceIndex-b.relevanceIndex);

        this.buildSortAction();
      }

      
    }
    else {
      this.extracts = [];
    }
    this.currentExtract = -1;
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
      ]
    });

    this.sortAction.children.push(new Action({
      icon: 'fas fa-sort-amount-down',
      text: "msg#preview.relevanceSortHighlightButtonText",
      action: (item: Action, event: Event) => {
          this.extracts.sort((a,b) => a.relevanceIndex-b.relevanceIndex);
          this.sortAction.text = item.text;
      }
    }));

    this.sortAction.children.push(new Action({
      icon: 'fas fa-sort-amount-down',
      text: "msg#preview.textOrderSortHighlightButtonText",
      action: (item: Action, event: Event) => {
          this.extracts.sort((a,b) => a.textIndex-b.textIndex);
          this.sortAction.text = item.text;
      }
    }));

  }

  /**
   * Scroll to a specific extract
   * @param i
   */
  scrollExtract(i: number){
    this.previewDocument.selectHighlight("extractslocations", i);
    return false;
  }

  /**
   * Sanitize the text of a HTML formatted extract
   * @param text
   */
  sanitize(text: string){
    return this.domSanitizer.bypassSecurityTrustHtml(text.replace(/sq\-current/, ""));
  }

  /**
   * Select the previous extract in the list
   */
  previousExtract(){
    this.currentExtract--;
    this.scrollExtract(this.extracts[this.currentExtract].textIndex);
  }

  /**
   * Select the next extract in the list
   */
  nextExtract(){
    this.currentExtract++;
    this.scrollExtract(this.extracts[this.currentExtract].textIndex);
  }
}
