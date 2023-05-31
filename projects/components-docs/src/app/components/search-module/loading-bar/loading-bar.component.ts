import { Component } from '@angular/core';

@Component({
  selector: 'doc-loading-bar',
  templateUrl: './loading-bar.component.html',
  styles: [`doc-component-demo {
    overflow: hidden;
  }`]
})
export class DocLoadingBarComponent {

  code = `<sq-loading-bar
    [active]="active">
</sq-loading-bar>`;

  constructor() { }

}
