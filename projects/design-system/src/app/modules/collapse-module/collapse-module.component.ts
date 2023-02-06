import { Component } from '@angular/core';
import { CollapseButtonComponent } from './collapse-button/collapse-button.component';
import { CollapseComponent } from './collapse/collapse.component';

@Component({
  selector: 'app-collapse-module',
  templateUrl: './collapse-module.component.html'
})
export class CollapseModuleComponent {

  components = [
    CollapseComponent,
    CollapseButtonComponent
  ];

  constructor() { }

}
