import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { AutocompleteItem, SuggestService } from "@sinequa/components/autocomplete";
import { BasketsService } from "@sinequa/components/baskets";
import { PreviewService } from "@sinequa/components/preview";
import { RecentDocumentsService, RecentQueriesService, SavedQueriesService } from "@sinequa/components/saved-queries";
import { SearchService } from "@sinequa/components/search";
import { AppService } from "@sinequa/core/app-utils";
import { AuditEventType, AuditWebService } from "@sinequa/core/web-services";
import { BehaviorSubject, Observable, Subscription, forkJoin, from, fromEvent, merge, of } from "rxjs";
import { debounceTime, map, switchMap } from "rxjs/operators";


@Component({
  selector: "app-autocomplete",
  templateUrl: './autocomplete.component.html',
  styles: [`
  .list-group-item {
    display: flex;
    align-items: center;
    padding: 0.3rem 1rem 0.3rem 0.75rem;
    border: none;
    font-size: 0.875rem;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnInit, OnChanges, OnDestroy {
  @Input() inputElement: HTMLInputElement;
  @Input() queryText: string;
  @Input() debounce = 200;
  @Input() suggestQuery?: string;
  @Input() maxItems = 10;
  @Input() suggestTypes: string[] = ['suggests','recent-documents', 'recent-queries', 'saved-queries', 'baskets'];

  // autocomplete items returned by searchData have a "score" attribute, which is consistent across categories
  @Input() sortComparator = (a: AutocompleteItem, b: AutocompleteItem) => (b['score'] || 0) - (a['score'] || 0)

  @Output() search = new EventEmitter<string>();
  @Output() select = new EventEmitter<string>();

  items: AutocompleteItem[] = [];

  inputChange$ = new BehaviorSubject('');

  selectedIndex: number | undefined;

  subscription: Subscription;

  skipNextChange = false;

  constructor(
    public suggestService: SuggestService,
    public appService: AppService,
    public previewService: PreviewService,
    public searchService: SearchService,
    public recentQueriesService: RecentQueriesService,
    public savedQueriesService: SavedQueriesService,
    public recentDocumentsService: RecentDocumentsService,
    public basketsService: BasketsService,
    public audit: AuditWebService,
    public cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.queryText) {
      if(this.skipNextChange) {
        this.skipNextChange = false;
        return;
      }
      this.inputChange$.next(this.queryText);
    }
  }

  ngOnInit(): void {
    this.subscription = merge(
      this.inputChange$,
      fromEvent(this.inputElement, 'focus')
    ).pipe(
      debounceTime(this.debounce),
      switchMap(() => this.getSuggests(this.queryText)),
    ).subscribe(items => {
      this.items = items;
      this.selectedIndex = undefined;
      this.cdRef.detectChanges();
    });

    this.subscription.add(
      fromEvent<KeyboardEvent>(this.inputElement, 'keydown')
        .subscribe(event => {
          switch(event.key) {
            case "ArrowDown": this.moveNext(event); break;
            case "ArrowUp": this.movePrevious(event); break;
            case "Enter": this.onEnter(); break;
          }
        })
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  /**
   * Rather than only getting suggests from the server via the SuggestService, this directive also
   * searches for matches in the User Settings objects (recent documents, recent queries, saved
   * queries, baskets)
   */
  getSuggests(value: string): Observable<AutocompleteItem[]> {

    // Methods returning (observable of) suggestions from different sources
    const dataSources: Observable<AutocompleteItem[]>[] = this.suggestTypes.map(source => {
      switch(source) {
        case 'suggests': return  this.suggestService.get(this.suggestQuery, value);
        case 'baskets': return from(this.searchBaskets(value));
        case 'recent-documents': return from(this.searchRecentDocuments(value));
        case 'recent-queries': return from(this.searchRecentQueries(value));
        case 'saved-queries': return from(this.searchSavedQueries(value));
        default: return of([]);
      }
    });

    // The forkJoin method allows to merge the suggestions into a single array, so the parent
    // directive only sees a single source.
    return forkJoin(dataSources).pipe(
      map(suggests => suggests
        .flat()
        .sort(this.sortComparator)
        .slice(0, this.maxItems)
      )
    );

  }

  /**
   * This performs performs custom actions when a specific category of autocomplete item is selected, such
   * as selecting a basket, a saved query or a recent document.
   * @param item
   */
  selectItem(item: AutocompleteItem) {
    this.audit.notify({type: AuditEventType.Search_AutoComplete, detail:{display: item.display, category: item.category }})

    if(item.category === "recent-document"){
      this.previewService.openRoute(item['data'], this.searchService.makeQuery());
    }
    else if (item.category === "saved-query"){
      this.savedQueriesService.searchSavedQuery(item['data'], "/search");
    }
    else if (item.category === "basket"){
      this.basketsService.searchBasket(item['data'], "/search");
    }
    else {
      this.search.emit(item.display);
    }
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
      case "saved-query": return "fas fa-save fa-fw";
    }
    return "far fa-lightbulb fa-fw";
  }


  /**
   * Search for the input text in the recent queries and return autocomplete items asynchronously
   * @param text
   */
  searchRecentQueries(text: string): Promise<AutocompleteItem[]> {
    const defaultRecentQueries = Promise.resolve(this.recentQueriesService.recentqueries.map(
      (query) => ({display: query.query.text, category: 'recent-query', label: "msg#searchForm.recentQuery"}) as AutocompleteItem
    ));
    const suggestedRecentQueries =  this.suggestService.searchData(
      'recent-query',
      text,
      this.recentQueriesService.recentqueries,
      (query) => query.query.text || "",
      undefined,
      "msg#searchForm.recentQuery");
    return !!text ? suggestedRecentQueries : defaultRecentQueries;
  }

  /**
   * Search for the input text in the recent documents and return autocomplete items asynchronously
   * @param text
   */
  searchRecentDocuments(text: string): Promise<AutocompleteItem[]> {
    return this.suggestService.searchData(
      'recent-document',
      text,
      this.recentDocumentsService.recentdocuments,
      doc => doc.title,
      doc => ([] as string[]).concat(doc.url1, doc.treepath, doc.authors),
      "msg#searchForm.recentDocument");
  }

  /**
   * Search for the input text in the saved queries and return autocomplete items asynchronously
   * @param text
   */
  searchSavedQueries(text: string): Promise<AutocompleteItem[]> {
    return this.suggestService.searchData(
      'saved-query',
      text,
      this.savedQueriesService.savedqueries,
      (query) => query.name,
      (query) => [query.description || "", query.query.text || ""],
      "msg#editSavedQuery.title");
  }

  /**
   * Search for the input text in the baskets and return autocomplete items asynchronously
   * @param text
   */
  searchBaskets(text: string): Promise<AutocompleteItem[]> {
    return this.suggestService.searchData(
      'basket',
      text,
      this.basketsService.baskets,
      (bsk) => bsk.name,
      (bsk) => [bsk.description || ""],
      "msg#editBasket.title");
  }


  // Keyboard navigation and actions

  moveNext(event: Event) {
    this.move(event, (this.selectedIndex ?? -1) + 1);
  }

  movePrevious(event: Event) {
    this.move(event, (this.selectedIndex ?? this.items.length) - 1);
  }

  move(event: Event, index: number) {
    this.selectedIndex = index;
    if(this.selectedIndex < 0 || this.selectedIndex >= this.items.length) {
      this.selectedIndex = undefined;
      this.resetText();
    }
    else {
      const item = this.items[this.selectedIndex];
      if(item.category === 'recent-document' || item.category === 'saved-query' || item.category === 'basket') {
        this.resetText();
      }
      else {
        this.selectText(item.display);
      }
    }
    event.preventDefault();
    this.cdRef.detectChanges();
  }

  resetText() {
    this.selectText(this.inputChange$.value); // The inputChange$ observable contains the last text manually entered by the user
  }

  selectText(value: string) {
    if(value !== this.queryText) {
      this.skipNextChange = true; // This flag prevents triggering new suggestions from this (pre)-selected text
      this.select.emit(value); // Update the search input with this new value
    }
  }

  onEnter() {
    if(this.items.length && this.selectedIndex !== undefined) {
      this.selectItem(this.items[this.selectedIndex]);
    }
    else {
      this.search.emit(this.inputElement.value); // This has the effect of submitting the search with the current search form content
    }
  }
}
