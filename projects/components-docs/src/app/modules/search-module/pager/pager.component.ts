import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-pager',
  templateUrl: './pager.component.html'
})
export class DocPagerComponent extends BaseComponent {

  code = `<sq-pager
    [results]="results">
</sq-pager>`;

}
