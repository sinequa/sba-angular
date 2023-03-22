import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-scope',
  templateUrl: './scope.component.html'
})
export class DocScopeComponent extends BaseComponent {

  code = `<sq-scope
    *ngIf="appService.ccquery?.scopesActive"
    [query]="searchService.query"
    (queryChange)="searchService.search()">
</sq-scope>`;

}
