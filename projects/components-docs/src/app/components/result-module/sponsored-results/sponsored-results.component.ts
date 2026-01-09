import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-sponsored-results',
    templateUrl: './sponsored-results.component.html',
    standalone: false
})
export class DocSponsoredResultsComponent extends BaseComponent {

  code = `<sq-sponsored-results
    [query]="query">
</sq-sponsored-results>`;

}
