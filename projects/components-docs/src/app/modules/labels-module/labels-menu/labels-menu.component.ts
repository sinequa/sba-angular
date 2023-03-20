import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-labels-menu',
  templateUrl: './labels-menu.component.html'
})
export class DocLabelsMenuComponent extends BaseComponent {

  code = `<sq-labels-menu
    [results]="results">
</sq-labels-menu>`;

}
