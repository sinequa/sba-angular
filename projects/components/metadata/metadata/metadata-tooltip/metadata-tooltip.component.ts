import { Component, Input } from '@angular/core';
import { Action } from '@sinequa/components/action';

@Component({
  selector: 'sq-metadata-tooltip',
  templateUrl: './metadata-tooltip.component.html',
  styleUrls: ['./metadata-tooltip.component.scss']
})
export class MetadataTooltipComponent {

  @Input() entityTemplate: any;
  @Input() actions: Action[];
  @Input() actionsButtonsStyle: string;
  @Input() actionsButtonsSize: string;
  @Input() tooltipLinesNumber: number;

}
