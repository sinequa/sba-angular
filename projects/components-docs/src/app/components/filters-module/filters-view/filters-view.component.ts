import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { querySample } from '../query';

@Component({
  selector: 'doc-filters',
  templateUrl: './filters-view.component.html'
})
export class DocFiltersViewComponent extends BaseComponent {

  code =
`<sq-filters-view
  [query]="query">
</sq-filters-view>`;

  query = querySample;
}
