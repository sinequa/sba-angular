import { Injectable } from '@angular/core';
import { PreviewHighlightColors } from '@sinequa/components/preview';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  styleElement: HTMLStyleElement;

  init(selectorsHighlights?: { selectors: string[], highlights: PreviewHighlightColors[] }[]) {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
    }

    if (selectorsHighlights) {
      this.highlight(selectorsHighlights);
    }

  }

  highlight(selectorsHighlights: { selectors: string[], highlights: PreviewHighlightColors[] }[]) {
    this.styleElement.textContent = selectorsHighlights.map(sh =>
      sh.highlights.map(highlight =>
        sh.selectors.map(selector =>
          `${selector}.${highlight.name} {
              color: ${highlight.color};
              background-color: ${highlight.bgColor};
            }`)
          .join('\n'))
        .join('\n')
    ).join('\n')
  }

  clearHighlights() {
    this.styleElement.textContent = null;
  }

  remove() {
    if (this.styleElement) {
      this.styleElement.remove();
    }
  }
}
