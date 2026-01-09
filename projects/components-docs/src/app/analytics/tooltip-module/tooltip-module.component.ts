import { Component } from '@angular/core';
import { DocTooltip2Component } from './tooltip-2/tooltip-2.component';

@Component({
    selector: 'doc-tooltip-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocTooltipModuleComponent {

  title = 'Tooltip Module';

  components = [
    DocTooltip2Component
  ];

  constructor() { }

}
