import { ChangeDetectorRef, Component, ComponentRef, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, Type, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "../../abstract-facet";
import { FacetConfig } from "../../facet-config";
import { FirstPageService, SearchService } from "@sinequa/components/search";
import { AppService, Query } from "@sinequa/core/app-utils";
import { MapOf, Utils } from "@sinequa/core/base";
import { Results } from "@sinequa/core/web-services";
import { FacetService } from "../../facet.service";

@Component({
  selector: 'sq-facet-container',
  templateUrl: './facet-container.component.html'
})
export class FacetContainerComponent<T extends {}> implements OnChanges {

  @Input() results?: Results;
  @Input() query?: Query;
  @Input() facetComponents: Record<string, Type<any>>;
  @Input() facetConfigs: FacetConfig<T>[];

  @Output() facetOpen = new EventEmitter<boolean>();

  @ViewChild("buttonList", {read: ElementRef}) buttonList: ElementRef<HTMLDivElement>;

  openedFacet: FacetConfig<T> | undefined;
  facetInputs: MapOf<any> | undefined;
  facetInstance: AbstractFacet | undefined;

  facetList: {config: FacetConfig<T>, filters: number}[];

  closeFacet = new Action({
    icon: "fas fa-times",
    title: "msg#facet.container.close",
    action: () => {
      this.openedFacet = undefined;
      this.facetOpen.emit(false);
    }
  });

  _resultsMode: 'current' | 'all' = 'current';

  get resultsMode() {
    if(!this.results) {
      return 'all';
    }
    return this._resultsMode;
  }

  set resultsMode(mode: 'current' | 'all') {
    this._resultsMode = mode;
    this.setFacetInputs();
  }


  constructor(
    public appService: AppService,
    public facetService: FacetService,
    public searchService: SearchService,
    public firstPageService: FirstPageService,
    public cdRef: ChangeDetectorRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateFacetList();
    if(this.openedFacet) {
      // When the query was changed (eg. a filter was applied), but there are no new results (yet)
      if(changes.query && !changes.results) {
        // If we are on a search route, results are incoming
        const query = this.query || this.searchService.query;
        if(this.facetService.canSearch(query)) {
          // We want to avoid refreshing facets twice on the search page
          // When the query changes and then the results change
          return;
        }
        // If we are on the home page, results are not incoming so facets
        // will be refreshed with the same data
        const results = this.results || this.firstPageService.firstPage;
        if(results) {
          // Reinitialize aggregations (in particular the $filtered flags)
          this.searchService.initializeAggregations(query, results);
        }
      }
      this.setFacetInputs();
    }
  }


  // Facet management

  updateFacetList() {
    const query = this.query || this.searchService.query;
    const ccquery = this.appService.getCCQuery(query.name);
    this.facetList = this.facetConfigs.map(config => {
      const aggregations = Utils.asArray(config.aggregation);
      let filters = 0;
      for(let aggregation of aggregations) {
        const ccagg = this.appService.getCCAggregation(aggregation, ccquery);
        if(ccagg) {
          if(ccagg.column.toLowerCase() === "concepts") {
            filters += query.getConcepts().length || 0;
          }
          else {
            filters += query.getFilterCount([ccagg.column]) || 0;
          }
        }
      }
      return {config, filters};
    });
  }

  open(facet: FacetConfig<T>) {
    this.facetInputs = undefined;
    if(this.openedFacet === facet) {
      this.openedFacet = undefined;
    }
    else {
      this.openedFacet = facet;
      this.setFacetInputs();
      // The following makes sure the facet is visible after it is open
      setTimeout(() => this.buttonList.nativeElement.scrollIntoView(false));
    }
    this.facetOpen.emit(!!this.openedFacet);
  }

  setFacetInputs() {
    if(this.resultsMode === 'all' && !this.firstPageService.firstPage) {
      this.facetInputs = undefined;
      this.firstPageService.getFirstPage()
        .subscribe(() => {
          this.setFacetInputs();
        });
    }
    else {
      this.facetInputs = {
        ...this.openedFacet?.parameters,
        name: this.openedFacet?.name,
        aggregation: this.openedFacet?.aggregation,
        results: this.resultsMode === 'current'? {...this.results} : {...this.firstPageService.firstPage}, // Force change detection on the child facet
        query: this.query
      };
      this.cdRef.detectChanges(); // Setting the facetInputs can results in new facetActions (without necessarily triggering onLoadComponent())
    }
  }

  onLoadComponent(event: {componentRef: ComponentRef<AbstractFacet> | undefined}) {
    this.facetInstance = event.componentRef?.instance;
    this.cdRef.detectChanges(); // Detect changes manually, because the facet actions need to be displayed
  }

  get facetActions(): Action[] {
    const actions = this.facetInstance?.actions || [];
    actions.push(this.closeFacet);
    return actions;
  }

  get isFacetEmpty(): boolean {
    return !!this.facetInstance?.isHidden();
  }
}
