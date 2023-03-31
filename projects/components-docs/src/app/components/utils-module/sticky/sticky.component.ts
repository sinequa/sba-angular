import { Component } from '@angular/core';

@Component({
  selector: 'doc-sticky',
  templateUrl: './sticky.component.html'
})
export class DocStickyComponent {

  code = `<div
    [style.height]="'400px'"
    [style.background-color]="'lightgray'"
    [sqSticky]="{top: 50, bottom: 105}">
        sqSticky
</div>`;

  constructor() { }

}
