import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {PreviewData} from '@sinequa/core/web-services';
import {PreviewDocument} from '../../preview-document';

@Component({
  selector: 'sq-preview-minimap',
  templateUrl: './preview-minimap.component.html',
  styleUrls: ['./preview-minimap.component.css']
})
export class BsPreviewMinimapComponent implements OnChanges {
  locations?: {top: number, index: number}[];

  @Input() type = "extractslocations";
  @Input() previewDocument?: PreviewDocument;
  @Input() previewData?: PreviewData;

  ngOnChanges(changes: SimpleChanges): void {
    this.extractAll();
  }

  private extractAll() {
    this.locations = [];
    const extracts = this.previewData?.highlightsPerCategory[this.type]?.values; //Extract locations Array ordered by "relevance"
    if(extracts && extracts.length > 0 && this.previewDocument) {
      const max = this.previewDocument.document.body.scrollHeight || 1;

      // Init the extracts Array and storing the relevancy index = i because extractsLocations is already ordered by relevance
      this.locations = extracts[0]?.locations.map((el, index) => {
        let value = this.previewDocument!.getHighlightPos(this.type, index)?.top || -1;
        value = value - (this.previewDocument!.document.body.getBoundingClientRect()?.top || 1);
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
    this.previewDocument?.selectHighlight(this.type, index);
  }

}
