import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-passage-list',
  templateUrl: './passage-list.component.html'
})
export class DocPassageListComponent {

  code = `<sq-passage-list
    [record]="record">
</sq-passage-list>`;

  constructor(public globalService: GlobalService) { }

}
