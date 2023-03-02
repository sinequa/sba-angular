import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-result-icon',
  templateUrl: './result-icon.component.html'
})
export class DocResultIconComponent {

  code = `<sq-result-icon
    [record]="record">
</sq-result-icon>`;

  constructor(public globalService: GlobalService) { }

}
