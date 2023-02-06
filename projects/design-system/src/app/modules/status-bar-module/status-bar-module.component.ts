import { Component } from '@angular/core';
import { FullscreenActivatorComponent } from './fullscreen-activator/fullscreen-activator.component';
import { NetworkActivityComponent } from './network-activity/network-activity.component';

@Component({
  selector: 'app-status-bar-module',
  templateUrl: './status-bar-module.component.html'
})
export class StatusBarModuleComponent {

  components = [
    FullscreenActivatorComponent,
    NetworkActivityComponent
  ];

  constructor() { }

}
