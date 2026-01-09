import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Action, ActionItemOptions } from "@sinequa/components/action";
import { Filter } from "@sinequa/core/web-services";
import { Subject, Subscription } from "rxjs";
import { FiltersComponent } from "./filters.component";

@Component({
    selector: 'sq-filters-editor',
    templateUrl: './filters-editor.component.html',
    styleUrls: ['./filters-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FiltersEditorComponent extends FiltersComponent implements OnInit, OnDestroy {
  @Input() canDrag = false;

  @Input('onDragDrop')
  public onDragDrop$!: Subject<CdkDragDrop<Filter[]>>;

  options: ActionItemOptions = {
    item: new Action({
      children: [
        new Action({name: 'and', text: "msg#filters.menu.and", action: () => this.setOperator('and')}),
        new Action({name: 'or', text: "msg#filters.menu.or", action: () => this.setOperator('or')}),
        new Action({name: 'not', text: "msg#filters.menu.not", action: () => this.setOperator('not')}),
        new Action({separator: true}),
        new Action({text: "msg#filters.menu.nest", title: "msg#filters.menu.nestTitle", action: () => this.nestFilter()}),
        new Action({text: "msg#filters.menu.unnest", title: "msg#filters.menu.unnestTitle", action: () => this.unnestFilter()}),
        new Action({text: "msg#filters.menu.delete", action: () => this.remove()})
      ]
    }),
    inMenu: false,
    size: 'sm'
  };

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if(changes.filter) {
      this.updateAction();
    }
  }

  sub?: Subscription;
  ngOnInit() {
    if(!this.canDrag) {
      this.onDragDrop$ = new Subject<CdkDragDrop<Filter[]>>();
      this.sub = this.onDragDrop$.subscribe(e => this.onDragDrop(e));
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  updateAction() {
    if(this.exprFilter) {
      this.options.item.text = 'msg#filters.operator.'+this.exprFilter.operator;
      this.options.item.children?.forEach(a => a.selected = a.name === this.exprFilter?.operator);
      this.options = {...this.options}; // Force change detection
    }
  }

  setOperator(op: 'and'|'or'|'not') {
    if(this.exprFilter) {
      this.exprFilter.operator = op;
      this.updateAction();
      this.filterEdit.emit(this.query);
    }
  }

  drop(event: CdkDragDrop<Filter[]>) {
    this.onDragDrop$.next(event);
  }

  private onDragDrop(event: CdkDragDrop<Filter[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.query.cleanFilters();
    }
    this.filterEdit.emit(this.query);
  }
}
