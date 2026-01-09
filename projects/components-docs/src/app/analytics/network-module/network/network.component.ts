import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-network',
    templateUrl: './network.component.html',
    standalone: false
})
export class DocNetworkComponent extends BaseComponent {

  code = `<sq-network
    [results]="results"
    [providers]="providers">
</sq-network>`;

}
