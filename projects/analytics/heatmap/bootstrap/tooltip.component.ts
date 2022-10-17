import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: "sq-tooltip",
  template: `
<div *ngIf="manager.tooltip$ | async as tooltip"
  [ngStyle]="tooltip.style"
  [ngClass]="tooltip.orientation"
  class="sq-tooltip position-absolute card">
  <div class="card-body bg-{{theme}} rounded-1 p-2">
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

export class TooltipManager<T> {

  tooltip$ = new BehaviorSubject<{data: T, orientation: 'left'|'right', style: any} | undefined>(undefined);

  protected hideTooltipTimeout: NodeJS.Timeout | undefined;

  constructor(
    protected delay = 200
  ) { }

  show(data: T, orientation: 'left'|'right', top: number, dx: number) {
    this.cancelHide();
    const style = this.getStyle(orientation, top, dx);
    this.tooltip$.next({data, style, orientation});
  }

  hide() {
    this.cancelHide();
    this.tooltip$.next(undefined);
  }

  delayedHide() {
    if (!this.hideTooltipTimeout) {
      this.hideTooltipTimeout = setTimeout(() => this.hide(), this.delay);
    }
  }

  cancelHide() {
    if (this.hideTooltipTimeout) {
      clearTimeout(this.hideTooltipTimeout);
      this.hideTooltipTimeout = undefined;
    }
  }

  get isShown(): boolean {
    return !!this.tooltip$.value;
  }

  get data(): T | undefined {
    return this.tooltip$.value?.data;
  }

  protected getStyle(orientation: 'left'|'right', top: number, dx: number) {
    if (orientation === "right") {
      return {
        'left.px': dx + 7,
        'top.px': top - 21, // Align tooltip arrow
      }
    }
    else {
      return {
        'right.px': dx + 7,
        'top.px': top - 21, // Align tooltip arrow
      }
    }
  }
}
