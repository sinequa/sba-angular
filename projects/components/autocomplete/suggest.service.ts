import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {map, flatMap} from "rxjs/operators";
import {Utils} from "@sinequa/core/base";
import {SuggestQueryWebService, SuggestFieldWebService, Suggestion, EngineType} from "@sinequa/core/web-services";
import {AppService, Query} from "@sinequa/core/app-utils";
import {AutocompleteItem} from './autocomplete.directive';

@Injectable({
    providedIn: "root"
})
export class SuggestService {

    fieldCategory: string;

    constructor(
        private suggestQueryWebService: SuggestQueryWebService,
        private suggestFieldWebService: SuggestFieldWebService,
        private appService: AppService) {
        this.fieldCategory = "$field$";
    }

    private addFields(text: string, suggests: Suggestion[]) {
        if (text.includes(" ")) {
            return;
        }
        for (const field of this.appService.fields) {
            if (Utils.startsWith(field, text)) {
                suggests.unshift({
                    category: this.fieldCategory,
                    display: field
                });
            }
        }
    }

    get(suggestQuery: string, text: string, fields?: string | string[], query?: Query): Observable<Suggestion[]> {
        if (!this.appService.ccquery) {
            return of([]);
        }
        const observable = this.suggestQueryWebService.get(suggestQuery, text, this.appService.ccquery.name, fields);
        return observable.pipe(
            flatMap(suggests => {
                if (!fields) {
                    if (!suggests) {
                        suggests = [];
                    }
                    this.addFields(text, suggests);
                }
                else {
                    if (!suggests || suggests.length === 0) {
                        const _fields = Utils.isArray(fields) ? fields : [fields];
                        fields = [];
                        for (const field of _fields) {
                            const column = this.appService.getColumn(field);
                            if (!!column && (column.eType === EngineType.csv || AppService.isScalar(column))) {
                                fields.push(field);
                            }
                        }
                        if (fields.length > 0) {
                            return this.suggestFieldWebService.get(text, fields, query).pipe(
                                map((suggests) => {
                                    suggests.forEach(value => value.display = Utils.toSqlValue(value.display)); // because dates get automatically converted by the interceptor
                                    return suggests;
                                }));
                        }
                    }
                }
                return of(suggests);
            }));
    }


    /**
     * Search for the input text in a list of objects and return autocomplete items asynchronously
     * @param query The text to search for
     * @param data The list of objects
     * @param primaryText A function that returns the primary text input given the object
     * @param secondaryText An (optional) function that returns a list of secondary text inputs given the object
     */
    public async searchData<T>(
        category: string,
        query: string,
        data: T[],
        primaryText: (obj:T) => string,
        secondaryText?: (obj:T) => string[],
        label?: string) : Promise<AutocompleteItem[]> {

        return data
            .map(obj => SuggestService.findMatch(primaryText(obj), query,
                !!secondaryText ? secondaryText(obj) : [], obj)) // Look for matches in all saved queries
            .filter(item => !!item) // Keep only the matches
            /*tslint:disable-next-line*/
            .sort((a,b) => b!.score - a!.score) // Sort by decreasing score
            .map(item => {
                /*tslint:disable-next-line*/
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
    public static findMatch(text: string, query: string, secondaryText?: string[], data?: any): {display: string, displayHtml: string, score: number, data?:any} | undefined {

        if(!text || !query){
            return undefined;
        }

        // pass text and query in lower case and no accent to make search case insensitive
        const textLower = Utils.removeAccents(text.toLowerCase());
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
        let html = text;
        for(let j=matches.length-1; j>=0; j--) { // decreasing order so the indices remain valid
            i = matches[j];
            html = html.slice(0, i).concat("<strong>", html.slice(i, i+query.length), "</strong>", html.slice(i+query.length));
        }

        // Secondary text
        if(secondaryText) {
            secondaryText
                .map(t => this.findMatch(t, query)) // Search each secondary text for matches
                .filter(item => !!item) // Keep only the matches
                /*tslint:disable-next-line*/
                .sort((a,b) => b!.score - a!.score) // Sort by decreasing score
                .forEach(match => {
                    /*tslint:disable-next-line*/
                    match = match!;
                    score += match.score / 2;  // Secondary matches added to the score, but count half
                    html += " <small>" + match.displayHtml + "</small>"; // Concatenate secondary match html to the main html
                });
        }

        if(score > 0){
            return {
                display: text,
                displayHtml: html,
                score: score,
                data: data
            };
        }
        return undefined;
    }
}