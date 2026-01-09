import { Component, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

/**
 * Internal component that wraps the tooltip's content
 */
@Component({
    selector: 'sqx-tooltip',
    styleUrls: ['./tooltip.component.scss'],
    template: `
  <ng-container *ngTemplateOutlet="template || defaultTpl; context: {$implicit: data}"></ng-container>
  <ng-template #defaultTpl let-data>
    <div class="sq-tooltip {{tooltipClass}}" @tooltip [innerHTML]="data"></div>
  </ng-template>`,
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
    standalone: false
})
export class TooltipComponent<T=string> {
  data?: T;
  template?: TemplateRef<any>;
  tooltipClass?: string;
}
