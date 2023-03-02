import { Component } from '@angular/core';
import { Tooltip2Component } from './tooltip-2/tooltip-2.component';

@Component({
  selector: 'app-tooltip-module',
  templateUrl: '../../module-template.html'
})
export class TooltipModuleComponent {

  title = 'Tooltip Module';

  components = [
    Tooltip2Component
  ];

  constructor() { }

}
