import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-result-icon',
  templateUrl: './result-icon.component.html'
})
export class ResultIconComponent {

  code = `<sq-result-icon
    [record]="record">
</sq-result-icon>`;

  constructor(public globalService: GlobalService) { }

}
