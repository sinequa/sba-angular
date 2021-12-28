import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
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
import { Aggregation, CCAggregation, Results } from "@sinequa/core/web-services";
import { Subscription } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { BsFacetTimelineComponent, TimelineSeries } from ".";

@Component({
  selector: "sq-facet-date",
  templateUrl: "./facet-date.html"
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
  @Input() allowExclude: boolean = true; // Allow to exclude selected items
  @Input() allowOr: boolean = true; // Allow to search various items in OR mode
  @Input() allowAnd: boolean = false; // Allow to search various items in AND mode
  @Input() searchable: boolean = false; // Allow to search for items in the facet
  @Input() displayEmptyDistributionIntervals: boolean = true; // Display items with count === 0
  @Input() showProgressBar = false; // will display or not item count as progress bar
  @Input() allowCustomRange = true; // will allow or not the use of datepickers and timeline for custom range selection
  @Input() showCustomRange = false; // will show/hide datepickers and timeline, once allowed
  @Input() replaceCurrent = true; // if true, the previous "select" is removed first

  @ViewChild("facet", {static: false}) public facetComponent: AbstractFacet;

  clearFiltersAction: Action;

  form: FormGroup;
  dateRangeControl: FormControl;

  timeSeries: TimelineSeries[] = [];
  selection: (Date|undefined)[]

  private subscriptions: Subscription[] = [];

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
                  //this.selection = value
                  this.selection = (!value[0] && !value[1]) ? undefined : value;
              })
          );

          // Listen to form changes
          this.subscriptions.push(
              this.dateRangeControl.valueChanges
                  .pipe(debounceTime(500))
                  .subscribe(
                      (value: (undefined | Date)[]) => {
                          if (this.form.valid) {
                              this.facetService.clearFiltersSearch(this.name, true);
                              this.setCustomDateSelect(value);
                          }
                      }
                  )
          );
      }
  }

  ngOnChanges(changes: SimpleChanges) {
      if((changes.timelineAggregationName || changes.results || changes.allowCustomRange) && this.allowCustomRange) {
          this.updateTimeSeries(this.timelineAggregationName);
      }
  }

  ngOnDestroy() {
      this.subscriptions.map(item => item.unsubscribe());
  }

  get actions(): Action[] {
      const actions: Action[] = [];

      actions.push(...this.facetActions);
      if (this.facetService.hasFiltered(this.name) && actions.length === 0) {
          actions.push(this.clearFiltersAction);
      }
      return actions;

  }

  /**
   * Return the actions of the child facet
   */
  get facetActions(): Action[] {
      if(this.facetComponent){
          return this.facetComponent.actions;
      }
      return [];
  }

  private updateTimeSeries(aggregationName: string) {
      this.timeSeries = [];
      const {aggregation, ccaggregation} = this.getAggregation(aggregationName);
      this.timeSeries.push(BsFacetTimelineComponent.createTimeseries({aggregation: aggregationName, primary: true}, aggregation, ccaggregation));
  }

  private getAggregation(aggregationName: string): {aggregation: Aggregation, ccaggregation: CCAggregation} {
      const ccaggregation = this.appService.getCCAggregation(aggregationName);
      let aggregation = this.facetService.getAggregation(aggregationName, this.results);

      if (!aggregation) {
          const query = Utils.copy(this.searchService.query);
          query.action = "aggregate";
          query.aggregations = [aggregationName];

          this.searchService.getResults(query, undefined, {searchInactive: true}).pipe(map(results => {aggregation = results.aggregations[0]}));
      }

      return {aggregation: aggregation!, ccaggregation: ccaggregation!}
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
}
