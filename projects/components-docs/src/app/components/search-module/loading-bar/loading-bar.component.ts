import { Component } from '@angular/core';

@Component({
    selector: 'doc-loading-bar',
    templateUrl: './loading-bar.component.html',
    styles: [`:host ::ng-deep .card-body {
    padding-left: 0 !important;
  }`],
    standalone: false
})
export class DocLoadingBarComponent {

  code = `<sq-loading-bar
    [active]="active">
</sq-loading-bar>`;

  constructor() { }

}
