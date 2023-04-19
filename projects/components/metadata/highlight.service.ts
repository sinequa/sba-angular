import { Inject, Injectable, InjectionToken } from '@angular/core';
import { PreviewHighlightColors } from '@sinequa/components/preview';

export const HIGHLIGHTS = new InjectionToken<{ selectors: string[], highlights: PreviewHighlightColors[] }[]>('HIGHLIGHTS');

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  styleElement: HTMLStyleElement;

  constructor(@Inject(HIGHLIGHTS) private highlights: { selectors: string[], highlights: PreviewHighlightColors[] }[]) {
    this.init();
  }

  init() {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
    }

    this.styleElement.textContent = this.highlights.map(sh =>
      sh.highlights.map(highlight =>
        sh.selectors.map(selector =>
          `${selector}.${highlight.name} {
              color: ${highlight.color};
              background-color: ${highlight.bgColor};
            }`)
          .join('\n'))
        .join('\n')
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
