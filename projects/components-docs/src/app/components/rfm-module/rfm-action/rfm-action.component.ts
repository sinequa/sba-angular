import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-rfm-action',
  templateUrl: './rfm-action.component.html'
})
export class DocRfmActionComponent extends BaseComponent {

  code = `<sq-rfm-action
    [results]="results"
    [record]="record">
</sq-rfm-action>`;

}
