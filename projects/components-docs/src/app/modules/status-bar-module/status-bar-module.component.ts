import { Component } from '@angular/core';
import { DocFullscreenActivatorComponent } from './fullscreen-activator/fullscreen-activator.component';
import { DocNetworkActivityComponent } from './network-activity/network-activity.component';

@Component({
  selector: 'doc-status-bar-module',
  templateUrl: '../../module-template.html'
})
export class DocStatusBarModuleComponent {

  title = 'Status Bar Module';

  components = [
    DocFullscreenActivatorComponent,
    DocNetworkActivityComponent
  ];

  constructor() { }

}
