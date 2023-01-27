import { Input, Output, Component, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from "@angular/core";
import { AutocompleteItem, SuggestService } from "@sinequa/components/autocomplete";
import { BasketsService } from "@sinequa/components/baskets";
import { PreviewService } from "@sinequa/components/preview";
import { RecentDocumentsService, RecentQueriesService, SavedQueriesService } from "@sinequa/components/saved-queries";
import { SearchService } from "@sinequa/components/search";
import { AppService } from "@sinequa/core/app-utils";
import { AuditEventType, AuditWebService } from "@sinequa/core/web-services";
import { fromEvent, merge, of, Observable, from, forkJoin, ReplaySubject } from "rxjs";
import { debounceTime, map, switchMap } from "rxjs/operators";


@Component({
  selector: "sq-autocomplete",
  templateUrl: './autocomplete.component.html',
  styles: [`
  .list-group-item-action {
    cursor: pointer;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() inputElement: HTMLInputElement;
  @Input() queryText: string;
  @Input() debounce = 200;
  @Input() suggestQuery?: string;
  @Input() maxItems = 10;
  @Input() suggestTypes: string[] = ['suggests','recent-documents', 'recent-queries', 'saved-queries', 'baskets'];

  // autocomplete items returned by searchData have a "score" attribute, which is consistent across categories
  @Input() sortComparator = (a: AutocompleteItem, b: AutocompleteItem) => (b['score'] || 0) - (a['score'] || 0)

  @Output() search = new EventEmitter<string>();

  items$: Observable<AutocompleteItem[] | undefined>;

  inputChange$ = new ReplaySubject(1);

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
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.queryText) {
      this.inputChange$.next(this.queryText);
    }
  }

  ngOnInit(): void {
    this.items$ = merge(
      this.inputChange$,
      fromEvent(this.inputElement, 'focus')
    ).pipe(
      debounceTime(this.debounce),
      switchMap(() => this.getSuggests(this.queryText)),
    );
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
  select(item: AutocompleteItem, event: Event) {
    event.preventDefault(); // Prevent following link

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
      case "saved-query": return "far fa-save fa-fw";
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

}
