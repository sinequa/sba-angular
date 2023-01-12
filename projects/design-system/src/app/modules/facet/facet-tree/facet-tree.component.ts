import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-facet-tree',
  templateUrl: './facet-tree.component.html'
})
export class FacetTreeComponent implements OnInit {

  code = `<sq-facet-card
    title="Tree"
    [collapsible]="false">
        <sq-facet-tree
            [results]="results"
            [aggregation]="'Treepath'"></sq-facet-tree>
</sq-facet-card>`;

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
  }

}
