import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {UntypedFormGroup, UntypedFormBuilder, AbstractControl} from "@angular/forms";
import {AuditEventType, Results} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {SearchService} from "@sinequa/components/search";
import {AbstractFacet} from "../../abstract-facet";
import {FacetConfig} from "../../facet-config";
import { AppService, Query } from "@sinequa/core/app-utils";
import { FacetService } from "../../facet.service";

export interface FacetRefineParams {
    suggestQuery?: string;
    autocompleteEnabled?: boolean;
    suggestDelay?: number;
}

export interface FacetRefineConfig extends FacetConfig<FacetRefineParams> {
    type: 'refine';
}

@Component({
    selector: "sq-refine",
    templateUrl: "./facet-refine.html"
})
export class BsRefine extends AbstractFacet implements FacetRefineParams, OnChanges {

    /**
     * Results of the search page associated to this refine
     */
    @Input() results: Results;

    @Input("query") _query?: Query;

    /**
     * Whether or not to enable autocompletion
     */
    @Input() autocompleteEnabled = true;

    /**
     * Suggest query with which to perform autocompletion
     */
    @Input("suggestQuery") _suggestQuery: string;

    /**
     * Minimum delay (in ms) between suggest queries
     */
    @Input() suggestDelay: number = 200;

    form: UntypedFormGroup;
    searchControl: AbstractControl;

    inputErrorMessage: string;

    get query(): Query {
        return this._query || this.searchService.query;
    }

    get suggestQuery() {
        return this._suggestQuery || this.appService.suggestQueries[0];
    }

    constructor(
        public formBuilder: UntypedFormBuilder,
        public appService: AppService,
        public searchService: SearchService,
        public facetService: FacetService) {
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.form) {
            this.form = this.formBuilder.group({
                search: ""
            });
            this.searchControl = this.form.get("search")!;
        }
        if (changes.results) {
            const refines = this.query.getRefines();
            this.searchControl.setValue(refines[refines.length-1] || '');
        }
    }

    doRefine = () => {
        const text = Utils.trim(this.searchControl.value);
        if (text) {
            this.query.addRefine(text);
            if(this.facetService.canSearch(this.query)) {
                this.searchService.search(undefined, {
                    type: AuditEventType.Search_Refine,
                    detail: {
                        text: text,
                        itembox: "refine",
                        fromresultid: this.results?.id || null
                    }
                });
            }
        }
    }

}
