import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { TooltipManager } from './tooltip-manager';

@Component({
    selector: "sq-tooltip",
    imports: [CommonModule],
    template: `
<div *ngIf="manager.tooltip$ | async as tooltip"
  [ngStyle]="tooltip.style"
  [ngClass]="tooltip.orientation"
  class="sq-tooltip position-absolute card">
  <div class="card-body bg-{{theme}} rounded-1 p-1">
    <ng-container *ngTemplateOutlet="template; context: {$implicit: tooltip.data}"></ng-container>
  </div>
</div>
`,
    styles: [`
.sq-tooltip {
    z-index: 10;
    max-height: 100%;
}

.card-body {
  overflow-y: auto;
  overflow-x: hidden;
}

.sq-tooltip::after {
    content: " ";
    position: absolute;
    top: 12px;
    border-width: 8px;
    border-style: solid;
}

.sq-tooltip.right::after {
    left: -17px;
    border-color: transparent rgb(0,0,0,0.125) transparent transparent;
}

.sq-tooltip.left::after {
    right: -17px;
    border-color: transparent transparent transparent rgb(0,0,0,0.125);
}
  `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsTooltipComponent {
  @Input() manager: TooltipManager<any>;
  @Input() theme: 'light'|'dark' = 'light';
  @ContentChild(TemplateRef) template: TemplateRef<any>;
}
