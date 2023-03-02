import { Component } from '@angular/core';
import { EdgeInfoCardComponent } from './edge-info-card/edge-info-card.component';
import { NetworkComponent } from './network/network.component';
import { NodeInfoCardComponent } from './node-info-card/node-info-card.component';

@Component({
  selector: 'app-network-module',
  templateUrl: '../../module-template.html'
})
export class NetworkModuleComponent {

  title = 'Network Module';

  components = [
    EdgeInfoCardComponent,
    NetworkComponent,
    NodeInfoCardComponent
  ];

  constructor() { }

}
