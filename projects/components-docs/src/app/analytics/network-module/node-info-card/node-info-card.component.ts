import { Component } from '@angular/core';
import { Node } from '@sinequa/analytics/network';

@Component({
  selector: 'doc-node-info-card',
  templateUrl: './node-info-card.component.html'
})
export class DocNodeInfoCardComponent {

  code = ``;

  node: Node = {
    id: 'id',
    label: 'label',
    type: {
      name: 'name',
      nodeOptions: {}
    },
    provider: {} as any,
    visible: true,
    count: 4,
    context: {} as any
  };

  constructor() { }

}
