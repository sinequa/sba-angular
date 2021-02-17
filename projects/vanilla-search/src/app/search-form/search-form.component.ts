import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { SearchService } from '@sinequa/components/search';
import { LoginService } from '@sinequa/core/login';
import { AppService } from '@sinequa/core/app-utils';
import { Subscription } from 'rxjs';
import { FEATURES } from '../../config';
import { ParseResult } from '@sinequa/components/autocomplete';
import { AutocompleteExtended } from './autocomplete-extended.directive';
import { UserPreferences } from '@sinequa/components/user-settings';
import { FirstPageService } from '@sinequa/components/search';
import { AdvancedService } from '@sinequa/components/advanced';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {
  searchControl: FormControl;
  form: FormGroup;
  autofocus = 0;

  /** Expression from the query selects, if any ("simple"/"selects" field search mode) */
  fieldSearchExpression?: string;

  /** Result of query parsing ("advanced" field search mode) */
  parseResult?: ParseResult;

  /** A reference to the AutocompleteExtended directive, needed to get the field search selections, if any */
  @ViewChild(AutocompleteExtended) autocompleteDirective: AutocompleteExtended;
  
  // Advanced search flags
  showAdvancedSearch: boolean;
  initAdvanced: boolean;

  /** Define if a filter, NOT belonging to fielded & advanced search, is currently applied to the searchService.query */
  isFiltering = false;

  /** Specify if already applied filters should be kept or not while chaining searches */
  keepFilters = false;
  keepFiltersTitle = 'msg#searchForm.keepFilters';

  /** USED ALONG WITH keepFilters context, to optionally reset the advanced-search or not */
  keepAdvancedSearchFilters = true;

  /** Define if should stay on the same tab even after a new search */
  keepTab = true;

  constructor(
    public searchService: SearchService,
    public loginService: LoginService,
    private formBuilder: FormBuilder,
    public appService: AppService,
    public prefs: UserPreferences,
    public firstPageService: FirstPageService,
    public advancedService: AdvancedService,
    public route: ActivatedRoute) {
  }

  /**
   * Initialization of the form
   */
  ngOnInit() {
    this.searchControl = new FormControl('');
    this.form = this.formBuilder.group({
      search: this.searchControl
    });

    // Every time the query changes, we want to update the search form
    this._searchSubscription = this.searchService.queryStream.subscribe(query => {
      // Update main search bar
      this.searchControl.setValue(this.searchService.query?.text || '');
      this.fieldSearchExpression = query?.findSelect("search-form")?.expression;
      this.autofocus++;

      // Update advanced form
      this.form.get('treepath')?.setValue(this.advancedService.getValue('treepath'));
      this.form.get('authors')?.setValue(this.advancedService.getValue('authors'));
      this.form.get('size')?.setValue(this.advancedService.getRangeValue('size'));
      this.form.get('modified')?.setValue(this.advancedService.getRangeValue('modified'));
      this.form.get('person')?.setValue(this.advancedService.getValue('person'));
      this.form.get('docformat')?.setValue(this.advancedService.getValue('docformat'));

      // Update the filtering status
      this._updateFilteringStatus();
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
      this.showAdvancedSearch = false;

      /** Store relevant filters (tab ...)*/
      const queryTab = this.searchService.query.tab;

      /** If this.keepFilters = false, clear the query and reset all its filters. */
      if (!this.keepFilters) {
        this.searchService.clearQuery();

        /** MUST explicitly reset the advanced form if this.keepAdvancedSearchFilters = false */
        if (!this.keepAdvancedSearchFilters) {
          this.clearAdvancedForm();
        }
      }

      /** Update the new query with entered text */
      this.searchService.query.text = this.searchControl?.value || "";

      /** Update advanced search filters */
      this.advancedService.setSelect('treepath', this.form.get('treepath')?.value);
      this.advancedService.setSelect('authors', this.form.get('authors')?.value);
      this.advancedService.setRangeSelect('size', this.form.get('size')?.value);
      this.advancedService.setRangeSelect('modified', this.form.get('modified')?.value);
      this.advancedService.setSelect('person', this.form.get('person')?.value);
      this.advancedService.setSelect('docformat', this.form.get('docformat')?.value);

      /** Add select from the fielded search ("selects", aka "simple" mode) */
      if(this.getMode() === "selects") {
        const expr = this.autocompleteDirective.getFieldSearchExpression();
        if(expr) {
          this.searchService.query.addSelect(expr, "search-form");
        }
      }

      // if this.keepTab, stay on the same tab even after a new search
      if (this.keepTab && !!queryTab) {
        this.searchService.query.tab = queryTab;
      }

      /** Trigger the search with the new criteria */
      this.searchService.searchText("search");
    }
  }

  /**
   * Test if the form contains some inputs
   */
  hasContent(): boolean {
    return this.searchControl.value 
      || this.fieldSearchExpression
      || this.hasAdvancedContent();
  }

  /**
   * Clears the entire search form
   */
  clearForm() {
    this.searchControl.reset();
    this.fieldSearchExpression = "";
    this.clearAdvancedForm();
  }

  /**
   * Test if the advanced form has non-undefined values set
   */
  hasAdvancedContent(): boolean {
    return this.form.get("treepath")?.value
      || this.form.get("authors")?.value
      || this.form.get("size")?.value?.find(v => v)
      || this.form.get("modified")?.value?.find(v => v)
      || this.form.get("person")?.value
      || this.form.get("docformat")?.value
      || this.searchService.query.hasAdvanced();
  }

  /**
   * Clear only the advanced form
   */
  clearAdvancedForm() {
    this.advancedService.resetControl(this.form.get("treepath")!);
    this.advancedService.resetControl(this.form.get("authors")!);
    this.advancedService.resetRangeControl(this.form.get("size")!);
    this.advancedService.resetRangeControl(this.form.get("modified")!);
    this.advancedService.resetControl(this.form.get("person")!);
    this.advancedService.resetControl(this.form.get("docformat")!);
    this.searchService.query.toStandard();
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
   * Toggle the keepFilters status
   */
  toggleKeepFilters(): void {
    this.keepFilters = !this.keepFilters;
    this.keepFiltersTitle = this.keepFilters ? 'msg#searchForm.notKeepFilters' : 'msg#searchForm.keepFilters'
  }

  /**
   * Programmatically handle opening/closing of the advanced-search form
   */
  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
    this._instantiateAdvancedForm();
  }

  /**
   * Close the advanced-search form if the search input is focused
   */
  onMouseDown(): void {
    this.showAdvancedSearch = false;
  }

  /**
   * Instantiation of the advanced search form and its dependencies/configurations
   */
  private _instantiateAdvancedForm(): void {
    if(!this.initAdvanced) {
      this.firstPageService.getFirstPage().pipe(take(1)).subscribe(
        () => {},
        () => {},
        () => {
            this.form.addControl('treepath', this.advancedService.createSelectControl('treepath'));
            this.form.addControl('authors', this.advancedService.createSelectControl('authors'));
            this.form.addControl('size', this.advancedService.createRangeControl('size',
              [ this.advancedService.validators.range('size') ]
            ));
            this.form.addControl('modified', this.advancedService.createRangeControl('modified',
              [
                this.advancedService.validators.range('modified'),
                this.advancedService.validators.date('modified')
              ]
            ));
            this.form.addControl('person', this.advancedService.createMultiInputControl('person'));
            this.form.addControl('docformat', this.advancedService.createInputControl('docformat'));

            this.initAdvanced = true;
        }
      )
    }
  }

  /**
   * Update the status of filters (other than advanced & fielded search filters) existence in this.searchService.query
   */
  private _updateFilteringStatus(): void {
    const _query =  this.searchService.query.copy();
    this.isFiltering = (_query.toStandard().select?.filter((select) => select.facet !== "search-form").length || 0) > 0;
  }
}
