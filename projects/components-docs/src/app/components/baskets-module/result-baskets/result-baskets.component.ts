import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-result-baskets',
    templateUrl: './result-baskets.component.html',
    standalone: false
})
export class DocResultBasketsComponent extends BaseComponent {

  code = `<sq-result-baskets
    [record]="record">
</sq-result-baskets>`;

}
