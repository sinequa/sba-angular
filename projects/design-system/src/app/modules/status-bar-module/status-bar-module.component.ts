import { Component } from '@angular/core';
import { FullscreenActivatorComponent } from './fullscreen-activator/fullscreen-activator.component';
import { NetworkActivityComponent } from './network-activity/network-activity.component';

@Component({
  selector: 'app-status-bar-module',
  templateUrl: '../../module-template.html'
})
export class StatusBarModuleComponent {

  title = 'Status Bar Module';

  components = [
    FullscreenActivatorComponent,
    NetworkActivityComponent
  ];

  constructor() { }

}
