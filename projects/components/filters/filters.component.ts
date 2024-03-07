import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { AppService, Query } from "@sinequa/core/app-utils";
import { Filter, ExprFilter, ValueFilter, NullFilter, InFilter, BetweenFilter, isExprFilter, CCColumn } from "@sinequa/core/web-services";

@Component({
  selector: 'sq-filters',
  templateUrl: './filters.component.html',
  styles: [`
a {
  color: inherit;
}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnChanges {
  @Input() query: Query;
  @Input() filter: Filter|undefined;
  @Input() showField = true;
  @Input() showOperator = true;
  @Input() allowRemove = true;
  @Input() allowNesting = false;
  @Input() filtersClass = 'text-nowrap';
  @Output() filterEdit = new EventEmitter<Query>();

  exprFilter?: ExprFilter;
  valueFilter?: ValueFilter;
  betweenFilter?: BetweenFilter;
  inFilter?: InFilter;
  nullFilter?: NullFilter;

  field?: string;
  column?: CCColumn;
  operator?: string;

  constructor(
    public appService: AppService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.filter) {
      this.exprFilter = undefined;
      this.valueFilter = undefined;
      this.betweenFilter = undefined;
      this.inFilter = undefined;
      this.nullFilter = undefined;
      this.field = undefined;
      this.operator = undefined;
      if(this.filter) {

        switch(this.filter.operator) {
          case 'and': case 'or': case 'not': this.exprFilter = this.filter; break;
          case 'between': this.betweenFilter = this.filter; break;
          case 'in': this.inFilter = this.filter; break;
          case 'null': this.nullFilter = this.filter; break;
          default: this.valueFilter = this.filter;
        }

        const field = this.getField(this.filter);
        if(field) {
          this.column = this.appService.getColumn(field);
          this.field = this.exprFilter? this.appService.getPluralLabel(field) : this.appService.getSingularLabel(field);
        }

        // Get the operator displayed in front of the value
        this.operator = (this.exprFilter || this.filter.display || !this.filter.operator) ?
          'eq' : this.filter.operator;
      }
    }
  }

  /**
   * Returns the field of the current filter if it exists and is unique.
   * An expr filter might contain nested filters applied on different fields
   */
  getField(filter: Filter): string | undefined {
    if(isExprFilter(filter)) {
      const set = new Set(filter.filters.map(f => this.getField(f)));
      return set.size === 1? set.values().next().value : undefined;
    }
    return filter.field;
  }

  remove() {
    this.query.removeFilters(f => f === this.filter);
    this.filterEdit.emit(this.query);
  }

  nestFilter() {
    this.query.nestFilter(c => c === this.filter, 'and');
    this.filterEdit.emit(this.query);
  }

  unnestFilter() {
    this.query.unnestFilter(c => c === this.filter);
    this.filterEdit.emit(this.query);
  }
}
