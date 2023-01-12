import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-facet-list',
  templateUrl: './facet-list.component.html'
})
export class FacetListComponent implements OnInit {

  code = `<sq-facet-card
    title="List"
    [collapsible]="false">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'Treepath'"></sq-facet-list>
</sq-facet-card>`;

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
  }

}
