import { Component, Input, OnChanges } from '@angular/core';
import highlightJs from 'highlight.js';

@Component({
    selector: 'doc-code',
    template: `<pre class="p-3"><code [innerHTML]="formattedCode"></code></pre>`,
    styles: [`pre {
    background-color: aliceblue;
    margin: 0;
  }`],
    standalone: false
})
export class DocCodeComponent implements OnChanges {

  @Input() code: string;
  @Input() language = 'html';

  formattedCode: any;

  ngOnChanges() {
    if (this.code) {
      this.formattedCode = highlightJs.highlight(this.code, { language: this.language }).value;
    }
  }

}
