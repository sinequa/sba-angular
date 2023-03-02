import { Component } from '@angular/core';
import { DocThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@Component({
  selector: 'doc-theme-toggle-module',
  templateUrl: '../../module-template.html'
})
export class DocThemeToggleModuleComponent {

  title = 'Theme Toggle Module';

  components = [
    DocThemeToggleComponent
  ];

  constructor() { }

}
