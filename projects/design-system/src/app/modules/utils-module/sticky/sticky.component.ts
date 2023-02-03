import { Component } from '@angular/core';

@Component({
  selector: 'app-sticky',
  templateUrl: './sticky.component.html'
})
export class StickyComponent {

  code = `<div
    [style.height]="'400px'"
    [style.background-color]="'lightgray'"
    [sqSticky]="{top: 50, bottom: 105}">
        sqSticky
</div>`;

  constructor() { }

}
