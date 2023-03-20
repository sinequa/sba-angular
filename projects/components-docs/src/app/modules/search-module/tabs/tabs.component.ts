import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-tabs',
  templateUrl: './tabs.component.html'
})
export class DocTabsComponent extends BaseComponent {

  code = `<sq-tabs
    [results]="results">
</sq-tabs>`;

}
