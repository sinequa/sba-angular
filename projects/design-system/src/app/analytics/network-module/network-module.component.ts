import { Component } from '@angular/core';
import { DocEdgeInfoCardComponent } from './edge-info-card/edge-info-card.component';
import { DocNetworkComponent } from './network/network.component';
import { DocNodeInfoCardComponent } from './node-info-card/node-info-card.component';

@Component({
  selector: 'doc-network-module',
  templateUrl: '../../module-template.html'
})
export class DocNetworkModuleComponent {

  title = 'Network Module';
  description = ``;

  components = [
    DocEdgeInfoCardComponent,
    DocNetworkComponent,
    DocNodeInfoCardComponent
  ];

  constructor() { }

}
