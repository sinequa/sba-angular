import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Action } from "@sinequa/components/action";
import { AdvancedService } from "@sinequa/components/advanced";
import { AbstractFacet, FacetService } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { AppService, Expr, ExprBuilder, ExprOperator } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { Aggregation, AggregationItem, Results } from "@sinequa/core/web-services";
import { Subscription } from "rxjs";
import { debounceTime, filter, map } from "rxjs/operators";
import { BsFacetTimelineComponent, TimelineSeries } from ".";

@Component({
  selector: "sq-facet-date",
  templateUrl: "./facet-date.html",
  styleUrls: ["./facet-date.scss"]
})
export class BsFacetDate
  extends AbstractFacet
  implements OnInit, OnChanges, OnDestroy {

  @Input() name: string = 'Date';
  @Input() results: Results;
  @Input() aggregation: string = 'Modified';
  @Input() field: string = 'modified';
  @Input() timelineAggregationName: string = 'Timeline';
  @Input() showCount: boolean = true; // Show the number of occurrences
  @Input() displayEmptyDistributionIntervals: boolean = true; // Display items with count === 0
  @Input() allowPredefinedRange = true; // will allow or not the use of datepickers and timeline for custom range selection
  @Input() allowCustomRange = true; // will allow or not the use of datepickers and timeline for custom range selection
  @Input() showCustomRange = false; // will show/hide datepickers and timeline, once allowed
  @Input() replaceCurrent = true; // if true, the previous "select" is removed first

  clearFiltersAction: Action;
  items: AggregationItem[] = [];

  form: FormGroup;
  dateRangeControl: FormControl;

  timeSeries: TimelineSeries[] = [];
  selection: (Date|undefined)[]

  private subscriptions: Subscription[] = [];
  private data: Aggregation | undefined;

  constructor(
          private facetService: FacetService,
          private formBuilder: FormBuilder,
          private exprBuilder: ExprBuilder,
          private searchService: SearchService,
          private advancedService: AdvancedService,
          private appService: AppService
      ) {
      super();

      this.clearFiltersAction = new Action({
          icon: "far fa-minus-square",
          title: "msg#facet.filters.clear",
          action: () => {
              this.facetService.clearFiltersSearch(this.name, true);
          },
      });
  }

  ngOnInit() {
      if (this.allowCustomRange) {
          this.dateRangeControl = new FormControl([undefined, undefined], [
              this.advancedService.validators.range(this.field),
              this.advancedService.validators.date(this.field)
          ]);

          this.form = this.formBuilder.group({
              dateRange: this.dateRangeControl
          });

          // Listen to query changes
          this.subscriptions.push(
              this.searchService.queryStream.subscribe(() => {
                  const value = this.getRangeValue();
                  this.dateRangeControl.setValue(value, {emitEvent: false});
                  this.selection = (!value[0] && !value[1]) ? undefined : value;
              })
          );

          // Listen to form changes
          this.subscriptions.push(
              this.dateRangeControl.valueChanges
                  .pipe(
                      debounceTime(500),
                      filter( () => this.form.valid )
                  )
                  .subscribe(
                      (value: (undefined | Date)[]) => {
                          this.facetService.clearFiltersSearch(this.name, true);
                          this.setCustomDateSelect(value);
                      }
                  )
          );
      }
  }

  ngOnChanges(changes: SimpleChanges) {
      if(this.allowCustomRange) {
          this.updateTimeSeries(this.timelineAggregationName);
      }

      if (changes.results) {
            this.data = this.getAggregation(this.aggregation);
            this.updateItems()
      }
  }

  ngOnDestroy() {
      this.subscriptions.map(item => item.unsubscribe());
  }

  get actions(): Action[] {
      const actions: Action[] = [];
      if (this.facetService.hasFiltered(this.name) && actions.length === 0) {
          actions.push(this.clearFiltersAction);
      }
      return actions;

  }

  filterItem(item: AggregationItem, event) {
    if (!this.isFiltered(item)) {
        this.facetService.addFilterSearch(this.name, this.data!, item, {replaceCurrent: this.replaceCurrent});
    } else {
        this.facetService.removeFilterSearch(this.name, this.data!, item);
    }
    event.preventDefault();
}

  private updateItems() {
    this.items = this.displayEmptyDistributionIntervals ? this.data?.items || [] : this.data?.items?.filter(item => item.count > 0) || [];
  }

  private updateTimeSeries(aggregationName: string) {
      this.timeSeries = [];
      const ccaggregation = this.appService.getCCAggregation(aggregationName);
      const aggregation = this.getAggregation(aggregationName);
      if (aggregation && ccaggregation) this.timeSeries.push(BsFacetTimelineComponent.createTimeseries({aggregation: aggregationName, primary: true}, aggregation, ccaggregation));
  }

  private getAggregation(aggregationName: string): Aggregation | undefined {
      let aggregation = this.facetService.getAggregation(aggregationName, this.results);

      if (!aggregation) {
          const query = Utils.copy(this.searchService.query);
          query.action = "aggregate";
          query.aggregations = [aggregationName];

          this.searchService.getResults(query, undefined, {searchInactive: true}).pipe(map(results => {aggregation = results.aggregations[0]}));
      }

      return aggregation
  }

  private setCustomDateSelect(range: (undefined | Date)[] | undefined) {
      let expr: string | undefined;
      if (range) {
          const from = range[0];
          const to = range[1];
          if (from && to) {
              expr = this.exprBuilder.makeRangeExpr(this.field, from, to);
          } else if (from) {
              expr = this.exprBuilder.makeNumericalExpr(this.field, ">=", from);
          } else if (to) {
              expr = this.exprBuilder.makeNumericalExpr(this.field, "<=", to);
          }
      }

      this.searchService.query.removeSelect(this.name);
      if (expr) {
          this.searchService.query.addSelect(expr, this.name);
      }

      this.searchService.search();
  }

  private getRangeValue(): any {
      const expr = this.getDateExprFromUrl();
      if (expr) {
          const value = this.getValueFromExpr(expr);
          if (Utils.isArray(value)) {
              return value
          } else {
              if (expr.operator === ExprOperator.gte || expr.operator === ExprOperator.gt) {
                  return [value, undefined];
              } else if (expr.operator === ExprOperator.lte || expr.operator === ExprOperator.lt) {
                  return [undefined, value];
              }
          }
      }
      return [undefined, undefined];
  }

  private getDateExprFromUrl(): Expr | undefined {
      const expression = this.searchService.query.findSelect(this.name)?.expression;
      if (expression) {
          const expr = this.appService.parseExpr(expression);
          if (expr instanceof Expr) {
              return expr;
          }
      }
      return undefined;
  }

  private getValueFromExpr(expr: Expr): any {
      if (expr.values && expr.values.length > 1) {
          return expr.values;
      } else {
          return expr.value!
      }
  }

  public updateRange(range: Date[]) {
      if (!!range) {
          this.setCustomDateSelect(range);
      }
  }

  public isFiltered(item: AggregationItem): boolean {
      const filtered = this.facetService.getAggregationItemsFiltered(this.name)
      return this.facetService.filteredIndex(this.data, filtered, item) !== -1;
}
}
