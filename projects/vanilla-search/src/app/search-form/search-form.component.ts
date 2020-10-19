import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    HostListener,
    ElementRef,
    ChangeDetectorRef,
    AfterViewInit,
} from "@angular/core";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { SearchService, FirstPageService } from "@sinequa/components/search";
import { LoginService } from "@sinequa/core/login";
import { AppService } from "@sinequa/core/app-utils";
import { Subscription } from "rxjs";
import { FEATURES } from "../../config";
import { ParseResult } from "@sinequa/components/autocomplete";
import { AutocompleteExtended } from "./autocomplete-extended.directive";
import { UserPreferences } from "@sinequa/components/user-settings";
import { Utils } from "@sinequa/core/base";
import { FormService } from "@sinequa/components/advanced";
import { advancedSearchFormConfig } from "./advanced-search-form.config";

@Component({
    selector: "app-search-form",
    templateUrl: "./search-form.component.html",
    styleUrls: ["./search-form.component.scss"],
})
export class SearchFormComponent implements OnInit, OnDestroy, AfterViewInit {
    searchControl: AbstractControl | null;
    form: FormGroup;
    autofocus = 0;

    fieldSearchExpression?: string;

    parseResult?: ParseResult;
    showAdvancedSearch = false;

    items;

    @ViewChild(AutocompleteExtended)
    autocompleteDirective: AutocompleteExtended;
    @ViewChild("btnAdvancedSearch") private btnAdvancedSearch: ElementRef;
    // @ViewChild("cardAdvancedSearch") private cardAdvancedSearch: ElementRef;

    initAdvancedSearchDone: boolean;

    constructor(
        public searchService: SearchService,
        public loginService: LoginService,
        public firstPageService: FirstPageService,
        public appService: AppService,
        public prefs: UserPreferences,
        public formService: FormService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        /**
         * If firstPage values not needed for advanced form then no need to call firstPageService.getFirstPage,
         * just set this.initAdvancedSearchDone = true
         */
        this.initAdvancedSearchDone = false;
        Utils.subscribe(this.firstPageService.getFirstPage(), () => {
            this.initAdvancedSearchDone = true;
            this.changeDetectorRef.markForCheck();
        });
        /**
         * Initialize the form with default control
         */
        this.form = this.formService.buildForm();
        this.searchControl = this.form.get("search")
            ? this.form.get("search")
            : new FormControl("");

        /**
         * Every time the query changes, we want to update the search form
         */
        this._searchSubscription = this.searchService.queryStream.subscribe(
            (query) => {
                this.updateFormValues();
                this.fieldSearchExpression = query?.findSelect(
                    "search-form"
                )?.expression;
                this.autofocus++;
            }
        );

        // if (!this.items) {
        //     this.items = [
        //         {
        //             active: true,
        //             aggregation: "",
        //             autocompleteEnabled: true,
        //             className: "",
        //             collapseGroup: "",
        //             description: "",
        //             displayRule: "",
        //             field: "treepath",
        //             label: "Sources",
        //             list: "",
        //             max: "",
        //             min: "",
        //             multiple: true,
        //             name: "",
        //             operator: "",
        //             pattern: "",
        //             size: "",
        //             stretch: false,
        //             stretchFactor: "",
        //             type: "AdvancedFormSelect",
        //             validators: "",
        //         },
        //         {
        //             active: true,
        //             collapseGroup: "",
        //             description: "",
        //             displayRule: "",
        //             field: "authors",
        //             label: "Authors",
        //             multiple: true,
        //             size: "",
        //             stretch: false,
        //             stretchFactor: "",
        //             type: "AdvancedFormSelect",
        //         },
        //         {
        //             active: true,
        //             aggregation: "",
        //             autocompleteEnabled: true,
        //             className: "",
        //             collapseGroup: "",
        //             description: "",
        //             displayRule: "",
        //             field: "authors",
        //             label: "Authors",
        //             list: "",
        //             max: "",
        //             min: "",
        //             name: "",
        //             operator: "",
        //             pattern: "",
        //             size: "",
        //             stretch: false,
        //             stretchFactor: "",
        //             type: "AdvancedFormEntry",
        //             validators: "",
        //         },
        //         {
        //             active: true,
        //             aggregation: "",
        //             autocompleteEnabled: true,
        //             className: "",
        //             collapseGroup: "",
        //             description: "",
        //             displayRule: "",
        //             field: "treepath",
        //             label: "Sources",
        //             list: "",
        //             max: "",
        //             min: "",
        //             multiple: true,
        //             name: "",
        //             operator: "",
        //             pattern: "",
        //             size: "",
        //             stretch: false,
        //             stretchFactor: "",
        //             type: "AdvancedFormMultiEntry",
        //             validators: "",
        //         },
        //         {
        //             active: true,
        //             autocompleteEnabled: true,
        //             collapseGroup: "",
        //             description: "",
        //             displayRule: "",
        //             field: "size",
        //             label: "Size",
        //             size: "",
        //             stretch: false,
        //             stretchFactor: "",
        //             type: "AdvancedFormRange",
        //         },
        //         {
        //             active: true,
        //             autocompleteEnabled: false,
        //             collapseGroup: "",
        //             description: "",
        //             displayRule: "",
        //             field: "treepath",
        //             label: "Sources",
        //             size: "",
        //             stretch: false,
        //             stretchFactor: "",
        //             type: "AdvancedFormCheckbox",
        //         },
        //     ];
        // }
    }

    /**
     * Here we can add whatever formControl we want to link to this.form
     */
    ngAfterViewInit() {
        this.form.addControl(
            "sources",
            this.formService.createSelectControl(
                advancedSearchFormConfig.get("sources"),
                // [
                //     this.formService.advancedFormValidators.required
                // ]
            )
        );
        this.form.addControl(
            "authors",
            this.formService.createSelectControl(
                advancedSearchFormConfig.get("authors")
            )
        );
        this.form.addControl(
            "size",
            this.formService.createSelectControl(
                advancedSearchFormConfig.get("size"),
                [
                    this.formService.advancedFormValidators.range(advancedSearchFormConfig.get("size")),
                    this.formService.advancedFormValidators.number(advancedSearchFormConfig.get("size"))
                ]
            )
        );
        this.form.addControl(
            "modified",
            this.formService.createSelectControl(
                advancedSearchFormConfig.get("modified"),
                [
                    this.formService.advancedFormValidators.range(advancedSearchFormConfig.get("modified")),
                    this.formService.advancedFormValidators.date(advancedSearchFormConfig.get("modified"))
                ]
            )
        );
    }

    private _searchSubscription: Subscription;
    ngOnDestroy() {
        if (this._searchSubscription) {
            this._searchSubscription.unsubscribe();
        }
    }

    /**
     * Trigger a search query via the search service
     */
    search() {
        if (this.loginService.complete && this.form.valid) {
            this.updateQuery();
            if (this.getMode() === "selects") {
                const expr = this.autocompleteDirective.getFieldSearchExpression();
                if (expr) {
                    this.searchService.query.addSelect(expr, "search-form");
                }
            }
            this.searchService.searchAdvanced(this.searchService.query);
            this.searchService.navigate({ path: "/search" });
        }
    }

    onParse(parseResult: ParseResult) {
        this.parseResult = parseResult;
        this.searchControl?.setErrors(
            parseResult.error ? { incorrect: true } : null
        );
    }

    /**
     * Autocomplete icon per category
     * @param category
     */
    autocompleteIcon(category): string {
        switch (category) {
            case "recent-document":
                return "far fa-file-alt fa-fw";
            case "recent-query":
                return "fas fa-history fa-fw";
            case "basket":
                return "fas fa-inbox fa-fw";
            case "saved-query":
                return "far fa-save fa-fw";
        }
        return "far fa-lightbulb fa-fw";
    }

    /**
     * Retrieve autocomplete sources, which include the standard
     */
    get autocompleteSources(): string[] {
        if (
            this.appService.app &&
            this.appService.app.data &&
            this.appService.app.data.features
        ) {
            return <string[]>this.appService.app.data.features;
        }
        return FEATURES;
    }

    /**
     * Sets the field search mode
     * event.preventDefault() to avoid the label stealing the focus
     * and closing the autocomplete...
     */
    setMode(mode: "off" | "selects" | "text", event?: Event) {
        event?.preventDefault();
        this.prefs.set("field-search-mode", mode);
    }

    /**
     * Returns the field search mode, stored in user
     * preferences
     */
    getMode(): "off" | "selects" | "text" {
        return this.prefs.get("field-search-mode") || "selects";
    }

    /**
     * Updates the search form based on the new query
     * @param emitEvent by default, we don't propagate changes. Set it to 'true' if changes emitters need to be turned on
     */
    updateFormValues(emitEvent: boolean = false): void {
        Object.keys(this.form.controls).forEach((key) => {
            if (key === "search") {
                this.searchControl?.setValue(
                    !this.searchService.query || !this.searchService.query.text
                        ? ""
                        : this.searchService.query.text
                );
            } else {
                const value = this.formService.getAdvancedValue(
                    advancedSearchFormConfig.get(key)
                );
                this.form.controls[key]?.setValue(value, {
                    emitEvent: emitEvent,
                });
            }
        });
    }

    /**
     * Returns a new value of query baed on the current search form values
     */
    updateQuery(): void {
        this.searchService.clearQuery();
        Object.keys(this.form.controls).forEach((key) => {
            if (key === "search") {
                this.searchService.query.text = this.searchControl?.value || "";
            } else {
                this.formService.setAdvancedValue(
                    this.form.controls[key]?.value,
                    advancedSearchFormConfig.get(key)
                );
            }
        });
    }

    /**
     * Programmatically handle opening/closing of the advanced-search form
     * @param event
     */
    @HostListener("document:click", ["$event"])
    handleClick(event: Event) {
        if (this.btnAdvancedSearch?.nativeElement.contains(event.target)) {
            this.toggleAdvancedSearch();
        }
        // else {
        //     if (!this.cardAdvancedSearch?.nativeElement.contains(event.target)) {
        //         this.showAdvancedSearch = false;
        //     }
        // }
    }

    toggleAdvancedSearch() {
        this.showAdvancedSearch = !this.showAdvancedSearch;
    }

    getAdvancedSearchFormConfig(name: string): any {
        return advancedSearchFormConfig.get(name);
    }
}
