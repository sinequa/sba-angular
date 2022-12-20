import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { AppService, Query } from "@sinequa/core/app-utils";
import { LoginService } from "@sinequa/core/login";
import { FacetEventType, FacetService } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { filter, Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule, VoiceRecognitionService } from "@sinequa/components/utils";
import { UserPreferences } from "@sinequa/components/user-settings";

@Component({
  selector: 'sq-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IntlModule, UtilsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() query: Query;
  @Input() searchRoute = "search";
  @Input() autoApply = true;
  @Input() showFilterCount = true;
  @Input() enableVoiceRecognition = true;
  @Input() enableNeuralSearch = true;
  @Input() neuralSearchPref = "neural-search";

  @Output("search") searchEvent = new EventEmitter<boolean>();
  @Output("expanded") expandedEvent = new EventEmitter<boolean>();

  @ContentChild(TemplateRef, {static: false}) dropdown: TemplateRef<any>;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  expanded: boolean;
  filterCount: number;

  editedQuery: Query;
  canApply: boolean;

  voiceState = false;

  constructor(
    public searchService: SearchService,
    public facetService: FacetService,
    public loginService: LoginService,
    public appService: AppService,
    public voiceService: VoiceRecognitionService,
    public prefs: UserPreferences,
    public cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.query) {
      this.editedQuery = this.query.copy();
      this.filterCount = this.query.getFilterCount(undefined);
      this.canApply = false;
    }
  }

  ngOnInit() {

    this.sub = this.facetService.events
      .pipe(filter(e => e.query === this.editedQuery && (e.type === FacetEventType.AddFilter || e.type === FacetEventType.RemoveFilter || e.type === FacetEventType.ClearFilters)))
      .subscribe(() => this.onFiltersChanged());

    this.voiceService.init();

    this.sub.add(this.voiceService.text.subscribe(value => {
      this.editedQuery.text = value;
    }));
    this.sub.add(this.voiceService.started.subscribe(state => {
      this.voiceState = state;
      if(!state && this.editedQuery.text) {
        this.applyFilters(); // Apply the new query text and close the view
      }
    }));
  }

  sub: Subscription;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * Filters might be changed from different external component (facets, filter editor...)
   * This method aims at catching these changes, updating the state accordingly,
   * and applying filters automatically, if possible (we are on a search route)
   */
  onFiltersChanged() {
    this.editedQuery = this.editedQuery.copy(); // Copy the edited query to trigger change detection
    this.filterCount = this.editedQuery.getFilterCount(undefined);
    this.canApply = this.editedQuery.text !== this.query.text
      || !this.facetService.compareFilters(this.editedQuery.filters, this.query.filters);
    if(this.canApply && this.autoApply && this.searchService.isSearchRouteActive()) {
      this.applyFilters(false); // Apply filters, but leave view open
    }
    else {
      this.cdRef.detectChanges();
    }
  }


  /**
   * Apply the current edited query to the input query and trigger
   * a new search.
   * @param collapse whether to collapse the form
   */
  applyFilters(collapse = true) {
    // Determine if the text has changed compared to the input query
    const isTextSearch = (this.query.text || '') === (this.editedQuery.text || '');

    this.query.text = this.editedQuery.text;
    this.query.filters = this.editedQuery.filters;

    if(!this.query.text?.trim()) {
      delete this.query.text;
      delete this.query.sort; // Prevent 500 error if no text but orderby text
    }

    delete this.query.basket; // If a basket was open, we want to go back to a regular search
    delete this.query.page; // If pagination occurred, we want to reset that

    if(this.appService.isNeural()) { // (Un)Set the query.neuralSearch flag
      if(this.neuralSearch) {
        delete this.query.neuralSearch;
      }
      else {
        this.query.neuralSearch = false;
      }
    }

    this.canApply = false; // Hide the hide button (if it was shown)

    if(!this.expanded !== collapse) { // Collapse
      this.expanded = !collapse;
      this.expandedEvent.emit(this.expanded);
    }

    this.search(isTextSearch); // Actually search
  }

  /**
   * Trigger a new search with the current query (unless it is not
   * the global search service query).
   * In any case emit a search event, so that the parent component
   * can process the search in a custom way.
   * @param isSearchTextEvent
   */
  search(isSearchTextEvent: boolean) {
    if(this.query === this.searchService.query) {
      if(isSearchTextEvent) {
        this.searchService.searchText(this.searchRoute);
      }
      else {
        this.searchService.search({path: this.searchRoute});
      }
    }
    this.searchEvent.emit(isSearchTextEvent);
  }

  /**
   * Clear the edited text and filters and trigger onFiltersChanged()
   */
  clearForm() {
    delete this.editedQuery.text;
    delete this.editedQuery.filters;
    this.onFiltersChanged();
    this.searchInput.nativeElement.focus();
  }

  /**
   * Expand the form, and update its state
   */
  expand() {
    if(!this.expanded) {
      this.expanded = true; // Expand if click while already focused
      this.expandedEvent.emit(this.expanded);
      this.filterCount = this.editedQuery.getFilterCount(undefined);
      this.cdRef.detectChanges();
    }
  }


  // Template event handlers

  onInputFocus() {
    this.expand(); // Expand on focus
  }

  onInputText() {
    this.expand(); // Expand on typing text
  }

  onInputClick() {
    this.expand(); // Expand on click (while already focused)
  }

  onInputEnter(text: string) {
    this.editedQuery.text = text;
    this.applyFilters(); // When the user types "Enter", we want to apply filters immediately
  }

  onClickOutside() {
    if(this.expanded) {
      this.expanded = false; // Collapse the form when we the user clicks outside
      this.expandedEvent.emit(false);
    }
  }

  get hasFocus() {
    return this.searchInput?.nativeElement.matches(':focus');
  }


  // Voice recognition
  toggleVoice() {
    this.voiceService.toggleRecognition();
  }


  // Neural search
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
}
