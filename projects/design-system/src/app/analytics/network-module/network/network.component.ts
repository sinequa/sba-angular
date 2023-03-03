import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-network',
  templateUrl: './network.component.html'
})
export class DocNetworkComponent {

  code = `<sq-network
    [results]="results"
    [providers]="providers">
</sq-network>`;

  constructor(public globalService: GlobalService) { }

}
