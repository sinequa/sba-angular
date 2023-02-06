import { Component } from '@angular/core';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-theme-toggle-module',
  templateUrl: './theme-toggle-module.component.html'
})
export class ThemeToggleModuleComponent {

  components = [
    ThemeToggleComponent
  ];

  constructor() { }

}
