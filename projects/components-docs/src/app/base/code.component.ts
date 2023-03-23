import { Component, Input, OnChanges } from '@angular/core';
import highlightJs from 'highlight.js';

@Component({
  selector: 'doc-code',
  template: `<pre><code [innerHTML]="formattedCode"></code></pre>`
})
export class DocCodeComponent implements OnChanges {

  @Input() code: string;
  @Input() language = 'html';

  formattedCode: any;

  ngOnChanges() {
    if (this.code) {
      this.formattedCode = highlightJs.highlight(this.code, {language: this.language}).value;
    }
  }

}
