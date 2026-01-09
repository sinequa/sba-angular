import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-scope',
    templateUrl: './scope.component.html',
    standalone: false
})
export class DocScopeComponent extends BaseComponent {

  code = `<sq-scope
    *ngIf="appService.ccquery?.scopesActive"
    [query]="searchService.query"
    (queryChange)="searchService.search()">
</sq-scope>`;

}
