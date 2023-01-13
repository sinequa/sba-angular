import {ChangeDetectorRef, Component, ComponentRef, Input, OnChanges, OnDestroy, Type} from "@angular/core";
import {Results} from "@sinequa/core/web-services";
import {FacetService, NamedFacetConfig} from "../../facet.service";
import {Action} from "@sinequa/components/action";
import { FacetConfig, default_facet_components } from "../../facet-config";
import { MapOf } from "@sinequa/core/base";
import { Subscription } from "rxjs";
import { AbstractFacet } from "../../abstract-facet";

@Component({
    selector: "sq-facet-filters",
    templateUrl: "./facet-filters.html",
    styleUrls: ["./facet-filters.scss"]
})
export class BsFacetFilters implements OnChanges, OnDestroy {
    @Input() results: Results;
    @Input() facets: FacetConfig<{}>[];
    @Input() facetComponents: MapOf<Type<any>> = default_facet_components;
    @Input() enableCustomization = false;

    @Input() autoAdjust: boolean = true;
    @Input() autoAdjustBreakpoint: string = 'xl';
    @Input() collapseBreakpoint: string = 'sm';
    @Input() rightAligned: boolean = false;
    @Input() size: string;

    filters: Action[] = [];
    facetMenu: Action | undefined;

    // When a facet is opened
    openedFacet: FacetConfig<{}> | undefined;
    facetInstance: AbstractFacet | undefined;

    sub: Subscription;

    constructor(
        private facetService: FacetService,
        private cdRef: ChangeDetectorRef
    ) {
        this.filters = [];
    }

    ngOnChanges() {
        if (this.enableCustomization) {
            const facets = this.facets.filter(f => f.name) as NamedFacetConfig[];

            if (!this.facetService.defaultFacets) {
                this.facetService.defaultFacets = facets
                    .map(f => ({name: f.name!, position: 0}));
            }

            if (!this.facetService.allFacets) {
                this.facetService.allFacets = facets;
            }
        }

        if(this.results) {
            this.buildFilters();
        }

        if(!this.sub) {
            this.sub = this.facetService.changes.subscribe(() => this.buildFilters());
        }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Build filters bar actions
     */
    protected buildFilters() {

        // For each facet
        this.filters = this.filteredFacets.map(facet => {

            const component = this.facetComponents[facet.type];
            const componentInputs = {
                ...facet.parameters,
                name: facet.name,
                aggregation: facet.aggregation,
                results: this.results
            };

            let disabled = true;
            let filtered = false;
            const aggregations = Array.isArray(facet.aggregation)? facet.aggregation : [facet.aggregation];
            for(let aggregation of aggregations) {
                const agg = this.facetService.getAggregation(aggregation);
                if(agg?.items?.length) {
                    disabled = false;
                    filtered = filtered || agg.$filtered.length > 0;
                }
            }

            return new Action({
                name: facet.name,
                text: facet.title,
                title: facet.title,
                icon: facet.icon,
                disabled,
                styles: `${facet.className || ''} ${filtered? "filtered" : disabled? "disabled" : ''}`,
                action: () => this.openFacet(facet),
                data: facet,
                component,
                componentInputs
            });
        });

        if (this.enableCustomization) {
            this.facetMenu = this.facetService.createFacetMenu();
        }

        this.cdRef.detectChanges(); // needed to detect changes in the facet actions when results change
    }

    openFacet(facet: FacetConfig<{}>) {
        if(this.openedFacet) {
          this.openedFacet = undefined;
          this.cdRef.detectChanges(); // Force a new call to onLoadFacet
        }
        this.openedFacet = facet;
    }

    onLoadFacet(event: {componentRef: ComponentRef<AbstractFacet> | undefined}) {
        this.facetInstance = event.componentRef?.instance;
        this.cdRef.detectChanges(); // Detect changes manually, because the facet actions need to be displayed
    }

    get facetActions(): Action[] | undefined {
        return this.facetInstance?.actions;
    }

    get isFacetEmpty(): boolean {
        return !!this.facetInstance?.isHidden();
    }

    get filteredFacets() {
        const filtered = this.facets.filter(facet => this.facetService.isFacetIncluded(facet, this.results))

        if (!this.enableCustomization) return filtered;

        const new_facets: FacetConfig<{}>[] = [];

        if (this.userFacets) {
            for (const facet of filtered) {
                const pos = this.userFacets.findIndex((userFacet) => userFacet.name === facet.name);
                if (pos >= 0) new_facets.push(facet);
            }
        }
        return new_facets;
    }

    get userFacets() {
        return this.facetService.facets;
    }

    get hasFacetSelected() {
        if (this.userFacets.length === 0) return false;
        for (const facet of this.facets) {
            if (this.userFacets.find(userFacet => userFacet.name === facet.name)) return true;
        }
        return false;
    }

    trackByData = (action: Action) => {
        return action.data; // Necessary to maintain the same DOM elements when filters are rebuilt
    }
}
