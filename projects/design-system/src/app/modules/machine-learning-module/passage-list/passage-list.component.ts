import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-passage-list',
  templateUrl: './passage-list.component.html'
})
export class PassageListComponent {

  code = `<sq-passage-list
    [record]="record">
</sq-passage-list>`;

  constructor(public globalService: GlobalService) { }

}
