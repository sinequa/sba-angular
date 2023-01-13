import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef, ComponentRef, SimpleChanges, Type } from '@angular/core';
import { Results } from '@sinequa/core/web-services';
import { AbstractFacet } from '../../abstract-facet';
import { FacetConfig, default_facet_components } from "../../facet-config";
import { Action } from '@sinequa/components/action';
import { FacetService } from '../../facet.service';
import { MapOf } from '@sinequa/core/base';
import { Query } from '@sinequa/core/app-utils';

declare interface FacetMultiConfig extends FacetConfig<{displayEmptyDistributionIntervals?: boolean}> {
  // Properties internally setup by this component
  $count: number;
  $hasMore: boolean;
  $hasFiltered: boolean;
  $hidden: boolean;
  $fields: string[];
}

@Component({
  selector: 'sq-facet-multi',
  templateUrl: './facet-multi.component.html',
  styleUrls: ['./facet-multi.component.scss']
})
export class BsFacetMultiComponent extends AbstractFacet implements OnChanges {

  @Input() results: Results;
  @Input() query?: Query;
  @Input() facets: FacetMultiConfig[];
  @Input() facetComponents: MapOf<Type<any>> = default_facet_components;
  @Input() showCount: boolean = true;

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

  constructor(
    public facetService: FacetService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    super();

    this.backAction = new Action({
      name: "back",
      icon: "fas fa-arrow-left",
      title: "msg#facet.filters.back",
      action: () => {
        this.openedFacet = undefined;
        this.events.next(undefined);
        this.changeDetectorRef.detectChanges();
      }
    });

    this.clearAllFiltersAction = new Action({
      icon: "far fa-minus-square",
      title: "msg#facet.filters.clear",
      action: () => {
        const fields = this.facets
          .filter((facet) => facet.$hasFiltered)
          .map(facet => facet.$fields)
          .flat();
        this.facetService.clearFiltersSearch(fields, true, this.query);
      }
    });

  }

  /**
   * If a sub-facet is opened, add a Back button and forward
   * the actions of the facet.
   */
  override get actions(): Action[] {
    const actions: Action[] = [];
    if(this.openedFacet){
      actions.push(this.backAction);
    }
    else if (this.facets.some(facet => facet.$hasFiltered)) {
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

  clearFacetFilters(facet: FacetMultiConfig, e:Event) {
    e.stopPropagation();
    this.facetService.clearFiltersSearch(facet.$fields, true, this.query, facet.name);
    return false;
  }

  initFacet(facet: FacetMultiConfig) {
    const aggregations = Array.isArray(facet.aggregation)? facet.aggregation : [facet.aggregation];

    facet.$fields = [];
    facet.$count = 0;
    facet.$hasMore = false;
    facet.$hasFiltered = false;

    for(let aggregation of aggregations) {
      const agg = this.facetService.getAggregation(aggregation);
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
    for(let facet of this.facets) {
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
