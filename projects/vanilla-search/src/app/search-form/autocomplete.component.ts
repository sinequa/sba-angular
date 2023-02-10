import { Input, Output, Component, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { AutocompleteItem, SuggestService } from "@sinequa/components/autocomplete";
import { BasketsService } from "@sinequa/components/baskets";
import { PreviewService } from "@sinequa/components/preview";
import { RecentDocumentsService, RecentQueriesService, SavedQueriesService } from "@sinequa/components/saved-queries";
import { SearchService } from "@sinequa/components/search";
import { AppService } from "@sinequa/core/app-utils";
import { AuditEventType, AuditWebService } from "@sinequa/core/web-services";
import { fromEvent, merge, of, Observable, from, forkJoin, ReplaySubject, Subscription } from "rxjs";
import { debounceTime, map, switchMap } from "rxjs/operators";


@Component({
  selector: "sq-autocomplete",
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

  inputChange$ = new ReplaySubject(1);

  selectedIndex: number | undefined;

  subscription: Subscription;

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
            case "Tab": this.onTab(event); break;
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
    let dataSources: Observable<AutocompleteItem[]>[] = this.suggestTypes.map(source => {
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
    return this.suggestService.searchData(
      'recent-query',
      text,
      this.recentQueriesService.recentqueries,
      (query) => query.query.text || "",
      undefined,
      "msg#searchForm.recentQuery");
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
    if(this.items.length) {
      this.selectedIndex = this.selectedIndex !== undefined && this.selectedIndex < this.items.length-1 ?
        this.selectedIndex + 1 : 0;
        event.preventDefault();
        this.cdRef.detectChanges();
    }
  }

  movePrevious(event: Event) {
    if(this.items.length) {
      this.selectedIndex = this.selectedIndex !== undefined && this.selectedIndex > 0 ?
        this.selectedIndex - 1 : this.items.length-1;
      event.preventDefault();
      this.cdRef.detectChanges();
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

  onTab(event: Event) {
    if(this.items.length && this.selectedIndex !== undefined) {
      const item = this.items[this.selectedIndex];
      if(item && item.category !== 'recent-document' && item.category !== 'saved-query' && item.category !== 'basket') {
        this.audit.notify({type: AuditEventType.Search_AutoComplete, detail:{display: item.display, category: item.category }})
        this.select.emit(item.display);
      }
      event.preventDefault(); // prevent removing focus for input element, even if the tab didn't produce any effect
    }
  }
}
