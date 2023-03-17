import { Component, Input } from '@angular/core';

@Component({
  selector: 'doc-code',
  template: `<pre [innerText]="code"></pre>
  <hr *ngIf="addSpacer">`,
  styles: [`
.sq-code {
  font-family: Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace;
  font-size: small;
}
  `]
})
export class DocCodeComponent {

  @Input() code: string;
  @Input() addSpacer = false;

  constructor() { }

}
