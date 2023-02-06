import { Component } from '@angular/core';
import { StickyComponent } from './sticky/sticky.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@Component({
  selector: 'app-utils-module',
  templateUrl: './utils-module.component.html'
})
export class UtilsModuleComponent {

  components = [
    StickyComponent,
    TooltipComponent
  ];

  constructor() { }

}
