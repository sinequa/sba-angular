import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-sort-selector',
  templateUrl: './sort-selector.component.html'
})
export class DocSortSelectorComponent extends BaseComponent {

  code = `<sq-sort-selector
    [results]="results">
</sq-sort-selector>`;

}
