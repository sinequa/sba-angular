import { Component, OnChanges, Input, Output, EventEmitter, ChangeDetectorRef, ComponentRef, SimpleChanges } from '@angular/core';
import { Results } from '@sinequa/core/web-services';
import { AbstractFacet } from '../../abstract-facet';
import { Action } from '@sinequa/components/action';
import { FacetService } from '../../facet.service';
import { MapOf, Utils } from '@sinequa/core/base';

export interface FacetConfig {
  name: string;
  type: string;
  title: string;
  aggregation: string;
  icon?: string;
  includedTabs?: string[];
  excludedTabs?: string[];
  parameters?: MapOf<any>;
}

declare interface FacetMultiConfig extends FacetConfig {
  // Properties internally setup by this component
  $count?: string;
  $hasData?: boolean;
  $hasFiltered?: boolean;
  $hidden?: boolean;
}

@Component({
  selector: 'sq-facet-multi',
  templateUrl: './facet-multi.component.html',
  styleUrls: ['./facet-multi.component.scss']
})
export class BsFacetMultiComponent extends AbstractFacet implements OnChanges {

  @Input() results: Results;
  @Input() facets: FacetMultiConfig[];
  @Input() facetComponents: MapOf<any> = {};
  @Input() showCount: boolean = true;

  @Output() events = new EventEmitter<FacetMultiConfig>();

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
        const facetsWithFiltered = this.facets.filter((facet) => facet.$hasFiltered).map(facet => facet.name);
        this.facetService.clearFiltersSearch(facetsWithFiltered, true);
      }
    });

  }

  /**
   * If a sub-facet is opened, add a Back button and forward
   * the actions of the facet.
   */
  get actions(): Action[] {
    const actions: Action[] = [];
    if(this.openedFacet){
      actions.push(this.backAction);
    } else {
      const hasFiltered = this.facets.some(facet => facet.$hasFiltered);
      if (hasFiltered) actions.push(this.clearAllFiltersAction);
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
    this.facetService.clearFiltersSearch(facet.name, true);
    return false;
  }

  /**
   * Return the number of items to display for a given facet
   * @param facet
   */
  private getFacetCount(facet: FacetMultiConfig): string {
    const agg = this.results.aggregations.find(agg => Utils.eqNC(agg.name, facet.aggregation)); // avoid calling getAggregation() which is costly for trees
    if (!agg?.items)
      return "";
    const count = this.facetService.getAggregationCount(facet.aggregation); // configured count (default: 10)
    const aggItemCounter = (!agg.isDistribution || facet?.parameters?.displayEmptyDistributionIntervals)
      ? agg.items.length
      : agg.items.filter(item => item.count > 0).length;
    return aggItemCounter >= count ? `${count}+` : `${aggItemCounter}`;
  }

  /**
   * Return whether a given facet has been used in the current context
   * @param facet
   */
  private hasFiltered(facet: FacetMultiConfig): boolean {
    return this.facetService.hasFiltered(facet.name);
  }

  /**
   * When the results change, actualize count, hasData and hasFiltered
   * which are displayed in the template.
   * Also, update list of inputs passed to child facets
   */
  ngOnChanges(changes: SimpleChanges) {
    this.facets.forEach(facet => {
      facet.$count = this.getFacetCount(facet);
      facet.$hasData = this.facetService.hasData(facet.aggregation, this.results);
      facet.$hasFiltered = this.hasFiltered(facet);
      // The facet is hidden if there are included tabs and the current tab is not in it
      // OR if there are excluded tabs and the current tab is in it.
      facet.$hidden = (facet?.includedTabs && !facet?.includedTabs.includes(this.results.tab)) || facet?.excludedTabs?.includes(this.results.tab);
    });
    // Update list of inputs used by child facet
    // PS: attributes of openedFacet MUST have the same name as component's inputs name
    if (!changes.facets) {
        this.facetComponentInputs = {results: this.results}
    } else {
        this.facetComponentInputs = this.getFacetInputs();
    }
    this.changeDetectorRef.detectChanges();
  }

  onFacetLoad(componentRef: {componentRef: ComponentRef<AbstractFacet> | undefined}) {
        this.facetComponent = componentRef?.componentRef?.instance;
  }

  getFacetInputs(): MapOf<any> {
      return {...this.facetService.flattenFacetConfig(this.openedFacet) , results: this.results};
  }

  get component() {
      if (this.facetComponents && this.openedFacet) {
          return this.facetComponents[this.openedFacet['type']];
      }
      return undefined
  }

}
