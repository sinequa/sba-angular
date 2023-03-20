import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-result-baskets',
  templateUrl: './result-baskets.component.html'
})
export class DocResultBasketsComponent extends BaseComponent {

  code = `<sq-result-baskets
    [record]="record">
</sq-result-baskets>`;

}
