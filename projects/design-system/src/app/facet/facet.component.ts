import { Component, OnInit } from '@angular/core';
import { FACETS } from 'src/mocks/facets';
import { RESULTS } from "../../mocks/results";

@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html'
})
export class FacetComponent implements OnInit {

  results: any = RESULTS;

  code: string = `<sq-facet-card title="Facet with sq-facet-tree" icon="fas fa-sitemap" [collapsible]="false">
    <sq-facet-tree
        [results]="results"
        [aggregation]="'Treepath'"
        #facet>
    </sq-facet-tree>
</sq-facet-card>

<sq-facet-card title="Facet with a list-group" icon="fas fa-sitemap" [collapsible]="true">
    <div class="list-group list-group-flush">
        <a class="saved-query-item list-group-item list-group-item-action d-flex align-items-center">
            <span class="query-name me-auto text-truncate" [title]="'title'">title</span>
            <span class="query-text text-muted small fst-italic text-right text-truncate ms-2">"additional text"</span>
            <i class="query-delete ms-2 fas fa-times" [title]="'Delete'"></i>
        </a>
        ...
    </div>
</sq-facet-card>

<sq-facet-card title="Facet with sq-facet-multi" icon="fas fa-filter fa-fw" [collapsible]="false">
    <sq-facet-multi
        [results]="results"
        [facets]="FACETS"
        #facet>
    </sq-facet-multi>
</sq-facet-card>`;

  FACETS = FACETS;

  constructor() { }

  ngOnInit(): void {
  }

}
