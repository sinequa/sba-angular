import { Directive, Input, Output, EventEmitter, SimpleChanges, ElementRef, OnChanges, OnDestroy } from "@angular/core";
import { Observable, Subscription, of } from "rxjs";
import { Utils, Keys} from "@sinequa/core/base";
import { AppService, Expr, ExprBuilder, ExprParser, ExprValueInfo} from "@sinequa/core/app-utils";
import { Autocomplete, AutocompleteItem, AutocompleteState } from './autocomplete.directive';
import { SuggestService } from './suggest.service';
import { UIService } from '@sinequa/components/utils';

/**
 * Interface required to be implement by the component displaying
 * the fielded search items (basically the content of fieldSearchItems)
 */
export interface FieldSearchItemsContainer {

    /** Update the list of items displayed by the container */
    update(items: AutocompleteItem[]): void;

    /** Event triggered when the user removes an item from the container */
    itemRemoved: EventEmitter<AutocompleteItem>;
}

export interface ParseResult {
    result?: Expr;
    error?: string;
}

@Directive({
    selector: "[sqAutocompleteFieldSearch]"
})
export class AutocompleteFieldSearch extends Autocomplete implements OnChanges, OnDestroy {


    // FIELDED SEARCH

    /** 
     * "text" mode: fielded search is entirely managed as text in the <input> component 
     * "selects" mode: fielded search stores the selected autocomplete items to create selections, while keeping a clean <input> content (better UI/UX but does not support operators like OR, NOT, and parentheses)
     */
    @Input() fieldSearchMode: "off" | "text" | "selects" = "text";

    /** Fields excluded from fielded search (searched as regular strings if selected) */
    @Input() excludedFields: string[] = ["concepts"];

    /* Fields included in fielded search (have precedence over excluded fields) */
    @Input() includedFields?: string[];

   /** Container displaying the fieldSearchItems (only needed if mode === "selects") */
    @Input() fieldSearchItemsContainer?: FieldSearchItemsContainer;

    /** Current selection expression needed to update the list of field search items if mode === "selects" */
    @Input() fieldSearchExpression?: string;
 
    /** Stores the selected fielded search items selected via Tab */
    public readonly fieldSearchItems: AutocompleteItem[] = [];


    // Event emitters

    @Output() parse = new EventEmitter<ParseResult>();

    constructor(elementRef: ElementRef<any>, 
        suggestService: SuggestService,
        appService: AppService,
        uiService: UIService,
        protected exprBuilder: ExprBuilder){
        super(elementRef, suggestService, appService, uiService);
    }


    /**
     * If the off input changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges){
        super.ngOnChanges(changes);

        // Subscribe to the field search items's container
        if(changes["fieldSearchItemsContainer"] && this.fieldSearchItemsContainer) {
            if(this._fieldSearchSubscription){
                this._fieldSearchSubscription.unsubscribe();
            }
            this._fieldSearchSubscription = this.fieldSearchItemsContainer.itemRemoved.subscribe(item => {
                this.fieldSearchItems.splice(this.fieldSearchItems.indexOf(item), 1);
                this.updatePlaceholder();
                this.submit.next();
            });
        }

        // Transform the field search expresion (Expr string) into a list of autocomplete items displayed in the field search container
        if(changes["fieldSearchExpression"] && this.fieldSearchMode === "selects") {
            if(this.fieldSearchExpression) {
                const expr = this.appService.parseExpr(this.fieldSearchExpression);
                if(expr instanceof Expr && this.fieldSearchItems.length !== expr.getFields().length) {
                    this.fieldSearchItems.splice(0);
                    if(expr.and) {
                        expr.operands.forEach(e => 
                            this.fieldSearchItems.push(this.exprToItem(e))
                        );
                    }
                    else {
                        this.fieldSearchItems.push(this.exprToItem(expr));
                    }
                }
            }
            else {
                this.fieldSearchItems.splice(0);
            }
        }

        // If fieldSearchMode changes from selects to something else, we must remove the field search items
        if(changes["fieldSearchMode"] && this.fieldSearchMode !== "selects" && this.fieldSearchItems.length > 0) {
            this.fieldSearchItems.splice(0);
        }

        this.updatePlaceholder();
        this.fieldSearchItemsContainer?.update(this.fieldSearchItems);
    }


    private _fieldSearchSubscription: Subscription;
    /**
     * Unsubscribe when destroying the component
     */
    ngOnDestroy(){
        super.ngOnDestroy();
        if(this._fieldSearchSubscription){
            this._fieldSearchSubscription.unsubscribe();
        }
    }

    /**
     * Insert the given autocomplete item into the current search input
     * at the right location
     * @param item 
     */
    protected insertAutocompleteItem(item: AutocompleteItem): boolean {
        const value = this.getInputValue(); // Current text in the input
        if(value) { // There should always be text
            const parseResult = this.parseQuery(); // Parse the current text
            if(parseResult.result) { // (if no result, a parsing error occurred)
                const res = parseResult.result.findValue(this.getInputPosition()); // Get the expression at the caret location
                // Autocomplete "compa" => "company:"
                if(res && item.category === "$field$") {
                    this.replaceValueInForm(res, item.display + ": ");
                    return false;
                }
                // Autocomplete "company:Goo" => "company:`GOOGLE`"
                if(res && res.field === item.category) {
                    this.replaceValueInForm(res, ExprParser.escape(item.normalized || item.display));
                    return true;
                }
                // Autocomplete "Goo" => "company:`GOOGLE`"
                if(res && !res.field && item.category && 
                    (this.includedFields && this.includedFields?.includes(item.category) || 
                    (!this.includedFields && !this.excludedFields?.includes(item.category)))) { // Filter out fields if not in fieldSearch mode
                    this.replaceValueInForm(res, this.exprBuilder.makeExpr(item.category, item.normalized || item.display));
                    return true;
                }
                // Autocomplete "Search eng" => "Search engine"
                if(res && !res.field) {
                    this.replaceValueInForm(res, item.display);
                    return true;
                }
                // Remaining edge case ?
                console.error(item, parseResult.result);
            }
        }

        console.error("Shouldn't be here: an autocomplete item is selected, but there is no text or a parse error!");
        // Default to just overriding the current value (a complex query with multiple items might become reduced to this single item!)
        if(item.category === "$field$") {
            this.setInputValue(item.display + ":");
            return false;
        }
        this.setInputValue(this.exprBuilder.makeExpr(item.category, item.normalized || item.display)); // person: `Bill Gates`
        return true;
    }

    /**
     * Replaces the piece of expression (res) with a new value
     * in the input form
     * @param res The piece of expression parsed from the input content
     * @param value The new value
     */
    protected replaceValueInForm(res: ExprValueInfo, value: string) {
        this.uiService.setCaret(this.inputElement, res.start, res.start+res.length, value);
    }

    /**
     * Sets the content of the <input> based on the given
     * Autocomplete Item (various implementations are possible,
     * depending on the item content and nature).
     * This would be the right method to override to implement
     * fielded search autocomplete.
     * @returns true if this autocomplete item should be searched
     */
    protected setAutocompleteItem(item: AutocompleteItem): boolean {
        if(item) {
            if(this.fieldSearchMode === "text") {
                return this.insertAutocompleteItem(item);
            }

            else if(this.fieldSearchMode === "selects" && item.category && 
                (this.includedFields && this.includedFields?.includes(item.category) || 
                (!this.includedFields && !this.excludedFields?.includes(item.category)))) { // Filter out fields if not in fieldSearch mode
                // In the case of of a field name, we display the field for autocomplete, but we don't want to search for it
                if(item.category === "$field$") {
                    this.setInputValue(item.display + ":");
                    return false;
                }
                // Store the autocomplete item that will be used to create a selection
                this.setInputValue("");
                this.fieldSearchItems.push(item);
                this.updatePlaceholder();
                this.fieldSearchItemsContainer?.update(this.fieldSearchItems);
                return true;
            }

            else {
                this.setInputValue(item.display);
                return true;
            }
        }
        return false;
    }

    /**
     * Returns an expression (Expr) for the fielded search items
     */
    public getFieldSearchExpression(): string | undefined {
        return this.itemsToExpr(this.fieldSearchItems);
    }

    /**
     * Transforms a list of AutocompleteItems into an expression
     * @param items list of AutocompleteItems
     */
    protected itemsToExpr(items: AutocompleteItem[]): string | undefined {
        if(items.length > 0) {
            return this.exprBuilder.concatAndExpr(items.map(item => 
                this.exprBuilder.makeExpr(item.category, item.normalized || item.display, item.display)));
        }
        return undefined;
    }

    /**
     * Transforms an expression into a list of AutocompleteItems
     * @param expr an expression
     */
    protected exprToItem(expr: Expr): AutocompleteItem {
        return {
            category: expr.field!,
            display: expr.display!,
            normalized: expr.value!,
        }
    }

    /**
     * Takes the text from the <input> element and parse it to
     * determine what type of suggestion to request from the server.
     * The suggestions are then fetched by getSuggestsObs() and processed
     * by processSuggests().
     */
    protected getSuggests() {
        let value = this.getInputValue();
        if(value) { // If there is text, make a call to the suggest API
            const parseResult = this.parseQuery(); // If using fieldSearch, the result can be used to detect an active field
            let fields: string[] | undefined;
            if(parseResult.result && this.fieldSearchMode !== "off"){
                const position = this.getInputPosition(); // Position of the caret, if needed
                const res = parseResult.result.findValue(position);
                // Field Search suggest
                if(!!res && !!res.field){
                    fields = Utils.startsWith(res.field, "@") ? ["text"] : [res.field];
                    value = res.value;
                }
                if(!!res && this.fieldSearchMode === "text") {
                    value = res.value;
                }
            }

            if(parseResult.error && this.fieldSearchMode !== "off") {
                this.processSuggests(of([])); // Empty autocomplete if parsing errors
                return;
            }

            this.processSuggests(
                this.getSuggestsObs(value, fields)
            );

        }
        else {  // If empty input, restart autocomplete
            this.parse.next({}); // remove error messages if any
            this.start();
        }
    }

    /**
     * Process suggestions obtained (from whatever mean):
     * - If data available, filter out fields
     * - update the dropdown content
     * - Switch between OPEN and ACTIVE states
     * - Use changeDetectorRef to update display
     * @param obs an observable of AutocompleteItem suggestions
     */
    protected processSuggests(obs: Observable<AutocompleteItem[]>){
        obs.subscribe(
            suggests => {
                if(this.getState() === AutocompleteState.ACTIVE || this.getState() === AutocompleteState.OPENED){
                    this.dropdown.update(true, suggests
                        .filter(item => item.category !== "$field$" || (this.fieldSearchMode !== "off" && 
                            (this.includedFields && this.includedFields?.includes(item.display) || 
                            (!this.includedFields && !this.excludedFields?.includes(item.display)))))  // Filter out fields if not in fieldSearch mode
                        .map(item => {
                            if(!item.label){
                                if(item.category === "$field$") {
                                    item.label = "Field";
                                }
                                else {
                                    item.label = this.appService.getLabel(item.category);
                                }
                            }
                            return item;
                        }));
                }
            },
            err => {
                this.dropdown.update(false);
            },
            () => {
                if(this.dropdown.hasItems && this.getState() === AutocompleteState.ACTIVE){
                    this.open();    // Switch from ACTIVE to OPENED (if not already)
                }
                else if(!this.dropdown.hasItems && this.getState() === AutocompleteState.OPENED){   // No data
                    this.active();  // Switch from OPENED to ACTIVE (if not already)
                }
            });
    }

    /**
     * Parse the query for syntax errors (also allows to detect field search if needed).
     * Fires a parse event.
     */
    protected parseQuery() : ParseResult {
        const value = this.getInputValue();
        const result = this.appService.parseExpr(value, {allowEmptyValues: true});
        const event = result instanceof Expr? { result: result } : { error: result };
        this.parse.next(event);
        return event;
    }


    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove field search items.
     * @param event the keyboard
     */
    keydown(event: KeyboardEvent) {

        const keydown = super.keydown(event);

        if(keydown === undefined) {
            // In fielded search mode, we can remove selections by typing <backspace> when the input is empty
            if(event.keyCode === Keys.backspace) {
                if(this.fieldSearchMode === "selects" && this.getInputValue() === '') {
                    this.fieldSearchItems.pop();
                    this.updatePlaceholder();
                    this.fieldSearchItemsContainer?.update(this.fieldSearchItems);
                }
            }    
        }
        
        return keydown;
    }

    /**
     * Updates the <input>'s placeholder to avoid displaying something
     * when there are fieldSearchItems displayed to the left.
     */
    updatePlaceholder() {
        this._placeholder = this.fieldSearchItems.length > 0 ? '' : this.placeholder;
    }
}