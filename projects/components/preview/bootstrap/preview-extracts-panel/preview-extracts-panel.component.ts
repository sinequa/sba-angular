import { Component, Input, OnChanges } from '@angular/core';
import { PreviewDocument } from '../../preview-document';
import { DomSanitizer } from '@angular/platform-browser';
import { PreviewData } from '@sinequa/core/web-services';

@Component({
  selector: 'sq-preview-extracts-panel',
  templateUrl: './preview-extracts-panel.component.html',
  styleUrls: ['./preview-extracts-panel.component.scss']
})
export class BsPreviewExtractsPanelComponent implements OnChanges {
  @Input() previewData: PreviewData;
  @Input() previewDocument: PreviewDocument;

  extracts: string[] = [];

  constructor(
    private domSanitizer: DomSanitizer) { }

  /**
   * Extracts the list of extracts from the preview document
   */
  ngOnChanges() {
    if(this.previewData && this.previewDocument){
      const extracts = this.previewData.highlightsPerCategory["extractslocations"].values;
      if(!!extracts && extracts.length > 0){
        this.extracts = extracts[0].locations.map((_, i) => this.previewDocument.getHighlightText("extractslocations", i));
      }
    }
    else {
      this.extracts = [];
    }
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

}
