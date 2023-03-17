import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-result-missing-terms',
  templateUrl: './result-missing-terms.component.html'
})
export class DocResultMissingTermsComponent {

  code = `<sq-result-missing-terms
    [record]="record">
</sq-result-missing-terms>`;

  constructor(public globalService: GlobalService) { }

}
