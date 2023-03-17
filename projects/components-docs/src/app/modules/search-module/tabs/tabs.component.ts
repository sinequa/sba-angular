import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-tabs',
  templateUrl: './tabs.component.html'
})
export class DocTabsComponent {

  code = `<sq-tabs
    [results]="results">
</sq-tabs>`;

  constructor(public globalService: GlobalService) { }

}
