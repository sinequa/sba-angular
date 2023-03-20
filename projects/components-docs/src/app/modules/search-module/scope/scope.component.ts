import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-scope',
  templateUrl: './scope.component.html'
})
export class DocScopeComponent extends BaseComponent {

  code = `<sq-scope
    [query]="query">
</sq-scope>`;

}
