import { BehaviorSubject } from "rxjs";

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
