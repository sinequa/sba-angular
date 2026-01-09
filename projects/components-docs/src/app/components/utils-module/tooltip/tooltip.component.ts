import { Component } from '@angular/core';

@Component({
    selector: 'doc-tooltip',
    templateUrl: './tooltip.component.html',
    standalone: false
})
export class DocTooltipComponent {

  code = `<sqx-tooltip></sqx-tooltip>`;

  constructor() { }

}
