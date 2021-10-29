import {Component, ChangeDetectionStrategy} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'sqx-tooltip',
  styleUrls: ['./tooltip.component.css'],
  template: `<div class="sq-tooltip" @tooltip [innerHTML]="text"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({opacity: 0}),
        animate(300, style({opacity: 1})),
      ]),
      transition(':leave', [
        animate(300, style({opacity: 0})),
      ]),
    ]),
  ],
})
export class TooltipComponent {
  text = '';
}