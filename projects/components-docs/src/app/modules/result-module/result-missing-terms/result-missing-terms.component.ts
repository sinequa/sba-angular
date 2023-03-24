import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-result-missing-terms',
  templateUrl: './result-missing-terms.component.html'
})
export class DocResultMissingTermsComponent extends BaseComponent {

  code = `<sq-result-missing-terms
    [record]="record">
</sq-result-missing-terms>`;

}
