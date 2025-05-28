import { Component } from '@angular/core';
import { Widget } from '@sinequa/analytics/dashboard';
import { GlobalService } from 'src/app/shared/global.service';

@Component({
  selector: 'doc-dashboard2',
  templateUrl: './dashboard2.component.html'
})
export class DocDashboard2Component {

  html =
`<sq-dashboard
  [dashboard]="widgets"
  [horizontalPadding]="2"
  [verticalPadding]="46"
  style="display: block; height: 400px;">

  <ng-template let-widget>
    <sq-facet-card
      [title]="widget.state.title"
      [icon]="widget.icon"
      [collapsible]="false"
      [actions]="widget.actions"
      [actionsFirst]="false"
      [ngSwitch]="widget.state.type">

      <sq-facet-list *ngSwitchCase="'list'"
        #facet
        [results]="results"
        [aggregation]="'Geo'"
        class="d-block overflow-auto" style="height: var(--sq-widget-height)">
      </sq-facet-list>

      <sq-fusion-chart *ngSwitchCase="'chart'"
        #facet
        [results]="results"
        [aggregation]="'Person'"
        [width]="widget.width"
        [height]="widget.height"
        (initialized)="$event.resizeTo(widget.width, widget.height)">
      </sq-fusion-chart>

    </sq-facet-card>
  </ng-template>

</sq-dashboard>`;

  ts =
`widgets: Widget[] = [
  {
    state: {type: "list", x: 0, y: 0, cols: 2, rows: 2, title: "List facet"},
    removable: true
  },
  {
    state: {type: "chart", x: 2, y: 0, cols: 2, rows: 1, title: "Chart facet"},
    maximizable: true
  },
];`

  widgets: Widget[] = [
    {
      state: {type: "list", x: 0, y: 0, cols: 2, rows: 2, title: "List facet"},
      removable: true
    },
    {
      state: {type: "chart", x: 2, y: 0, cols: 2, rows: 1, title: "Chart facet"},
      maximizable: true
    },
  ];

  constructor(
    public globalService: GlobalService
  ) { }

}
