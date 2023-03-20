import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-money-cloud',
  templateUrl: './money-cloud.component.html'
})
export class DocMoneyCloudComponent extends BaseComponent {

  code = `<sq-money-cloud
    [results]="results">
</sq-money-cloud>`;

}
