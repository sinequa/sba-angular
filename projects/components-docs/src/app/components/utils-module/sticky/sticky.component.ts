import { Component } from '@angular/core';

@Component({
  selector: 'doc-sticky',
  templateUrl: './sticky.component.html'
})
export class DocStickyComponent {

  code = `<div
    [style.height]="'400px'"
    [style.background-color]="'lightgray'"
    [sqSticky]="{top: 40, bottom: 100}">
        sqSticky
</div>`;

  constructor() { }

}
