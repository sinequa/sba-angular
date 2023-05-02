import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { PreviewHighlightColors } from '@sinequa/components/preview';

export const HIGHLIGHTS = new InjectionToken<{ selectors: string[], highlights: PreviewHighlightColors[] }[]>('HIGHLIGHTS');

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  styleElement: HTMLStyleElement;

  constructor(@Optional() @Inject(HIGHLIGHTS) private highlights: { selectors: string[], highlights: PreviewHighlightColors[] }[]) {
    this.setHighlights(this.highlights);
  }

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
