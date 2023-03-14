import { Component } from '@angular/core';
import { DocCollapseButtonComponent } from './collapse-button/collapse-button.component';
import { DocCollapseComponent } from './collapse/collapse.component';

@Component({
  selector: 'doc-collapse-module',
  templateUrl: '../../module-template.html'
})
export class DocCollapseModuleComponent {

  title = 'Collapse Module';
  description = ``;

  components = [
    DocCollapseComponent,
    DocCollapseButtonComponent
  ];

  constructor() { }

}
