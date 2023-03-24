import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-facet-list',
  templateUrl: './facet-list.component.html'
})
export class DocFacetListComponent extends BaseComponent {

  code = `<sq-facet-card
    title="List"
    [collapsible]="false">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'Treepath'"></sq-facet-list>
</sq-facet-card>`;

}
