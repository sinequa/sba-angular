import {Component, OnInit, OnDestroy, ViewChild, ElementRef, DoCheck} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, UntypedFormControl} from "@angular/forms";
import {SearchService} from '@sinequa/components/search';
import {LoginService} from '@sinequa/core/login';
import {AppService} from '@sinequa/core/app-utils';
import {Subscription, take} from 'rxjs';
import {FEATURES} from '../../config';
import {ParseResult} from '@sinequa/components/autocomplete';
import {AutocompleteExtended} from './autocomplete-extended.directive';
import {UserPreferences} from '@sinequa/components/user-settings';
import {FirstPageService} from '@sinequa/components/search';
import {AdvancedService} from '@sinequa/components/advanced';
import {ActivatedRoute} from '@angular/router';
import {VoiceRecognitionService} from '@sinequa/components/utils';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, DoCheck, OnDestroy {
  searchControl: UntypedFormControl;
  form: UntypedFormGroup;
  autofocus = 0;

  /** Expression from the query selects, if any ("simple"/"selects" field search mode) */
  fieldSearchExpression?: string;

  /** Result of query parsing ("advanced" field search mode) */
  parseResult?: ParseResult;

  /** A reference to the AutocompleteExtended directive, needed to get the field search selections, if any */
  @ViewChild(AutocompleteExtended) autocompleteDirective: AutocompleteExtended;

  @ViewChild('searchInput') searchInput: ElementRef;

  // Advanced search flags
  showAdvancedSearch: boolean;
  initAdvanced: boolean;
  enableAdvancedForm = false; // Show the advanced form button or not

  /** Define if a filter, NOT belonging to fielded & advanced search, is currently applied to the searchService.query */
  isFiltering = false;

  /** Specify if already applied filters should be kept or not while chaining searches */
  keepFilters = false;
  keepFiltersTitle = 'msg#searchForm.notKeepFilters';
  enableKeepFilters = false; // Show the "keep filters" button or not

  /** USED ALONG WITH keepFilters context, to optionally reset the advanced-search or not */
  keepAdvancedSearchFilters = false;

  /** Define if should stay on the same tab even after a new search */
  keepTab = false;

  /** Voice recognition */
  voiceRecognitionState = false;
  enableVoiceRecognition = false; // Show the voice recognition button or not

  hasScroll = false;
  @ViewChild('searchContainer') searchContainer: ElementRef;
  private timeout: any;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public voiceService: VoiceRecognitionService,
    public searchService: SearchService,
    public loginService: LoginService,
    private formBuilder: UntypedFormBuilder,
    public appService: AppService,
    public prefs: UserPreferences,
    public firstPageService: FirstPageService,
    public advancedService: AdvancedService,
    public route: ActivatedRoute) {

    this.voiceService.init();

    this.subscriptions.add(...[
        this.voiceService.started.subscribe(state => {
        this.voiceRecognitionState = state;
      }),
        this.voiceService.text.subscribe(value => {
        this.searchControl.setValue(value);
      })
    ]);

  }

  /**
   * Initialization of the form
   */
  ngOnInit() {
    this.searchControl = new UntypedFormControl('');
    this.form = this.formBuilder.group({
      search: this.searchControl
    });

    // Every time the query changes, we want to update the search form
    this.subscriptions.add(this.searchService.queryStream.subscribe(query => {
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

      // Check user preferences regarding keeping filters
      if(typeof this.prefs.get('keep-filters-state') !== 'undefined') {
        this.keepFilters = this.prefs.get('keep-filters-state');
        this.keepFiltersTitle = this.keepFilters ? 'msg#searchForm.keepFilters' : 'msg#searchForm.notKeepFilters';
      }
    }));

    // Initialize the search form options (either now, or when login is complete)
    if (this.appService.app) {
      this.setOptions();
    }
    else {
      this.subscriptions.add(this.loginService.events.subscribe(
        (event) => {
          if (event.type === "login-complete") {
            if (this.appService.app) {
              this.setOptions();
            }
          }
          if (event.type === "logout-complete") {
            this.showAdvancedSearch = false;
          }
        })
      );
    }
  }

  ngDoCheck() {
    // Check if the input has a scrollbar
    this.hasScroll = this.searchContainer?.nativeElement.scrollWidth > this.searchContainer?.nativeElement.clientWidth;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setOptions() {
    const features = this.appService.app?.data?.features as string[] || FEATURES;
    features.forEach(feature =>{
      switch(feature){
        case "advanced-form": this.enableAdvancedForm = true; break;
        case "keep-advanced-form-filters": this.keepAdvancedSearchFilters = true; break;
        case "keep-tab": this.keepTab = true; break;
        case "keep-filters": {
          // Initialize keep filter flag, if not already in preferences
          if(typeof this.prefs.get('keep-filters-state') === 'undefined') {
            this.keepFilters = true;
          }
          break;
        }
        case "toggle-keep-filters": this.enableKeepFilters = true; break;
        case "voice-recognition": this.enableVoiceRecognition = true; break;
      }
    });
  }

  /**
   * Trigger a search query via the search service
   */
  search() {
    if(this.loginService.complete && this.form.valid) {

      /** Hide autocomplete suggestions */
      this.searchInput.nativeElement.blur();

      /** Store relevant filters (tab ...)*/
      const queryTab = this.searchService.query.tab;
      const queryScope = this.searchService.query.scope;

      /** If this.keepFilters = false, clear the query and reset all its filters. */
      if (!this.keepFilters) {
        this.searchService.clearQuery();

        /** MUST explicitly reset the advanced form if this.keepAdvancedSearchFilters = false */
        if (!this.keepAdvancedSearchFilters && !this.showAdvancedSearch) {
          this.clearAdvancedForm();
        }
      }

      /** Close the advanced form */
      this.showAdvancedSearch = false;

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
        this.searchService.query.removeSelect("search-form"); // Prevent having multiple instance if this.keepFilters = true
        const expr = this.autocompleteDirective.getFieldSearchExpression();
        if(expr) {
          this.searchService.query.addSelect(expr, "search-form");
        }
      }

      // if this.keepTab, stay on the same tab even after a new search
      if (this.keepTab && !!queryTab) {
        this.searchService.query.tab = queryTab;
      }

      if(this.appService.ccquery?.scopesActive && queryScope) {
        this.searchService.query.scope = queryScope;
      }

      if (!this.neuralSearch) {
        this.searchService.query.neuralSearch = false;
      } else {
        delete this.searchService.query.neuralSearch;
      }

      /** Trigger the search with the new criteria */
      this.searchService.searchText("search");
    }
  }

  /**
   * Test if the search input is not empty
   */
  hasContent(): boolean {
    return this.searchControl.value
      || this.fieldSearchExpression;
  }

  /**
   * Clears the search input and the fielded search
   */
  clearForm() {
    this.searchControl.reset();
    this.fieldSearchExpression = "";
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
      || this.form.get("docformat")?.value;
  }

  /**
   * Clears the advanced-search form
   */
  clearAdvancedSearch(): void {
    this.advancedService.resetAdvancedValues();
    /** Close the advanced form */
    this.showAdvancedSearch = false;
  }

  /**
   * Test if the query contains advanced-search related filters
   */
  isAdvancedSearchActive(): boolean {
    return this.searchService.query.hasAdvanced();
  }

  /**
   * Clear only the advanced form
   */
  clearAdvancedForm() {
    if(this.initAdvanced) {
      this.advancedService.resetControl(this.form.get("treepath")!);
      this.advancedService.resetControl(this.form.get("authors")!);
      this.advancedService.resetRangeControl(this.form.get("size")!);
      this.advancedService.resetRangeControl(this.form.get("modified")!);
      this.advancedService.resetControl(this.form.get("person")!);
      this.advancedService.resetControl(this.form.get("docformat")!);
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
    return this.appService.app?.data?.features as string[] || FEATURES;
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
    this.keepFiltersTitle = this.keepFilters ? 'msg#searchForm.keepFilters' : 'msg#searchForm.notKeepFilters';
    /** Sets the state of keeping search's filters*/
    this.prefs.set('keep-filters-state', this.keepFilters);
  }

  /**
   * Programmatically handle opening/closing of the advanced-search form
   */
  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
    this._instantiateAdvancedForm();
  }

  toggleVoice() {
    this.voiceService.toggleRecognition();
  }

  get neuralSearch(): boolean {
    return this.prefs.get("neural-search") !== false; // if undefined, default is true
  }

  set neuralSearch(val: boolean) {
    if(val) {
      this.prefs.delete("neural-search");
    }
    else {
      this.prefs.set("neural-search", false); // if set, neural-search can only be false
    }
  }

  toggleNeuralSearch() {
    this.neuralSearch = !this.neuralSearch;
  }

  scrollRight() {
    this.timeout = setTimeout(() => {
      this._scrollRight()
    }, 100);
  }

  scrollLeft() {
    this.timeout = setTimeout(() => {
      this._scrollLeft();
    }, 100);
  }

  endScroll() {
    clearTimeout(this.timeout);
  }

  private _scrollRight() {
    this.searchContainer!.nativeElement.scrollLeft += 20;
    this.scrollRight();
  }

  private _scrollLeft() {
    this.searchContainer!.nativeElement.scrollLeft -= 20;
    this.scrollLeft();
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
