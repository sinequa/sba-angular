import { Injectable } from '@angular/core';
import { PreviewHighlightColors } from '@sinequa/components/preview';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  styleElement: HTMLStyleElement;

  setHighlights(selectorsHighlights: { selectors: string[], highlights: PreviewHighlightColors[] }[]) {
    if (!selectorsHighlights) return;

    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
    }

    this.styleElement.textContent = selectorsHighlights.map(sh =>
      sh.highlights.map(highlight =>
        sh.selectors.map(selector => {
          const color = highlight.color ? `color: ${highlight.color} !important;` : '';
          const bgColor = highlight.bgColor ? `background-color: ${highlight.bgColor};` : '';
          return `${selector}.${highlight.name} {
              ${color}
              ${bgColor}
            }`;
        }).join('\n')
      ).join('\n')
    ).join('\n');
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
