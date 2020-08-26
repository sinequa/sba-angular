"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Autocomplete = exports.AutocompleteState = void 0;
var core_1 = require("@angular/core");
var base_1 = require("@sinequa/core/base");
/**
 * States in which the autocomplete component can be
 */
var AutocompleteState;
(function (AutocompleteState) {
    AutocompleteState["OFF"] = "OFF";
    AutocompleteState["INIT"] = "INIT";
    AutocompleteState["START"] = "START";
    AutocompleteState["ACTIVE"] = "ACTIVE";
    AutocompleteState["OPENED"] = "OPENED";
    AutocompleteState["SELECTED"] = "SELECTED"; // Input is focused, an input from the dropdown was selected
})(AutocompleteState = exports.AutocompleteState || (exports.AutocompleteState = {}));
var Autocomplete = /** @class */ (function () {
    // Initialization
    function Autocomplete(elementRef, suggestService, appService, uiService) {
        var _this = this;
        this.suggestService = suggestService;
        this.appService = appService;
        this.uiService = uiService;
        /** Debounce delay between autocomplete queries */
        this.suggestDelay = 200;
        /** Custom placeholder */
        this.placeholder = '';
        // Event emitters
        this.stateChange = new core_1.EventEmitter();
        this.submit = new core_1.EventEmitter();
        this._state = AutocompleteState.INIT;
        /**
         * Use the suggest service to retrieve suggestions given the input text.
         * The suggest (autocomplete) query is debounded to avoid flooding the server.
         */
        this.debounceSuggest = base_1.Utils.debounce(function () {
            _this.getSuggests();
        }, this.suggestDelay);
        this.inputElement = elementRef.nativeElement;
    }
    /**
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    Autocomplete.prototype.ngOnInit = function () {
        var _this = this;
        this._dropdownSubscription = this.dropdown.clicked.subscribe(function (item) {
            _this.select(item, true); // An item was selected from the autocomplete => take the value
        });
        this._placeholder = this.placeholder;
        this.inputElement.focus();
        this.start();
    };
    /**
     * If the off input changes state, react accordingly
     * @param changes
     */
    Autocomplete.prototype.ngOnChanges = function (changes) {
        // Turn on the autocomplete
        if (changes["off"] && !this.off) {
            this.start();
        }
    };
    /**
     * Unsubscribe when destroying the component
     */
    Autocomplete.prototype.ngOnDestroy = function () {
        if (this._dropdownSubscription) {
            this._dropdownSubscription.unsubscribe();
        }
    };
    // Getters and Setters
    /**
     * Return the current state of the autocomplete
     */
    Autocomplete.prototype.getState = function () {
        return this._state;
    };
    /**
     * Set the current state of the autocomplete
     */
    Autocomplete.prototype.setState = function (state) {
        if (this.off) {
            if (this._state !== AutocompleteState.OFF) {
                this._state = AutocompleteState.OFF;
                this.stateChange.next(this.getState());
            }
            // ignore state change if Autocomplete is off
        }
        else if (!!state && this._state !== state) {
            this._state = state;
            //console.log("STATE: ", this._state);
            this.stateChange.next(this.getState());
        }
    };
    /**
     * Get the current text value of the HTML <input>
     * to which this directive is attached
     */
    Autocomplete.prototype.getInputValue = function () {
        return this.inputElement.value;
    };
    /**
     * Set the current text value of the HTML <input>
     * to which this directive is attached
     */
    Autocomplete.prototype.setInputValue = function (value) {
        // Using setCaret() allows to properly update the underlying form
        this.uiService.setCaret(this.inputElement, 0, -1, value); // 0, -1 erases the current value and writes the new one
    };
    /**
     * Sets the content of the <input> based on the given
     * Autocomplete Item (various implementations are possible,
     * depending on the item content and nature).
     * This would be the right method to override to implement
     * fielded search autocomplete.
     * @returns true if this autocomplete item should be searched
     */
    Autocomplete.prototype.setAutocompleteItem = function (item) {
        if (item) {
            this.setInputValue(item.display);
            return true;
        }
        return false;
    };
    // Methods triggering state changes
    /**
     * INIT state (Input is not focused, dropdown is closed)
     */
    Autocomplete.prototype.init = function () {
        this.setState(AutocompleteState.INIT);
        this.dropdown.update(false); // If the dropdown was active
    };
    /**
     * START state (Input is focused, no text typed in, dropdown is closed)
     */
    Autocomplete.prototype.start = function () {
        this.setState(AutocompleteState.START);
        this.dropdown.update(false); // If the dropdown was active
    };
    /**
     * START state and if the <input> has content, immediately switch to ACTIVE
     */
    Autocomplete.prototype.startOrActive = function () {
        if (this.getState() !== AutocompleteState.ACTIVE && this.getState() !== AutocompleteState.OPENED) { // Avoid flickering
            this.start();
            if (!!this.getInputValue()) {
                this.active();
            }
        }
    };
    /**
     * ACTIVE state (Input is focused, text is typed, suggests are being queried, dropdown is closed)
     */
    Autocomplete.prototype.active = function () {
        if (this.getState() === AutocompleteState.START || this.getState() === AutocompleteState.ACTIVE || this.getState() === AutocompleteState.OPENED) {
            this.setState(AutocompleteState.ACTIVE);
            this.dropdown.update(false); // If the dropdown was active
            this.suggest();
        }
    };
    /**
     * Select the given autocomplete suggestion for search
     * @param submit if, true also trigger a submit
     * @param item a specific item to submit
     */
    Autocomplete.prototype.select = function (item, submit) {
        this.setState(AutocompleteState.SELECTED); // Change state BEFORE setting input value, so the event is correctly processed
        var searchable = this.setAutocompleteItem(item);
        this.dropdown.update(false); // Close dropdown
        if (submit && searchable)
            this.submit.next();
    };
    /**
     * Switch to OPENED state (from ACTIVE only)
     */
    Autocomplete.prototype.open = function () {
        if (this.getState() === AutocompleteState.ACTIVE) {
            this.setState(AutocompleteState.OPENED);
        }
    };
    /**
     * Request suggestions from the server, and update the dropdown contents
     * and autocomplete state asynchronously.
     * Override this method for a synchronous implementation.
     */
    Autocomplete.prototype.suggest = function () {
        this.debounceSuggest();
    };
    /**
     * Actually makes the API call to the suggestService to retrieve suggestions
     * and process them.
     */
    Autocomplete.prototype.getSuggests = function () {
        var value = this.getInputValue();
        if (value) { // If there is text, make a call to the suggest API
            this.processSuggests(this.getSuggestsObs(value));
        }
        else { // If empty input, restart autocomplete
            this.start();
        }
    };
    /**
     * Returns an observable of Suggestions, given some input text
     * @param value input text for which to return suggestions
     */
    Autocomplete.prototype.getSuggestsObs = function (value, fields) {
        return this.suggestService.get(this.suggestQuery, value, fields);
    };
    /**
     * Process suggestions obtained (from whatever mean):
     * - If data available, filter out fields
     * - update the dropdown content
     * - Switch between OPEN and ACTIVE states
     * - Use changeDetectorRef to update display
     * @param obs an observable of AutocompleteItem suggestions
     */
    Autocomplete.prototype.processSuggests = function (obs) {
        var _this = this;
        obs.subscribe(function (suggests) {
            if (_this.getState() === AutocompleteState.ACTIVE || _this.getState() === AutocompleteState.OPENED) {
                _this.dropdown.update(true, suggests
                    .filter(function (item) { return item.category !== "$field$"; }) // Filter out fields
                    .map(function (item) {
                    if (!item.label) {
                        item.label = _this.appService.getLabel(item.category);
                    }
                    return item;
                }));
            }
        }, function (err) {
            _this.dropdown.update(false);
        }, function () {
            if (_this.dropdown.hasItems && _this.getState() === AutocompleteState.ACTIVE) {
                _this.open(); // Switch from ACTIVE to OPENED (if not already)
            }
            else if (!_this.dropdown.hasItems && _this.getState() === AutocompleteState.OPENED) { // No data
                _this.active(); // Switch from OPENED to ACTIVE (if not already)
            }
        });
    };
    /**
     * Returns the caret position within the input
     */
    Autocomplete.prototype.getInputPosition = function () {
        // Come back before trailing spaces so the preceding value is still seen as the input value
        // (needed for ExprParser to stop autocomplete being cancelled on entering trailing spaces)
        var position = this.uiService.getCaret(this.inputElement).start;
        var length = base_1.Utils.len(base_1.Utils.trimEnd(this.getInputValue()));
        return Math.min(position, length);
    };
    /**
     * The following are event listeners applied to the <input> host component
     * onto which this directive is applied.
     * The events affect the state of the autocomplete, which triggers
     * various actions (call to suggest API, etc.).
     */
    /**
     * Listens to click events on the <input> host
     */
    Autocomplete.prototype.click = function () {
        //console.log("input clicked");
        this.startOrActive();
    };
    /**
     * Listens to touchstart events (mobile clicks) on the <input> host
     */
    Autocomplete.prototype.touchstart = function () {
        //console.log("input touchstart");
        this.startOrActive();
    };
    /**
     * Listens to focus events on the <input> host
     */
    Autocomplete.prototype.focus = function () {
        //console.log("input focus gained");
        this.start();
    };
    /**
     * Listens to blur events (out of focus) on the <input> host
     */
    Autocomplete.prototype.blur = function (event) {
        //console.log("input focus lost");
        this.init();
    };
    /**
     * Listen to any change in the <input> content and react
     * according to the current state of the autocomplete
     * @param event
     */
    Autocomplete.prototype.inputChanged = function (event) {
        //console.log("input value changed");
        switch (this.getState()) {
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
    };
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * @param event the keyboard
     */
    Autocomplete.prototype.keydown = function (event) {
        // Navigation in the opened dropdown
        if (this.getState() === AutocompleteState.OPENED) {
            switch (event.keyCode) {
                case base_1.Keys.up:
                    this.dropdown.selectPrevious();
                    return false; // prevent default
                case base_1.Keys.down:
                    this.dropdown.selectNext();
                    return false; // prevent default
                case base_1.Keys.tab:
                    if (!!this.dropdown.selectedValue) {
                        this.select(this.dropdown.selectedValue);
                    }
                    else {
                        this.dropdown.selectNext();
                    }
                    return false; // prevent default (change focus)
                case base_1.Keys.esc:
                    this.start(); // Just restart the autocomplete
                    //event.stopPropagation(); // needed?
                    return false; // prevent default
                case base_1.Keys.enter:
                    if (!!this.dropdown.selectedValue) {
                        this.select(this.dropdown.selectedValue, true);
                        //event.stopPropagation(); // needed?
                        return false; // prevent default action (auto submit)
                    }
            }
        }
        // If a search was triggered, restart the autocomplete
        if (event.keyCode === base_1.Keys.enter) {
            this.submit.next();
            this.start();
        }
        return undefined;
    };
    __decorate([
        core_1.Input()
    ], Autocomplete.prototype, "dropdown");
    __decorate([
        core_1.Input()
    ], Autocomplete.prototype, "off");
    __decorate([
        core_1.Input()
    ], Autocomplete.prototype, "suggestDelay");
    __decorate([
        core_1.Input()
    ], Autocomplete.prototype, "suggestQuery");
    __decorate([
        core_1.Input()
    ], Autocomplete.prototype, "placeholder");
    __decorate([
        core_1.HostBinding('attr.placeholder')
    ], Autocomplete.prototype, "_placeholder");
    __decorate([
        core_1.Output()
    ], Autocomplete.prototype, "stateChange");
    __decorate([
        core_1.Output()
    ], Autocomplete.prototype, "submit");
    __decorate([
        core_1.HostListener("click")
    ], Autocomplete.prototype, "click");
    __decorate([
        core_1.HostListener("touchstart")
    ], Autocomplete.prototype, "touchstart");
    __decorate([
        core_1.HostListener("focus")
    ], Autocomplete.prototype, "focus");
    __decorate([
        core_1.HostListener("blur", ["$event"])
    ], Autocomplete.prototype, "blur");
    __decorate([
        core_1.HostListener("input", ["$event"])
    ], Autocomplete.prototype, "inputChanged");
    __decorate([
        core_1.HostListener("keydown", ["$event"])
    ], Autocomplete.prototype, "keydown");
    Autocomplete = __decorate([
        core_1.Directive({
            selector: "[sqAutocomplete]"
        })
    ], Autocomplete);
    return Autocomplete;
}());
exports.Autocomplete = Autocomplete;
