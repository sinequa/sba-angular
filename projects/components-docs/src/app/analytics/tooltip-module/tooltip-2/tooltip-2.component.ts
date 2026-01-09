import { Component } from '@angular/core';
import { TooltipManager } from '@sinequa/analytics/tooltip';

@Component({
    selector: 'doc-tooltip-2',
    templateUrl: './tooltip-2.component.html',
    standalone: false
})
export class DocTooltip2Component {

  code = `<sq-tooltip [manager]="manager">
    <ng-template>
        <div style="height:300px;width:300px;">
            Some template
        </div>
    </ng-template>
</sq-tooltip>`;

  manager = new TooltipManager<any>();

  constructor() {
    this.manager.tooltip$.next({
      data: {},
      orientation: 'left',
      style: 'height:200px;'
    })
  }

}
