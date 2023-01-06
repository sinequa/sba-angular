import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PreviewData } from '@sinequa/core/web-services';
import { PreviewDocument } from '../../preview-document';
import { PassageHighlightParams } from '../preview-passage-highlight/preview-passage-highlight.component';

@Component({
  selector: 'sq-preview-minimap',
  templateUrl: './preview-minimap.component.html',
  styleUrls: ['./preview-minimap.component.css']
})
export class BsPreviewMinimapComponent implements OnChanges {
  @Input() type = "extractslocations";
  @Input() previewDocument?: PreviewDocument;
  @Input() previewData?: PreviewData;

  /**
   * The passage highlight params to also display the selected one
   */
  @Input() passage: PassageHighlightParams;

  /**
   * The maximum number of words in the tooltip when hovering a link
   */
  @Input() tooltipWordsNb = 20;

  locations?: { top: number, height: number | undefined, text: string, index: number }[];
  passageLocation?: { top: number, height: number | undefined, text: string };
  documentHeight: number;

  ngOnChanges(changes: SimpleChanges): void {
    this.extractAll();
    this.setPassage();
  }

  private extractAll() {
    this.locations = [];
    const extracts = this.previewData?.highlightsPerCategory[this.type]?.values; //Extract locations Array ordered by "relevance"
    if (extracts && extracts.length > 0 && this.previewDocument) {
      this.documentHeight = this.previewDocument.document.body.scrollHeight || 1;

      // Init the extracts Array and storing the relevancy index = i because extractsLocations is already ordered by relevance
      this.locations = extracts[0]?.locations.map((el, index) => {
        const highlightPos = this.previewDocument!.getHighlightPos(this.type, index);
        const isLast = index === (extracts[0]?.locations.length - 1);
        const { top, height, text } = this.generateLocation(highlightPos, isLast, index);
        return ({ top, height, index, text });
      });
    }
  }

  private setPassage() {
    this.passageLocation = undefined;
    if (!this.passage) return;

    const highlightPos = this.previewDocument!.getHighlightPosById(this.passage.id);
    if (highlightPos && highlightPos.length) {
      this.passageLocation = this.generateLocation(highlightPos);
    }
  }

  private generateLocation(nodes: NodeListOf<Element> | null, isLast?: boolean, index?: number): { top: number, height: number | undefined, text: string } {
    const firstNode = nodes ? nodes[0].getBoundingClientRect() : undefined;
    const lastNode = nodes ? nodes[nodes.length - 1].getBoundingClientRect() : undefined;
    const topValue = (firstNode?.top || -1) - (this.previewDocument!.document.body.getBoundingClientRect()?.top || 1);

    // Setup the highlight tooltip text
    let text = '';
    nodes?.forEach(node => {
      text += node.textContent;
    });
    const splitText = text.split(' ');
    text = splitText.slice(0, this.tooltipWordsNb).join(' ') + (splitText.length > this.tooltipWordsNb ? '...' : '');

    // Determining the bottom position of the highlight location
    // also making sure it does not cross the following one by stopping before if needed
    let bottom = lastNode?.bottom;
    if (!isLast && index !== undefined && bottom) {
      const nextPos = this.previewDocument!.getHighlightPos(this.type, index + 1);
      const nextPosTop = !nextPos ? undefined : nextPos[0].getBoundingClientRect()?.top;
      if (nextPosTop) {
        bottom = nextPosTop < bottom ? nextPosTop + 2 : bottom;
      }
    }

    const top = ((topValue / this.documentHeight) * 99);
    const height = !bottom || !firstNode ? undefined : ((bottom - firstNode.top) / this.documentHeight) * 99;

    return { top, height, text };
  }

  /**
   * Scroll to the extract into the page using it's index value
   * @param index Extract index
   */
  jumpTo(index) {
    this.previewDocument?.selectHighlight(this.type, index);
  }

  /**
   * Scroll to selected passage
   */
  jumpToPassage() {
    this.previewDocument?.scrollTo(this.passage?.id.slice(1));
  }

}
