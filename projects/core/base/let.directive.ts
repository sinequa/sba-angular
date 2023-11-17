import { Observable, isObservable } from "rxjs";

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';


export interface LetViewContext<T> {
  $implicit: T;
  sqLet: T;
  complete: boolean;
}
/**
 * @description
 *
 * The `*sqLet` directive serves a convenient way of binding observables to a view context
 * (DOM element's scope). It also helps with several internal processing under the hood.
 *
 *
 * ### Displaying Observable values
 * @example
 *
 * ```html
 * <ng-container *sqLet="number$ | async as n">
 *  <app-cmp [number]="n"></app-cmp>
 * </ng-container>
 * ```
 * @example
 *
 * ```html
 * <ng-container *sqLet="number$; let n; let c = complete">
 *  <app-cmp [number]="n">complete: {{ c }}</app-cmp>
 * </ng-container>
 * ```
 *
 * ### Displaying values
 * @example
 *
 * ```html
 * <ng-container *sqLet="num; let c = complete">
 *  <app-cmp [number]="num">complete: {{ c }}</app-cmp>
 * </ng-container>
 *
 * ```
 * @example
 *
 * ```html
 * <ng-container *sqLet="1234; let n; let c = complete">
 *  <app-cmp [number]="n">complete: {{ c }}</app-cmp>
 * </ng-container>
 * ```
 *
 */
@Directive({
  selector: '[sqLet]',
})
export class LetDirective<T> {
  private readonly viewContext: LetViewContext<T | undefined> = {
    $implicit: undefined,
    sqLet: undefined,
    complete: false,
  };

  @Input()
  set sqLet(type: T) {
    if (isObservable(type)) {
      (type as Observable<T>).subscribe((value) => {
        this.viewContext.$implicit = this.viewContext.sqLet = value;
        this.viewContext.complete = true;
      });
    } else {
      this.viewContext.$implicit = this.viewContext.sqLet = type;
      this.viewContext.complete = true;
    }
    this.renderMainView();
  }

  constructor(
    private readonly mainTemplateRef: TemplateRef<LetViewContext<T | undefined>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  private renderMainView() {
    this.viewContainerRef.createEmbeddedView(
      this.mainTemplateRef,
      this.viewContext
    );
  }
}
