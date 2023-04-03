import { Component } from '@angular/core';

@Component({
  selector: 'doc-loading-bar',
  templateUrl: './loading-bar.component.html'
})
export class DocLoadingBarComponent {

  code = `<sq-loading-bar
    [active]="active">
</sq-loading-bar>`;

  constructor() { }

}
