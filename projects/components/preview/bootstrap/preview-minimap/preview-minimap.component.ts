import { Component, Inject, Input } from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {HighlightValue, PreviewData} from '@sinequa/core/web-services';
import {PreviewDocument} from '../../preview-document';

@Component({
  selector: 'sq-preview-minimap',
  templateUrl: './preview-minimap.component.html',
  styleUrls: ['./preview-minimap.component.css']
})
export class BsPreviewMinimapComponent {
  locations?: {top: number, index: number}[];
  
  private _previewDocument: PreviewDocument;
  private _previewData:PreviewData;
  private _extracts: HighlightValue[];
  
  @Input()
  set previewDocument(value: PreviewDocument) {
    if(value !== undefined) {
      this._previewDocument = value;
      this.extractAll();
    }
  }
  get previewDocument(): PreviewDocument {
    return this._previewDocument;
  }
  
  @Input()
  set previewData(value: PreviewData) {
    if(value !== undefined) {
        this._previewData = value;
        this._extracts = this._previewData.highlightsPerCategory["extractslocations"]?.values; //Extract locations Array ordered by "relevance"
        this.extractAll();
    }
  }
  
  constructor(@Inject(DOCUMENT) document: Document) {}

  private extractAll() {
    if(this._extracts?.length > 0 && this._previewDocument) {
      const max = this.previewDocument.document.body.scrollHeight || 1;

      // Init the extracts Array and storing the relevancy index = i because extractsLocations is already ordered by relevance
      this.locations = this._extracts[0]?.locations.map((el, index) => {
        let value = this.previewDocument.getHighlightPos("extractslocations", index)?.top || -1;
        value = value - (this.previewDocument.document.body.getBoundingClientRect()?.top || 1);
        const top = ((value / max) * 99);
        
        return ({top, index});
      });
    }
  }

  /**
   * Scroll to the extract into the page using it's index value
   * @param index Extract index
   */
  jumpTo(index) {
    this.previewDocument.selectHighlight("extractslocations", index);
  }

}
