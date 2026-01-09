import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { querySample } from '../query';

@Component({
    selector: 'doc-filters',
    templateUrl: './filters-editor.component.html',
    standalone: false
})
export class DocFiltersEditorComponent extends BaseComponent {

  code =
`<sq-filters-editor
  [query]="query"
  [filter]="query.filters"
  [showField]="true"
  [showOperator]="true"
  [allowRemove]="true"
  [allowNesting]="false">
</sq-filters-editor>`;

  query = querySample;
}
