import { Component, OnInit } from '@angular/core';
import {RESULTS} from "../../mocks/results";

@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html'
})
export class FacetComponent implements OnInit {

  results: any = RESULTS;

  code: string = `<sq-facet-card [title]="'Title'" [icon]="'fas fa-sitemap'" [collapsible]="false">
    <sq-facet-tree [results]="results" [aggregation]="'Treepath'"></sq-facet-tree>
</sq-facet-card>

<sq-facet-card title="Title" [icon]="'fas fa-sitemap'" [collapsible]="true">
    <div class="list-group list-group-flush">
        <a class="saved-query-item list-group-item list-group-item-action d-flex align-items-center">
            <span class="query-name me-auto text-truncate" [title]="'title'">title</span>
            <span class="query-text text-muted small fst-italic text-right text-truncate ms-2">"additional text"</span>
            <i class="query-delete ms-2 fas fa-times" [title]="'Delete'"></i>
        </a>
        ...
    </div>
</sq-facet-card>`;

  constructor() { }

  ngOnInit(): void {
  }

}
