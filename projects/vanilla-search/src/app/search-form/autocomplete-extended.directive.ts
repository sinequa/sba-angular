import { Directive, ElementRef, Input } from '@angular/core';
import { Autocomplete, SuggestService, AutocompleteItem, AutocompleteState } from '@sinequa/components/autocomplete';
import { AppService } from '@sinequa/core/app-utils';
import { UIService } from '@sinequa/components/utils';
import { Utils } from '@sinequa/core/base';
import { RecentQueriesService, RecentDocumentsService, SavedQueriesService, RecentDocument, RecentQuery, SavedQuery } from '@sinequa/components/saved-queries';
import { PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { BasketsService } from '@sinequa/components/baskets';
import { Observable, forkJoin, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Basket } from '@sinequa/components/baskets';


/**
 * This directive extends the autocomplete directive to provide autocomplete on
 * additional objects, such as recent queries, documents and baskets
 */
@Directive({
    selector: "[sqAutocompleteExtended]"
})
export class AutocompleteExtended extends Autocomplete {

    /**
     * List of features within which to search in
     * (list of 'recent-documents', 'recent-queries', 'saved-queries', 'baskets')
     */
    @Input() sqAutocompleteExtended: string[] = [];

    constructor(
        elementRef: ElementRef,
        suggestService: SuggestService,
        appService: AppService,
        uiService: UIService,
        protected recentQueriesService: RecentQueriesService,
        protected recentDocumentsService: RecentDocumentsService,
        protected savedQueriesService: SavedQueriesService,
        protected basketsService: BasketsService,
        protected previewService: PreviewService,
        protected searchService: SearchService){
        super(elementRef, suggestService, appService, uiService);

    }

    /**
     * This method overrides the Autocomplete.getSuggests() method from the sqAutocomplete directive.
     * Rather than only getting suggests from the server via the SuggestService, this directive also
     * searches for matches in the User Settings objects (recent documents, recent queries, saved
     * queries, baskets)
     */
    protected getSuggests(){
        let value = this.getInputValue();
        if(value) { // If there is text, make a call to the suggest API
            const parseResult = this.parseQuery(); // If using fieldSearch, the result can be used to detect an active field
            let fields: string[] | undefined;
            if(parseResult.result && this.fieldSearch){
                const position = this.getInputPosition(); // Position of the caret, if needed
                const res = parseResult.result.findValue(position);
                // Field Search suggest
                if(!!res && !!res.field){
                    fields = Utils.startsWith(res.field, "@") ? ["text"] : [res.field];
                    value = res.value;
                }
            }

            // Methods returning (observable of) suggestions from different sources

            const dataSources: Observable<AutocompleteItem[]>[] = this.sqAutocompleteExtended.map(source => {
                switch(source) {
                    case 'suggests': return  this.suggestService.get(this.suggestQuery, value, fields);
                    case 'baskets': return from(this.searchBaskets(value));
                    case 'recent-documents': return from(this.searchRecentDocuments(value));
                    case 'recent-queries': return from(this.searchRecentQueries(value));
                    case 'saved-queries': return from(this.searchSavedQueries(value));
                }
                return of([]);
            });

            this.processSuggests(
                // The forkJoin method allows to merge the suggestions into a single array, so the parent
                // directive only sees a single source.
                forkJoin(...dataSources).pipe(
                    map((suggests) => {
                        return [].concat(...suggests)
                            .sort((a,b) => (b['score'] || 0) - (a['score'] || 0)); // autocomplete items returned by searchData still have their "score" attribute, which is consistent across categories
                    }),
                    catchError((err, caught) => {
                        console.error(err);
                        return [];
                    })
                ), fields);

        }
        else {  // If empty input, restart autocomplete
            this.start();
        }
    }

    /**
     * This method overrides the Autocomplete.select() method from the sqAutocomplete directive.
     * It performs custom actions when a specific category of autocomplete item is selected, such
     * as selecting a basket, a saved query or a recent document.
     * @param item
     * @param submit
     */
    protected select(item: AutocompleteItem, submit?: boolean) {
        if(item.category === "recent-document"){
            this.previewService.openRoute(item['data'], this.searchService.makeQuery());
        }
        else if (item.category === "saved-query"){
            this.savedQueriesService.searchSavedQuery(item['data'], "/search");
            this.setState(AutocompleteState.SELECTED);
            this.dropdown.update(false);    // Close dropdown
        }
        else if (item.category === "basket"){
            this.basketsService.searchBasket(item['data'], "/search");
            this.setState(AutocompleteState.SELECTED);
            this.dropdown.update(false);    // Close dropdown
        }
        else {
            super.select(item, submit);
        }
    }

    /**
     * Search for the input text in the recent queries and return autocomplete items asynchronously
     * @param text
     */
    searchRecentQueries(text: string): Promise<AutocompleteItem[]> {
        return this.suggestService.searchData<RecentQuery>(
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
        return this.suggestService.searchData<RecentDocument>(
            'recent-document',
            text,
            this.recentDocumentsService.recentdocuments,
            (doc: RecentDocument) => doc.title,
            (doc: RecentDocument) => ([] as string[]).concat(doc.url1, doc.treepath, doc.authors),
            "msg#searchForm.recentDocument");
    }

    /**
     * Search for the input text in the saved queries and return autocomplete items asynchronously
     * @param text
     */
    searchSavedQueries(text: string): Promise<AutocompleteItem[]> {
        return this.suggestService.searchData<SavedQuery>(
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
        return this.suggestService.searchData<Basket>(
            'basket',
            text,
            this.basketsService.baskets,
            (bsk) => bsk.name,
            (bsk) => [bsk.description || ""],
            "msg#editBasket.title");
    }

}