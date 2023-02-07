import { Component } from '@angular/core';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-theme-toggle-module',
  templateUrl: '../module-template.html'
})
export class ThemeToggleModuleComponent {

  title = 'Theme Toggle Module';

  components = [
    ThemeToggleComponent
  ];

  constructor() { }

}
