import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {PreviewData} from '@sinequa/core/web-services';
import {PreviewDocument} from '../../preview-document';

@Component({
  selector: 'sq-preview-minimap',
  templateUrl: './preview-minimap.component.html',
  styleUrls: ['./preview-minimap.component.css']
})
export class BsPreviewMinimapComponent implements OnChanges {
  locations?: {top: number, height: number | undefined, index: number}[];

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
        const highlightPos = this.previewDocument!.getHighlightPos(this.type, index);
        const firstNode = highlightPos ? highlightPos[0].getBoundingClientRect() : undefined;
        const lastNode = highlightPos ? highlightPos[highlightPos.length - 1].getBoundingClientRect() : undefined;
        const value = (firstNode?.top || -1) - (this.previewDocument!.document.body.getBoundingClientRect()?.top || 1);

        // Determining the bottom position of the highlight location
        // also making sure it does not cross the following one by stopping before if needed
        const isLast = index === (extracts[0]?.locations.length - 1);
        let bottom = lastNode?.bottom;
        if (!isLast && bottom) {
          const nextPos = this.previewDocument!.getHighlightPos(this.type, index+1);
          const nextPosTop = !nextPos ? undefined : nextPos[0].getBoundingClientRect()?.top;
          if (nextPosTop) {
            bottom = nextPosTop < bottom ? nextPosTop + 2 : bottom;
          }
        }

        const top = ((value / max) * 99);
        const height = !bottom || !firstNode ? undefined : ((bottom - firstNode.top) / max) * 99;

        return ({top, height, index});
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
