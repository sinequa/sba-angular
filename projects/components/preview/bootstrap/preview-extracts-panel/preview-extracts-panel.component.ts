import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PreviewData } from '@sinequa/core/web-services';
import { PreviewDocument } from '../../preview-document';

export class Extract {
  text: string;
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
          this.extracts[i] = {
            text: "",
            startIndex: el.start,
            relevanceIndex: i,
            textIndex: 0
          }
        });

        // Sorting by start index (text index)
        this.extracts.sort((a,b)=> a.startIndex - b.startIndex);
        // Retrieving the text using getHighlightText
        this.extracts.forEach((el,i) => {this.extracts[i].text = this.previewDocument.getHighlightText("extractslocations", i)});
        // Storing the TextIndex to be able to select extracts
        this.extracts.forEach((el,i) => {this.extracts[i].textIndex = i});
        // Sorting by Relevance to display extract ordered by Relevance
        this.extracts.sort((a,b) => a.relevanceIndex-b.relevanceIndex);

      }

      
    }
    else {
      this.extracts = [];
    }
    this.currentExtract = -1;
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
