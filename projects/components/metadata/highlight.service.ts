import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { PreviewHighlightColors } from '@sinequa/components/preview';

export const HIGHLIGHTS = new InjectionToken<{ selectors: string[], highlights: PreviewHighlightColors[] }[]>('HIGHLIGHTS');

export const PREVIEW_HIGHLIGHTS: PreviewHighlightColors[] = [
  {
    name: 'company',
    color: 'white',
    bgColor: '#FF7675'
  },
  {
    name: 'geo',
    color: 'white',
    bgColor: '#74B9FF'
  },
  {
    name: 'person',
    color: 'white',
    bgColor: '#00ABB5'
  },
  {
    name: 'extractslocations',
    color: 'black',
    bgColor: '#fffacd'
  },
  {
    name: 'matchlocations',
    color: 'black',
    bgColor: '#ff0'
  }
];

export const METADATA_HIGHLIGHTS: PreviewHighlightColors[] = [
  {
    name: 'company',
    color: '#FF7675'
  },
  {
    name: 'geo',
    color: '#74B9FF'
  },
  {
    name: 'person',
    color: '#00ABB5'
  },
  {
    name: 'job',
    color: '#00ABB5'
  },
  {
    name: 'date',
    color: '#8898D4'
  },
  {
    name: 'event',
    color: '#8898D4'
  },
  {
    name: 'money',
    color: '#51C160'
  },
  {
    name: 'amount',
    color: '#51C160'
  },
];

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
