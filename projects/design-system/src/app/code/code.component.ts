import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code',
  template: `<pre [innerText]="code"></pre>`,
  styles: [`
.sq-code {
  font-family: Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace;
  font-size: small;
}
  `]
})
export class CodeComponent {

  @Input() code: string;

  constructor() { }

}
