import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html'
})
export class ScopeComponent {

  code = `<sq-scope
    [query]="query">
</sq-scope>`;

  constructor(public globalService: GlobalService) {
  }

}
