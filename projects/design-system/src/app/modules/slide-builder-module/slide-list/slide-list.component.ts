import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html'
})
export class SlideListComponent {

  code = `<sq-slide-list
    [results]="results">
</sq-slide-list>`;

  constructor(public globalService: GlobalService) { }

}
