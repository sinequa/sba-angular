import { Component } from '@angular/core';
import { CollapseButtonComponent } from './collapse-button/collapse-button.component';
import { CollapseComponent } from './collapse/collapse.component';

@Component({
  selector: 'app-collapse-module',
  templateUrl: '../module-template.html'
})
export class CollapseModuleComponent {

  title = 'Collapse Module';

  components = [
    CollapseComponent,
    CollapseButtonComponent
  ];

  constructor() { }

}
