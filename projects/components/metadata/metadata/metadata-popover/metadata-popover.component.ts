import { Component, Input } from '@angular/core';
import { Action } from '@sinequa/components/action';

@Component({
  selector: 'sq-metadata-popover',
  templateUrl: './metadata-popover.component.html',
  styleUrls: ['./metadata-popover.component.scss']
})
export class MetadataPopoverComponent {

  @Input() popoverTemplate: string;
  @Input() actions: Action[];
  @Input() actionsButtonsStyle: string;
  @Input() actionsButtonsSize: string;
  @Input() popoverLinesNumber: number;

}
