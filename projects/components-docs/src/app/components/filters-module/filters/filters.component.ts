import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { querySample } from '../query';

@Component({
    selector: 'doc-filters',
    templateUrl: './filters.component.html',
    standalone: false
})
export class DocFiltersComponent extends BaseComponent {

  code =
`<sq-filters
  [query]="query"
  [filter]="query.filters"
  [showField]="true"
  [showOperator]="true"
  [allowRemove]="true"
  [allowNesting]="false">
</sq-filters>`;

  query = querySample;
}
