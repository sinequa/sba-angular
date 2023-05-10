import { Component, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Internal component that wraps the tooltip's content
 */
@Component({
  selector: 'sqx-tooltip',
  styleUrls: ['./tooltip.component.scss'],
  template: `
  <div *ngIf="text" class="sq-tooltip {{tooltipClass}}" @tooltip [innerHTML]="text"></div>
  <div *ngIf="template" class="sq-tooltip {{tooltipClass}}" @tooltip><ng-container [ngTemplateOutlet]="template"></ng-container></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class TooltipComponent {
  text?: string;
  template?: TemplateRef<any>;
  tooltipClass?: string;
}