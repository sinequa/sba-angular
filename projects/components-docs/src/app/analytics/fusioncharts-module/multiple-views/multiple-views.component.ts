import { Component } from '@angular/core';
import { mockChartAggregation, mockChartResultsShortened } from 'src/app/analytics/fusioncharts-module/chart/mock';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-multiple-views',
  templateUrl: './multiple-views.component.html'
})
export class DocMultipleViewsComponent extends BaseComponent {

  code = `<sq-facet-card [title]="'Collections'" [icon]="'fas fa-folder'">

    <!-- List view -->
    <ng-template [sqFacetView]="{icon: 'fas fa-list', title: 'List view'}">
        <sq-facet-list #facet [results]="results" [aggregation]="'collection'"></sq-facet-list>
    </ng-template>

    <!-- Chart view -->
    <ng-template [sqFacetView]="{icon: 'fas fa-chart-bar', title: 'Chart view'}">
        <sq-fusion-chart #facet [results]="results" [aggregation]="'collection'"></sq-fusion-chart>
    </ng-template>

</sq-facet-card>`;

  results = mockChartResultsShortened;
  aggregation = mockChartAggregation;

}
