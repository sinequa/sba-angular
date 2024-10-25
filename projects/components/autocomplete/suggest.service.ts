import {Injectable} from "@angular/core";
import {map, Observable, of, switchMap, tap} from "rxjs";
import {Utils} from "@sinequa/core/base";
import {SuggestQueryWebService, SuggestFieldWebService, Suggestion, EngineType} from "@sinequa/core/web-services";
import {AppService, Query} from "@sinequa/core/app-utils";
import {AutocompleteItem} from './autocomplete.directive';

export interface ScoredAutocompleteItem<T, Tcat extends string> extends AutocompleteItem {
  score: number;
  data: T;
  category: Tcat;
}

@Injectable({
    providedIn: "root"
})
export class SuggestService {

    constructor(
        private suggestQueryWebService: SuggestQueryWebService,
        private suggestFieldWebService: SuggestFieldWebService,
        private appService: AppService) {
    }

    get(suggestQuery: string | undefined, text: string, fields?: string | string[], query?: Query, maxCount = 10): Observable<ScoredAutocompleteItem<undefined,string>[]> {
        text = text.trim();
        if (!this.appService.ccquery || !text) {
            return of([]);
        }
        const sugQuery = suggestQuery || this.appService.suggestQueries[0];
        const ccquery = this.appService.ccquery.name;
        return this.suggestQueryWebService.get(sugQuery, text, ccquery, fields).pipe(
            // If no suggestion is returned, attempt fallback strategies
            switchMap(suggests => {
                if(!suggests || suggests.length === 0) {
                    if (fields) {
                        // If we are looking for specific fields, use the suggest field web service
                        return this.getFields(text, fields, query).pipe(map(items => ({items, searchText: text})));
                    }
                    else {
                        // Fall back to a strategy of autocompleting only the last token
                        const i = text.lastIndexOf(" ")+1;
                        if(i > 0) {
                            const suffix = text.substring(i);
                            return this.suggestQueryWebService.get(sugQuery, suffix, ccquery).pipe(
                                tap(items => items?.forEach(s => s.display = s.display)),
                                map(items => ({items: items || [], searchText: suffix }))
                            );
                        }
                    }
                }
                return of({items: suggests || [], searchText: text});
            }),
            // Post process suggestions
            map(({items, searchText}) => items
                // Deduplicate items
                .filter((item,i) => items.findIndex(_item => Utils.eqNC(_item.display, item.display)) === i)
                // Limit the total number of items
                .slice(0, maxCount)
                // Add a score and highlight the text with HTML markup
                .map(item => {
                    const match = this.findMatch(item.display, searchText, undefined, undefined);
                    const score = (match?.score || 0) * 0.9; // Reduce the score of suggestions wrt other objects
                    return {...item, score, displayHtml: match?.displayHtml, data: undefined};
                })
            )
        );
    }

    getFields(text: string, fields: string | string[], query?: Query): Observable<Suggestion[]> {
        fields = Utils.asArray(fields).filter(field => {
            const column = this.appService.getColumn(field);
            return column && (column.eType === EngineType.csv || AppService.isScalar(column))
        });
        if (fields.length > 0) {
            return this.suggestFieldWebService.get(text, fields, query);
        }
        return of([]);
    }


    /**
     * Search for the input text in a list of objects and return autocomplete items asynchronously
     * @param query The text to search for
     * @param data The list of objects
     * @param primaryText A function that returns the primary text input given the object
     * @param secondaryText An (optional) function that returns a list of secondary text inputs given the object
     */
    public async searchData<T, Tcat extends string>(
        category: Tcat,
        query: string,
        data: T[],
        primaryText: (obj:T) => string,
        secondaryText?: (obj:T) => string[],
        label?: string) : Promise<ScoredAutocompleteItem<T, Tcat>[]> {

        return data
            .map(obj => this.findMatch(primaryText(obj), query,
                !!secondaryText ? secondaryText(obj) : [], obj)) // Look for matches in all saved queries
            .filter((item): item is { display: string; displayHtml: string; score: number; data: T; } => !!item) // Keep only the matches
            .sort((a,b) => b!.score - a!.score) // Sort by decreasing score
            .map(item => {
                item = item!;
                return {    // Make an autocomplete item
                    display: item.display,
                    displayHtml: item.displayHtml,
                    category,
                    label: label || category,
                    data: item.data,
                    score: item.score
                };
            } );
    }

    /**
     * Searches for the query string inside a given text. Returns a match object containing:
     * - a score proportional to the number and quality of matches
     * - the text formatted as HTML with the query found in the text
     * @param text The text to search
     * @param query The string to search for
     * @param secondaryText Secondary fields to search input, with less importance than the primary field
     * @param data A data object to be included in the match object (for convenience mostly)
     */
    public findMatch<T>(text: string, query: string, secondaryText: string[]|undefined, data: T): {display: string, displayHtml: string, score: number, data:T} | undefined {

        if(!text || !query){
            return undefined;
        }

        // pass text and query in lower case and no accent to make search case insensitive
        let html = text.replace(/<[^>]+>/g,""); // Remove HTML tags to protect against attacks
        const textLower = Utils.removeAccents(html.toLowerCase());
        query = Utils.removeAccents(query.toLowerCase());
        let i = 0;
        const matches: number[] = [];
        let score = 0;

        // Compute score of the match
        i = textLower.indexOf(query);
        while(i !== -1){    // While there's a match
            matches.push(i);
            if(i === 0){    // Start of the text
                score += 4;
            }
            else if(textLower[i-1] === " "){ // Start of a word
                score += 2;
            }
            else {
                score += 1; // Middle of a word
            }
            i = textLower.indexOf(query, i+query.length);
        }

        // Format HTML display
        for(let j=matches.length-1; j>=0; j--) { // decreasing order so the indices remain valid
            i = matches[j];
            html = html.slice(0, i).concat("<b>", html.slice(i, i+query.length), "</b>", html.slice(i+query.length));
        }

        // Secondary text
        if(secondaryText) {
            secondaryText
                .map(t => this.findMatch(t, query, undefined, undefined)) // Search each secondary text for matches
                .filter(item => !!item) // Keep only the matches
                .sort((a,b) => b!.score - a!.score) // Sort by decreasing score
                .forEach(match => {
                    match = match!;
                    score += match.score / 2;  // Secondary matches added to the score, but count half
                    html += " <small>" + match.displayHtml + "</small>"; // Concatenate secondary match html to the main html
                });
        }

        if(score > 0){
            return {
                display: text,
                displayHtml: html,
                score,
                data
            };
        }
        return undefined;
    }
}
