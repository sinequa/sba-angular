import {Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef} from "@angular/core";
import {FormGroup, FormBuilder, AbstractControl} from "@angular/forms";
import {Results} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {SearchService} from "@sinequa/components/search";
import {AbstractFacet} from "../../abstract-facet";
import {ParseResult} from '@sinequa/components/autocomplete';

@Component({
    selector: "sq-refine",
    templateUrl: "./facet-refine.html"
})
export class BsRefine extends AbstractFacet implements OnChanges {

    /**
     * Results of the search page associated to this refine
     */
    @Input() results: Results;

    /**
     * Whether or not to enable autocompletion
     */
    @Input() autocompleteEnabled: boolean;

    /**
     * Suggest query with which to perform autocompletion
     */
    @Input() suggestQuery: string;

    /**
     * Minimum delay (in ms) between suggest queries
     */
    @Input() suggestDelay: number = 200;

    form: FormGroup;
    searchControl: AbstractControl | null;

    inputErrorMessage: string;

    constructor(
        public formBuilder: FormBuilder,
        public searchService: SearchService,
        private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.form) {
            this.form = this.formBuilder.group({
                "search": ""
            });
            this.searchControl = this.form.get("search");
        }
        if (!!changes["results"] && this.searchControl) {
            this.searchControl.setValue(this.searchService.lastRefineText);
        }
    }

    doRefine = () => {
        if (this.searchControl) {
            const text = Utils.trim(this.searchControl.value);
            if (text) {
                this.searchService.searchRefine(text);
            }
        }
    }

    setError(parseResult: ParseResult = {}){
        if(parseResult.error !== this.inputErrorMessage){
            this.inputErrorMessage = parseResult.error || "";
            this.changeDetectorRef.markForCheck();
        }
    }
}