import {Directive, Input, Output, ElementRef, HostListener, OnInit, EventEmitter, OnDestroy, OnChanges, SimpleChanges, HostBinding} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {Utils, Keys} from "@sinequa/core/base";
import {AppService} from "@sinequa/core/app-utils";
import {SuggestService} from "./suggest.service";
import {UIService} from "@sinequa/components/utils";

/**
 * Minimal interface for autocomplete items (note that the Suggestion
 * objects returned by the Suggestion service implement naturally this
 * interface)
 */
export interface AutocompleteItem {
    display: string;
    normalized?: string;
    category: string;
    label?: string;
}

/**
 * Interface required to be implemented by the dropdown components
 * binded to this autocomplete directive.
 * The component is responsible for displaying a list of items
 * and signaling back if a component was clicked. The component must
 * also manage navigation through the list (next/previous and selectedValue).
 */
export interface AutocompleteComponent {

    /**
     * Whether there are any item to display
     */
    hasItems: boolean;

    /**
     * Event emitter for clicks on an autocomplete item
     */
    clicked: EventEmitter<AutocompleteItem>;

    /**
     * Returns the currently selected item, if any
     */
    selectedValue: AutocompleteItem | undefined;

    /**
     * Update the data and state of this component
     * @param active whether the component should be displayed
     * @param items The list of items to display
     */
    update(active: boolean, items?: AutocompleteItem[]): void;

    /**
     * Select the next item in the list and returns it
     */
    selectNext(): AutocompleteItem | undefined;

    /**
     * Select the previous item in the list and returns it
     */
    selectPrevious(): AutocompleteItem | undefined;
}

/**
 * States in which the autocomplete component can be
 */
export enum AutocompleteState {
    OFF = "OFF", // Autocomplete is turned off (via @Input())
    INIT = "INIT", // Input is not focused, dropdown is closed
    START = "START", // Input is focused, no text typed in, dropdown is closed
    ACTIVE = "ACTIVE", // Input is focused, text is typed, suggests are being queried, dropdown is closed
    OPENED = "OPENED", // Input is focused, text is typed, suggests are available, dropdown/autocomplete component is displayed
    SELECTED = "SELECTED" // Input is focused, an input from the dropdown was selected
}

@Directive({
    selector: "[sqAutocomplete]"
})
export class Autocomplete implements OnInit, OnChanges, OnDestroy {

    /** Reference to the AutocompleteComponent that displays the autocomplete items */
    @Input() dropdown: AutocompleteComponent;

    /** Whether the autocomplete should be active or not */
    @Input() off: boolean;

    /** Debounce delay between autocomplete queries */
    @Input() suggestDelay: number = 200;

    /** Name of the Suggest Query to be used */
    @Input() suggestQuery: string;

    /** Custom placeholder */
    @Input() placeholder: string = '';

    @HostBinding('attr.placeholder') _placeholder;

    // Event emitters

    @Output() stateChange = new EventEmitter<AutocompleteState>();
    @Output() submit = new EventEmitter<void>();

    private _state: AutocompleteState = AutocompleteState.INIT;

    // The input HTML element to which this directive is attached
    protected readonly inputElement: HTMLInputElement;


    // Initialization

    constructor(
        elementRef: ElementRef,
        protected suggestService: SuggestService,
        protected appService: AppService,
        protected uiService: UIService){

        this.inputElement = elementRef.nativeElement;
    }


    /**
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit(){
        this._dropdownSubscription = this.dropdown.clicked.subscribe(item => {
            this.select(item, true);  // An item was selected from the autocomplete => take the value
        });

        this._placeholder = this.placeholder;
        this.inputElement.focus();
        this.start();
    }

    /**
     * If the off input changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges){
        // Turn on the autocomplete
        if(changes["off"] && !this.off){
            this.start();
        }
    }


    protected _dropdownSubscription: Subscription;
    /**
     * Unsubscribe when destroying the component
     */
    ngOnDestroy(){
        if(this._dropdownSubscription){
            this._dropdownSubscription.unsubscribe();
        }
    }


    // Getters and Setters

    /**
     * Return the current state of the autocomplete
     */
    public getState(): AutocompleteState {
        return this._state;
    }

    /**
     * Set the current state of the autocomplete
     */
    protected setState(state: AutocompleteState) {
        if(this.off){
            if(this._state !== AutocompleteState.OFF){
                this._state = AutocompleteState.OFF;
                this.stateChange.next(this.getState());
            }
            // ignore state change if Autocomplete is off
        }
        else if(!!state && this._state !== state) {
            this._state = state;
            //console.log("STATE: ", this._state);
            this.stateChange.next(this.getState());
        }
    }

    /**
     * Get the current text value of the HTML <input>
     * to which this directive is attached
     */
    protected getInputValue() : string {
        return this.inputElement.value;
    }

    /**
     * Set the current text value of the HTML <input>
     * to which this directive is attached
     */
    protected setInputValue(value: string) {
        // Using setCaret() allows to properly update the underlying form
        this.uiService.setCaret(this.inputElement, 0, -1, value); // 0, -1 erases the current value and writes the new one
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
            this.setInputValue(item.display);
            return true;
        }
        return false;
    }


    // Methods triggering state changes

    /**
     * INIT state (Input is not focused, dropdown is closed)
     */
    protected init(): void {
        this.setState(AutocompleteState.INIT);
        this.dropdown.update(false);    // If the dropdown was active
    }

    /**
     * START state (Input is focused, no text typed in, dropdown is closed)
     */
    protected start(): void {
        this.setState(AutocompleteState.START);
        this.dropdown.update(false);    // If the dropdown was active
    }

    /**
     * START state and if the <input> has content, immediately switch to ACTIVE
     */
    protected startOrActive(): void {
        if(this.getState()!== AutocompleteState.ACTIVE && this.getState()!== AutocompleteState.OPENED){ // Avoid flickering
            this.start();
            if(!!this.getInputValue()){
                this.active();
            }
        }
    }

    /**
     * ACTIVE state (Input is focused, text is typed, suggests are being queried, dropdown is closed)
     */
    protected active(): void {
        if(this.getState() === AutocompleteState.START || this.getState() === AutocompleteState.ACTIVE || this.getState() === AutocompleteState.OPENED){
            this.setState(AutocompleteState.ACTIVE);
            this.dropdown.update(false);    // If the dropdown was active
            this.suggest();
        }
    }

    /**
     * Select the given autocomplete suggestion for search
     * @param submit if, true also trigger a submit
     * @param item a specific item to submit
     */
    protected select(item: AutocompleteItem, submit?: boolean): void {
        this.setState(AutocompleteState.SELECTED); // Change state BEFORE setting input value, so the event is correctly processed
        const searchable = this.setAutocompleteItem(item);
        this.dropdown.update(false);    // Close dropdown

        if(submit && searchable) this.submit.next();
    }

    /**
     * Switch to OPENED state (from ACTIVE only)
     */
    protected open(): void {
        if(this.getState() === AutocompleteState.ACTIVE){
            this.setState(AutocompleteState.OPENED);
        }
    }

    /**
     * Request suggestions from the server, and update the dropdown contents
     * and autocomplete state asynchronously.
     * Override this method for a synchronous implementation.
     */
    protected suggest() {
        this.debounceSuggest();
    }

    /**
     * Actually makes the API call to the suggestService to retrieve suggestions
     * and process them.
     */
    protected getSuggests() {
        const value = this.getInputValue();
        if(value) { // If there is text, make a call to the suggest API
            this.processSuggests(
                this.getSuggestsObs(value)
            );
        }
        else {  // If empty input, restart autocomplete
            this.start();
        }
    }

    /**
     * Returns an observable of Suggestions, given some input text
     * @param value input text for which to return suggestions
     */
    protected getSuggestsObs(value: string, fields?: string[]): Observable<AutocompleteItem[]> {
        return this.suggestService.get(this.suggestQuery, value, fields);
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
                        .filter(item => item.category !== "$field$")  // Filter out fields
                        .map(item => {
                            if(!item.label){
                                item.label = this.appService.getLabel(item.category);
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
     * Use the suggest service to retrieve suggestions given the input text.
     * The suggest (autocomplete) query is debounded to avoid flooding the server.
     */
    private readonly debounceSuggest: () => void = Utils.debounce(() => {
        this.getSuggests();
    }, this.suggestDelay);


    /**
     * Returns the caret position within the input
     */
    protected getInputPosition(): number {
        // Come back before trailing spaces so the preceding value is still seen as the input value
        // (needed for ExprParser to stop autocomplete being cancelled on entering trailing spaces)
        const position = this.uiService.getCaret(this.inputElement).start;
        const length = Utils.len(Utils.trimEnd(this.getInputValue()));
        return Math.min(position, length);
    }

    /**
     * The following are event listeners applied to the <input> host component
     * onto which this directive is applied.
     * The events affect the state of the autocomplete, which triggers
     * various actions (call to suggest API, etc.).
     */

    /**
     * Listens to click events on the <input> host
     */
    @HostListener("click") click() {
        //console.log("input clicked");
        this.startOrActive();
    }

    /**
     * Listens to touchstart events (mobile clicks) on the <input> host
     */
    @HostListener("touchstart") touchstart() {
        //console.log("input touchstart");
        this.startOrActive();
    }

    /**
     * Listens to focus events on the <input> host
     */
    @HostListener("focus") focus() {
        //console.log("input focus gained");
        this.start();
    }

    /**
     * Listens to blur events (out of focus) on the <input> host
     */
    @HostListener("blur", ["$event"]) blur(event: FocusEvent) {
        //console.log("input focus lost");
        this.init();
    }

    /**
     * Listen to any change in the <input> content and react
     * according to the current state of the autocomplete
     * @param event
     */
    @HostListener("input", ["$event"]) inputChanged(event: Event) {
        //console.log("input value changed");
        switch(this.getState()){
            case AutocompleteState.OPENED:
                this.suggest(); // Just request more data, but no state change
                break;
            case AutocompleteState.START:
            case AutocompleteState.ACTIVE:
                this.active(); // get more data, and change state if not already ACTIVE
                break;
            case AutocompleteState.SELECTED:
                this.start(); // The model changed because we selected a value ==> we restart in case the user keeps typing
                break;
            case AutocompleteState.INIT:
                console.error("Should not be in INIT state if the form changes");
                break;
        }
    }

    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * @param event the keyboard
     */
    @HostListener("keydown", ["$event"]) keydown(event: KeyboardEvent) {
        // Navigation in the opened dropdown
        if (this.getState() === AutocompleteState.OPENED) {
            switch (event.keyCode) {
                case Keys.up:
                    this.dropdown.selectPrevious();
                    return false; // prevent default
                case Keys.down:
                    this.dropdown.selectNext();
                    return false; // prevent default
                case Keys.tab:
                    if(!!this.dropdown.selectedValue){
                        this.select(this.dropdown.selectedValue);
                    } else {
                        this.dropdown.selectNext();
                    }
                    return false; // prevent default (change focus)
                case Keys.esc:
                    this.start(); // Just restart the autocomplete
                    //event.stopPropagation(); // needed?
                    return false; // prevent default
                case Keys.enter:
                    if(!!this.dropdown.selectedValue){
                        this.select(this.dropdown.selectedValue, true);
                        //event.stopPropagation(); // needed?
                        return false; // prevent default action (auto submit)
                    }
            }
        }

        // If a search was triggered, restart the autocomplete
        if(event.keyCode === Keys.enter) {
            this.submit.next();
            this.start();
        }
        return undefined;
    }
}
