import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-scope',
  templateUrl: './scope.component.html'
})
export class DocScopeComponent {

  code = `<sq-scope
    [query]="query">
</sq-scope>`;

  constructor(public globalService: GlobalService) {
  }

}
