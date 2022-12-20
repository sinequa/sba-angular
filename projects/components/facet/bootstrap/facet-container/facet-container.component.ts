import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, Type, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { AbstractFacet, FacetConfig } from "@sinequa/components/facet";
import { FirstPageService, SearchService } from "@sinequa/components/search";
import { Query } from "@sinequa/core/app-utils";
import { MapOf } from "@sinequa/core/base";

@Component({
  selector: 'sq-facet-container',
  templateUrl: './facet-container.component.html',
  styles: [`
  .facet-container ::ng-deep .list-group {
    margin: 0 -0.75rem;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetContainerComponent<T extends {}> implements OnChanges {

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
    if(!this.searchService.results) {
      return 'all';
    }
    return this._resultsMode;
  }

  set resultsMode(mode: 'current' | 'all') {
    this._resultsMode = mode;
    this.setFacetInputs();
  }


  constructor(
    public searchService: SearchService,
    public firstPageService: FirstPageService,
    public cdRef: ChangeDetectorRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateFacetList();
    if(this.openedFacet) {
      this.setFacetInputs();
    }
  }


  // Facet management

  updateFacetList() {
    this.facetList = this.facetConfigs.map(config => {
      if(config.name === "concepts") {
        return {config, filters: this.query?.getConcepts().length || 0};
      }
      const filters = this.query?.getFilterCount(config.name) || 0;
      return {config, filters}
    })
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
        results: this.resultsMode === 'current'? {...this.searchService.results} : {...this.firstPageService.firstPage}, // Force new result object to trigger change detection
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
