import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef, ComponentRef, SimpleChanges, Type, OnDestroy } from '@angular/core';
import { Results } from '@sinequa/core/web-services';
import { AbstractFacet } from '../../abstract-facet';
import { FacetConfig, DEFAULT_FACET_COMPONENTS } from "../../facet-config";
import { Action } from '@sinequa/components/action';
import { FacetEventType, FacetService } from '../../facet.service';
import { MapOf, Utils } from '@sinequa/core/base';
import { Query } from '@sinequa/core/app-utils';
import { Subscription } from 'rxjs';

declare interface FacetMultiConfig extends FacetConfig<{displayEmptyDistributionIntervals?: boolean}> {
  // Properties internally setup by this component
  $count: number;
  $hasMore: boolean;
  $hasFiltered: boolean;
  $hidden: boolean;
  $fields: string[];
  $disabled?: boolean;
}

@Component({
  selector: 'sq-facet-multi',
  templateUrl: './facet-multi.component.html',
  styleUrls: ['./facet-multi.component.scss']
})
export class BsFacetMultiComponent extends AbstractFacet implements OnChanges, OnDestroy {

  @Input() results: Results;
  @Input() query?: Query;
  @Input() facets: FacetMultiConfig[];
  @Input() facetComponents: MapOf<Type<any>> = DEFAULT_FACET_COMPONENTS;
  @Input() showCount: boolean = true;
  @Input() name = "facet-multi";
  @Input() icon = "fas fa-filter";
  @Input() title = "msg#facet.filters.title";

  @Output() events = new EventEmitter<FacetMultiConfig|undefined>();

  /**
   * A reference to the facet child component
   */
  facetComponent?: AbstractFacet;

  /**
   * The facet configuration to open
   */
  openedFacet?: FacetMultiConfig;

  /**
   * Action to switch back from an opened facet to the facet multi view
   */
  backAction: Action;
  clearAllFiltersAction: Action;

  facetComponentInputs: MapOf<any>;

  subscription: Subscription;

  constructor(
    public facetService: FacetService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    super();

    this.clearAllFiltersAction = new Action({
      icon: "sq-filter-clear",
      title: "msg#facet.clearSelects",
      action: () => {
        const fields = this.facets
          .filter((facet) => facet.$hasFiltered)
          .map(facet => facet.$fields)
          .flat();
        this.facetService.clearFiltersSearch(fields, true, this.query, this.name);
      }
    });

    this.subscription = this.facetService.events.subscribe(event => {
      if(event.type === FacetEventType.AddFilter && this.openedFacet) {
        this.close();
      }
    });

  }

  /**
   * If a sub-facet is opened, add a Back button and forward
   * the actions of the facet.
   */
  override get actions(): Action[] {
    const actions: Action[] = [];
    if (!this.openedFacet && this.facets.some(facet => facet.$hasFiltered)) {
      actions.push(this.clearAllFiltersAction);
    }
    if(this.facetComponent){
      actions.push(...this.facetActions);
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

  /**
   * Open this sub facet
   * @param facet
   */
  openFacet(facet: FacetMultiConfig){
    this.openedFacet = facet;
    this.facetComponentInputs = this.getFacetInputs();
    this.events.next(facet);
    this.changeDetectorRef.detectChanges();
  }

  close() {
    this.openedFacet = undefined;
    this.events.next(undefined);
    this.changeDetectorRef.detectChanges();
  }

  clearFacetFilters(facet: FacetMultiConfig, e:Event) {
    e.stopPropagation();
    this.facetService.clearFiltersSearch(facet.$fields, true, this.query, facet.name);
    return false;
  }

  initFacet(facet: FacetMultiConfig) {
    facet.$fields = [];
    facet.$count = 0;
    facet.$hasMore = false;
    facet.$hasFiltered = false;

    for(const aggregation of Utils.asArray(facet.aggregation)) {
      const agg = this.facetService.getAggregation(aggregation, this.results);
      if(agg) {
        facet.$fields.push(agg.column);
        if(agg.items) {
          const aggCount = agg.$cccount < 0 ? agg.items.length : agg.$cccount; // configured count (default: 10)
          const aggItemCounter = (!agg.isDistribution || facet?.parameters?.displayEmptyDistributionIntervals)
            ? agg.items.length
            : agg.items.filter(item => item.count > 0).length;
          if(aggItemCounter >= aggCount) {
            facet.$count += aggCount;
            facet.$hasMore = true; // The number of items is superior or equal to the configured number
          }
          else {
            facet.$count += aggItemCounter;
          }
        }
        if(agg.$filtered.length > 0) {
          facet.$hasFiltered = true;
        }

        if(facet.$count === 0) {
          facet.$disabled = true;
        }
        // if facet is of type = "datetime" the facet should be enabled
        if(agg.$cccolumn?.type === "datetime" || facet.$count > 0) {
          facet.$disabled = false;
        }
      }
    }

    // The facet is hidden if there are included tabs and the current tab is not in it
    // OR if there are excluded tabs and the current tab is in it.
    facet.$hidden = !this.facetService.isFacetIncluded(facet, this.results);
  }
  /**
   * When the results change, actualize count, hasData and hasFiltered
   * which are displayed in the template.
   * Also, update list of inputs passed to child facets
   */
  ngOnChanges(changes: SimpleChanges) {
    for(const facet of this.facets) {
      this.initFacet(facet);
    }
    // Update list of inputs used by child facet
    // PS: attributes of openedFacet MUST have the same name as component's inputs name
    if (changes.results) {
      this.facetComponentInputs = {results: this.results}
    }
    if (changes.facets) {
      this.facetComponentInputs = this.getFacetInputs();
    }

    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFacetLoad(componentRef: {componentRef: ComponentRef<AbstractFacet> | undefined}) {
    this.facetComponent = componentRef?.componentRef?.instance;
  }

  getFacetInputs(): MapOf<any> {
    return {
      ...this.openedFacet?.parameters,
      name: this.openedFacet?.name,
      aggregation: this.openedFacet?.aggregation,
      results: this.results
    };
  }

  get component() {
    if (this.facetComponents && this.openedFacet) {
      return this.facetComponents[this.openedFacet.type];
    }
    return undefined
  }

}
