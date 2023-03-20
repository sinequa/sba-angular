import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-slide-list',
  templateUrl: './slide-list.component.html'
})
export class DocSlideListComponent extends BaseComponent {

  code = `<sq-slide-list
    [results]="results">
</sq-slide-list>`;

}
