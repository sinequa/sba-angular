import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-slide-list',
  templateUrl: './slide-list.component.html'
})
export class DocSlideListComponent {

  code = `<sq-slide-list
    [results]="results">
</sq-slide-list>`;

  constructor(public globalService: GlobalService) { }

}
