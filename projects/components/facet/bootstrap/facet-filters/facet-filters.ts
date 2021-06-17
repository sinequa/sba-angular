import {Component, Input, OnChanges} from "@angular/core";
import {Results, UserSettingsWebService} from "@sinequa/core/web-services";
import {FacetService, FacetState} from "../../facet.service";
import {Action} from "@sinequa/components/action";
import {FacetConfig} from '../facet-multi/facet-multi.component';
import {BsFacetList} from '../facet-list/facet-list';
import {BsFacetTree} from '../facet-tree/facet-tree';

@Component({
    selector: "sq-facet-filters",
    templateUrl: "./facet-filters.html",
    styleUrls: ["./facet-filters.css"]
})
export class BsFacetFilters implements OnChanges {
    @Input() results: Results;
    @Input() facets: FacetConfig[];
    @Input() enableAddFacet = false;

    @Input() autoAdjust: boolean = true;
    @Input() autoAdjustBreakpoint: string = 'xl';
    @Input() rightAligned: boolean = false;
    @Input() size: string;

    filters: Action[] = [];
    hidden: boolean = false;

    facetStatus = {
        add: {
            title: "msg#facet.filters.add",
            icon: "fas fa-plus"
        },
        remove: {
            title: "msg#facet.filters.remove",
            icon: "fas fa-minus"
        }
    };

    constructor(
        private facetService: FacetService,
        private userSettingsService: UserSettingsWebService
    ) {
        this.hidden = false;
        this.filters = [];
    }

    ngOnInit() {
        if (!this.userFacets || this.userFacets.length === 0) this.initUserFacets();
    }

    ngOnChanges() {
        if(!!this.results)
            this.buildFilters();

        if(!this.results)
            this.hidden=true;
    }

    /**
     * Build filters bar actions
     */
    private buildFilters() {

        // For each facet
        this.filters = this.filteredFacets.map((facet: FacetConfig) => {

            const children = [
                new Action({
                    component: (facet.type === 'list') ? BsFacetList : BsFacetTree,
                    componentInputs: {results: this.results, name: facet.name, aggregation: facet.aggregation, searchable: facet.searchable, displayActions: true}
                })
            ];

            if (this.enableAddFacet) {
                const isOpened = this.facetService.isFacetOpened(facet.name);

                children.push(...[
                    new Action({separator: true}),
                    new Action({
                    name: "toggle-facet",
                    icon: isOpened ? this.facetStatus.remove.icon : this.facetStatus.add.icon,
                    text: isOpened ? this.facetStatus.remove.title : this.facetStatus.add.title,
                    title: isOpened ? this.facetStatus.remove.title : this.facetStatus.add.title,
                    data: facet,
                    action: (ActionItem: Action, $event: UIEvent) => {
                        this.onClickToggleFacet(ActionItem, $event);
                    }
                })]);
            }

            return new Action({
                name: facet.name,
                text: facet.title,
                title: facet.title,
                icon: facet.icon,
                disabled: !this.hasData(facet),
                styles: this.hasFiltered(facet.name) ? "ml-2 font-weight-bold" : "ml-2",
                children: children
            });
        });

        this.addFacetMenu();
    }

    onClickToggleFacet(item: Action, $event: UIEvent) {

        const facet = item.data as any;

        if (item.title === this.facetStatus.add.title) {
            item.text = item.title = this.facetStatus.remove.title;
            item.icon = this.facetStatus.remove.icon;
            this.facetService.addFacet({name: facet.name, position: 0, hidden: false, expanded: true, view: ""});
        }
        else {
            item.text = item.title = this.facetStatus.add.title;
            item.icon = this.facetStatus.add.icon;
            this.facetService.removeFacet({name: facet.name, position: 0, hidden: false, expanded: true, view: ""});
            this.buildFilters()
        }
    }

    /**
     * Use to outline facet when filters are sets
     * @param facetName facet name
     *
     * @returns true if filters are sets otherwise false
     */
    private hasFiltered(facetName): boolean {
        return this.facetService.hasFiltered(facetName);
    }

    /**
     * Use to disable menu item when no items in a facet
     * @param facet facet to check
     *
     * @returns true if facet contains at least one item otherwise false
     */
    private hasData(facet: FacetConfig): boolean {
        return this.facetService.hasData(facet.aggregation, this.results);
    }

    private addFacetMenu() {
        if (!this.userFacets || this.userFacets?.length < this.facets.length) { 
            let outFacets: Action[] = [];

            outFacets.push(new Action({
                name: `add_all`,
                text: "All",
                title: `Add all facets`,
                action: () => {
                    if (this.userSettingsService.userSettings) this.userSettingsService.userSettings["facets"] = undefined;
                    this.userSettingsService.save();
                    this.initUserFacets();
                    this.buildFilters();
                }
            }));

            for (let facet of this.facets) {
                if (!this.userFacets?.find(userFacet => userFacet.name === facet.name)) outFacets.push(new Action({
                    name: `add_${facet.name}`,
                    text: facet.title,
                    icon: facet.icon,
                    title: `Add ${facet.title}`,
                    action: () => {
                        this.facetService.addFacet({name: facet.name, position: 0, hidden: false, expanded: true, view: ""});
                        this.buildFilters();
                    }
                }));
            }

            let add_action = new Action({
                name: "add_facet",
                text: "Add",
                icon: "fas fa-plus",
                children: outFacets
            });
            this.filters = [add_action, ...this.filters]; 
       }
    }

    get filteredFacets() {
        let new_facets: FacetConfig[] = [];

        if (this.userFacets) {
            for (let facet of this.facets) {
                let pos = this.userFacets.findIndex((userFacet) => userFacet.name === facet.name);
                if (pos >= 0) new_facets.push(facet);
            }
        }
        return new_facets;
    }

    private initUserFacets() {
        for (let facet of this.facets) { 
            if (!this.userFacets?.find(userFacet => userFacet.name === facet.name))
                this.facetService.addFacet({name: facet.name, position: 0, hidden: false, expanded: true, view: ""});
        }
    }

    get userFacets() {
        if (!this.userSettingsService.userSettings || !this.userSettingsService.userSettings["facets"] || this.userSettingsService.userSettings["facets"].length === 0) return;
        return <FacetState[]>this.userSettingsService.userSettings["facets"];
    }
}
