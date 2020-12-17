import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { SearchService } from '@sinequa/components/search';
import { LoginService } from '@sinequa/core/login';
import { AppService } from '@sinequa/core/app-utils';
import { Observable, Subscription } from 'rxjs';
import { FEATURES } from '../../config';
import { ParseResult } from '@sinequa/components/autocomplete';
import { AutocompleteExtended } from './autocomplete-extended.directive';
import { UserPreferences } from '@sinequa/components/user-settings';
import { FirstPageService } from '@sinequa/components/search';
import { AdvancedService, AdvancedFormType, AdvancedInput, AdvancedOperator, AdvancedRange, AdvancedSelect } from '@sinequa/components/advanced';
import { Results } from '@sinequa/core/web-services';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {
  form: FormGroup;

  // Form control for the main search bar
  searchControl: FormControl;

  autofocus = 0;

  fieldSearchExpression?: string;

  parseResult?: ParseResult;

  @ViewChild(AutocompleteExtended) autocompleteDirective: AutocompleteExtended;

  // Form controls for the advanced form  
  sourcesControl: FormControl;
  authorsControl: FormControl;
  sizeControl: FormControl;
  modifiedControl: FormControl;
  personControl: FormControl;
  formatControl: FormControl;
  showAdvancedSearch: boolean = false;
  defaultResults$: Observable<Results>;
  
  // Advanced form config

  sourcesConfig: AdvancedSelect = {
    aggregation: "",
    field: "treepath",
    list: "",
    multiple: true,
    operator: AdvancedOperator.NONE,
    type: AdvancedFormType.Select,
  };

  authorsConfig: AdvancedSelect =  {
    aggregation: "",
    field: "authors",
    list: "",
    multiple: true,
    operator: AdvancedOperator.NONE,
    type: AdvancedFormType.Select,
  };

  sizeConfig: AdvancedRange = {
    field: "size",
    type: AdvancedFormType.Range,
    min: "",
    max: "",
  };

  modifiedConfig: AdvancedRange = {
    field: "modified",
    type: AdvancedFormType.Range,
    min: "",
    max: "",
  };

  personConfig: AdvancedInput = {
    field: "person",
    operator: AdvancedOperator.NONE,
    type: AdvancedFormType.MultiInput,
  };

  formatConfig: AdvancedInput = {
    field: "docformat",
    operator: AdvancedOperator.NONE,
    type: AdvancedFormType.Input,
  }

  constructor(
    public searchService: SearchService,
    public loginService: LoginService,
    private formBuilder: FormBuilder,
    public appService: AppService,
    public prefs: UserPreferences,
    public firstPageService: FirstPageService,
    public advancedService: AdvancedService) {
  }

  /**
   * Initialization of the form
   */
  ngOnInit() {
    this.searchControl = new FormControl('');
    this.sourcesControl = this.advancedService.createSelectControl(this.sourcesConfig);
    this.authorsControl = this.advancedService.createSelectControl(this.authorsConfig);
    this.sizeControl = this.advancedService.createRangeControl(this.sizeConfig,
      [this.advancedService.validators.range(this.sizeConfig)]
    );
    this.modifiedControl = this.advancedService.createRangeControl(this.modifiedConfig,
      [
        this.advancedService.validators.range(this.modifiedConfig),
        this.advancedService.validators.date(this.modifiedConfig),
      ]
    );
    this.personControl = this.advancedService.createMultiInputControl(this.personConfig);
    this.formatControl = this.advancedService.createInputControl(this.formatConfig);

    this.form = this.formBuilder.group({
      search: this.searchControl,
      treepath: this.sourcesControl,
      authors: this.authorsControl,
      size: this.sizeControl,
      modified: this.modifiedControl,
      person: this.personControl,
      docformat: this.formatControl
    });

    // Every time the query changes, we want to update the search form
    this._searchSubscription = this.searchService.queryStream.subscribe(query => {
      // Update main search bar
      this.searchControl.setValue(this.searchService.query?.text || '');
      this.fieldSearchExpression = query?.findSelect("search-form")?.expression;
      this.autofocus++;
      // Update advanced form 
      // TODO: Add {emitEvent: emitEvent} to setValue() ?
      this.sourcesControl.setValue(this.advancedService.getAdvancedValue(this.sourcesConfig));
      this.authorsControl.setValue(this.advancedService.getAdvancedValue(this.authorsConfig));
      this.sizeControl.setValue(this.advancedService.getAdvancedValue(this.sizeConfig) || [undefined, undefined]);
      this.modifiedControl.setValue(this.advancedService.getAdvancedValue(this.modifiedConfig) || [undefined, undefined]);
      this.personControl.setValue(this.advancedService.getAdvancedValue(this.personConfig));
      this.formatControl.setValue(this.advancedService.getAdvancedValue(this.formatConfig));
    });
  }

  private _searchSubscription: Subscription;
  ngOnDestroy(){
    if(this._searchSubscription){
      this._searchSubscription.unsubscribe();
    }
  }

  /**
   * Trigger a search query via the search service
   */
  search() {
    if(this.loginService.complete && this.form.valid) {
      /** Close the advanced form */
      this.showAdvancedSearch = false
      /** Store relevant filters (tab ...)*/
      const queryTab = this.searchService.query.tab;
      /**
       * Clear the query and reset all filters.
       * Remove this.searchService.clearQuery() if you need to keep all filters.
      */
      this.searchService.clearQuery();
      /** Update the new query with entered text & advanced search filters & fielded search */
      this.searchService.query.text = this.searchControl?.value || "";
      // Advanced form update
      this.advancedService.setSelect('treepath', this.sourcesControl.value);
      this.advancedService.setSelect('authors', this.authorsControl.value);
      this.advancedService.setRangeSelect('size', this.sizeControl.value);      
      this.advancedService.setRangeSelect('modified', this.modifiedControl.value);      
      this.advancedService.setSelect('person', this.personControl.value);
      this.advancedService.setSelect('docformat', this.formatControl.value);

      if(this.getMode() === "selects") {
        const expr = this.autocompleteDirective.getFieldSearchExpression();
        if(expr) {
          this.searchService.query.addSelect(expr, "search-form");
        }
      }
      if (!!queryTab) {
        this.searchService.query.tab = queryTab;
      }
      /** Trigger the search with the new criteria */
      this.searchService.searchText("search");
    }
  }

  onParse(parseResult: ParseResult) {
    this.parseResult = parseResult;
    this.searchControl.setErrors(parseResult.error? {incorrect: true} : null);
  }

  /**
   * Autocomplete icon per category
   * @param category
   */
  autocompleteIcon(category): string {
    switch(category){
      case "recent-document": return "far fa-file-alt fa-fw";
      case "recent-query": return "fas fa-history fa-fw";
      case "basket": return "fas fa-inbox fa-fw";
      case "saved-query": return "far fa-save fa-fw";
    }
    return "far fa-lightbulb fa-fw";
  }

  /**
   * Retrieve autocomplete sources, which include the standard
   */
  get autocompleteSources(): string[] {
    if(this.appService.app && this.appService.app.data && this.appService.app.data.features){
      return <string[]> this.appService.app.data.features;
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
    this.prefs.set('field-search-mode', mode);
  }

  /**
   * Returns the field search mode, stored in user
   * preferences
   */
  getMode(): "off" | "selects" | "text" {
    return this.prefs.get('field-search-mode') || "selects";
  }

  /**
   * Programmatically handle opening/closing of the advanced-search form
   */
  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
    if(!this.defaultResults$) {
      this.defaultResults$ = this.firstPageService.getFirstPage();
    }
  }
}
