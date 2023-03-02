import { Component } from '@angular/core';
import { DocStickyComponent } from './sticky/sticky.component';
import { DocTooltipComponent } from './tooltip/tooltip.component';

// Keeping the custom template to force a bigger height to test the sticky component
@Component({
  selector: 'doc-utils-module',
  templateUrl: './utils-module.component.html'
})
export class DocUtilsModuleComponent {

  components = [
    DocStickyComponent,
    DocTooltipComponent
  ];

  constructor() { }

}
