import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-result-extracts',
  templateUrl: './result-extracts.component.html'
})
export class DocResultExtractsComponent extends BaseComponent {

  code = `<sq-result-extracts
    [record]="record">
</sq-result-extracts>`;

}
