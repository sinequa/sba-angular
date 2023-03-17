import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-result-source',
  templateUrl: './result-source.component.html'
})
export class DocResultSourceComponent {

  code = `<sq-result-source
    [record]="record">
</sq-result-source>`;

  constructor(public globalService: GlobalService) { }

}
