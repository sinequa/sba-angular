import { Component } from '@angular/core';
import { Edge } from '@sinequa/analytics/network';

@Component({
    selector: 'doc-edge-info-card',
    templateUrl: './edge-info-card.component.html',
    standalone: false
})
export class DocEdgeInfoCardComponent {

  code = `<sq-edge-info-card
    [edge]="edge">
</sq-edge-info-card>`;

  edge: Edge = {
    id: 'id',
    from: 'from',
    to: 'to',
    type: {
      nodeTypes: [],
      edgeOptions: {}
    },
    provider: {} as any,
    visible: true,
    count: 15,
    context: {} as any
  };

  constructor() { }

}
