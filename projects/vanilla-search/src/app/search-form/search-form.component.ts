import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    HostListener,
    ElementRef
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
import { AdvancedService, AdvancedSelect, AdvancedRange, AdvancedInput, AdvancedCheckbox } from "@sinequa/components/advanced";
import { advancedSearchFormConfig } from "./advanced-search-form.config";

@Component({
    selector: "app-search-form",
    templateUrl: "./search-form.component.html",
    styleUrls: ["./search-form.component.scss"],
})
export class SearchFormComponent implements OnInit, OnDestroy {
    searchControl: AbstractControl | null;
    form: FormGroup;
    autofocus = 0;

    fieldSearchExpression?: string;

    parseResult?: ParseResult;
    showAdvancedSearch = false;

    @ViewChild(AutocompleteExtended)
    autocompleteDirective: AutocompleteExtended;
    @ViewChild("btnAdvancedSearch") private btnAdvancedSearch: ElementRef;
    // @ViewChild("cardAdvancedSearch") private cardAdvancedSearch: ElementRef;

    initAdvancedSearchData: boolean = false;
    initAdvancedSearchForm: boolean = false;

    constructor(
        public searchService: SearchService,
        public loginService: LoginService,
        public firstPageService: FirstPageService,
        public appService: AppService,
        public prefs: UserPreferences,
        public advancedService: AdvancedService
    ) {}

    ngOnInit() {
        /**
         * Initialize the form with default search control
         */
        this.form = this.advancedService.buildForm();
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
    }

    private _searchSubscription: Subscription;
    private _firstPageSubscription: Subscription;
    ngOnDestroy() {
        if (this._searchSubscription) {
            this._searchSubscription.unsubscribe();
        }
        if (this._firstPageSubscription) {
            this._firstPageSubscription.unsubscribe();
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
            this.searchService.search({ path: "/search" });
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


    //#region Advanced Search

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
                const value = this.advancedService.getAdvancedValue(
                    advancedSearchFormConfig.get(key) as AdvancedSelect | AdvancedRange | AdvancedInput | AdvancedCheckbox
                );
                this.form.controls[key]?.setValue(value, {
                    emitEvent: emitEvent,
                });
            }
        });
    }

    /**
     * Update the query based on the current search form values
     */
    updateQuery(): void {
        Object.keys(this.form.controls).forEach((key) => {
            if (key === "search") {
                this.searchService.query.text = this.searchControl?.value || "";
            } else {
                this.advancedService.setAdvancedValue(
                    this.form.controls[key]?.value,
                    advancedSearchFormConfig.get(key) as AdvancedSelect | AdvancedRange | AdvancedInput | AdvancedCheckbox
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
        this._instantiateAdvancedForm();
    }

    getAdvancedSearchFormConfig(name: string): any {
        return advancedSearchFormConfig.get(name);
    }

    /**
     * Instantiation of the advanced search form and its dependencies/configurations
     */
    private _instantiateAdvancedForm(): void {
        if (!this.initAdvancedSearchForm) {
            this._firstPageSubscription = Utils.subscribe(
                this.firstPageService.getFirstPage(),
                () => {
                    this.initAdvancedSearchData = true;
                },
                () => {},
                () => {
                    this.form.addControl(
                        "sources",
                        this.advancedService.createSelectControl(
                            advancedSearchFormConfig.get("sources") as AdvancedSelect
                        )
                    );
                    this.form.addControl(
                        "authors",
                        this.advancedService.createSelectControl(
                            advancedSearchFormConfig.get("authors") as AdvancedSelect
                        )
                    );
                    this.form.addControl(
                        "size",
                        this.advancedService.createRangeControl(
                            advancedSearchFormConfig.get("size") as AdvancedRange,
                            [
                                this.advancedService.advancedFormValidators.range(
                                    advancedSearchFormConfig.get("size") as AdvancedRange
                                )
                            ]
                        )
                    );
                    this.form.addControl(
                        "modified",
                        this.advancedService.createRangeControl(
                            advancedSearchFormConfig.get("modified") as AdvancedRange,
                            [
                                this.advancedService.advancedFormValidators.range(
                                    advancedSearchFormConfig.get("modified") as AdvancedRange
                                ),
                                this.advancedService.advancedFormValidators.date(
                                    advancedSearchFormConfig.get("modified") as AdvancedRange
                                ),
                            ]
                        )
                    );
                    this.form.addControl(
                        "multiInput",
                        this.advancedService.createMultiInputControl(
                            advancedSearchFormConfig.get("multiInput") as AdvancedInput
                        )
                    );
                    this.form.addControl(
                        "input",
                        this.advancedService.createInputControl(
                            advancedSearchFormConfig.get("input") as AdvancedInput
                        )
                    );
                    this.form.addControl(
                        "checkbox",
                        this.advancedService.createCheckboxControl(
                            advancedSearchFormConfig.get("checkbox") as AdvancedCheckbox
                        )
                    );
                    this.initAdvancedSearchForm = true;
                }
            );
        }
    }

    //#endregion Advanced Search
}
