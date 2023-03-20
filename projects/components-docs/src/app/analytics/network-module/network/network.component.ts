import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-network',
  templateUrl: './network.component.html'
})
export class DocNetworkComponent extends BaseComponent {

  code = `<sq-network
    [results]="results"
    [providers]="providers">
</sq-network>`;

}
