import {
    Directive,
    ElementRef,
    Input,
    EventEmitter,
    SimpleChanges,
    Output,
    HostListener,
    OnInit,
    OnChanges,
} from "@angular/core";
import {
    Autocomplete,
    SuggestService,
    AutocompleteState,
    AutocompleteItem,
} from "@sinequa/components/autocomplete";
import { AppService } from "@sinequa/core/app-utils";
import { UIService } from "@sinequa/components/utils";
import { LabelsWebService, Labels } from "@sinequa/core/web-services";
import { Keys } from "@sinequa/core/base";
import { LabelsService } from "./labels.service";

@Directive({
    selector: "[sqAutocompleteLabels]",
})
export class LabelsAutocomplete extends Autocomplete implements OnInit, OnChanges {
    /** Event synchronizing the list of selected labels in the parent component */
    @Output() itemsUpdate = new EventEmitter<AutocompleteItem[]>();

    /** Whether the labels are public or not */
    @Input() public: boolean;

    /** Enable adding new labels in labelsItems or not */
    @Input() allowNewLabels: boolean = false;

    /** Define the right of adding new labels in labelsItems or not */
    @Input() allowManagePublicLabels: boolean = false;

    /** Stores the selected labels items selected via Tab */
    @Input() labelsItems: AutocompleteItem[] = [];

    /** Stores the suggestions retrieved by th server in order to perform checks on key.enter events */
    private _suggestions: string[] = [];

    constructor(
        elementRef: ElementRef,
        suggestService: SuggestService,
        appService: AppService,
        uiService: UIService,
        private labelsWebService: LabelsWebService,
        private labelsService: LabelsService
    ) {
        super(elementRef, suggestService, appService, uiService);
    }

    /**
     * The ngOnInit() method from the original directive is overriden
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit() {
        this._dropdownSubscription = this.dropdown.clicked.subscribe((item) => {
            this.select(item, true); // An item was selected from the autocomplete => take the value
        });
        this.start();
    }

    /**
     * If the inputs changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes["labelsItems"]) {
            this.updatePlaceholder();
        }

        // Override start() by using init() instead, so that no double queries are generated and autocomplete dropdown is shown only on focus
        if (changes["off"] && !this.off) {
            this.init();
        }

        // If labels category changes, we must remove the selected labels items and reinitialize the autocomplete
        if (changes["public"] && !changes["public"].firstChange) {
            const newInitLabels = [...changes["labelsItems"].currentValue];
            this.inputElement.blur();
            /** Reset the input Value*/
            this.setInputValue("");
            /** initialize the input needed specially for labels edit cases */
            this.updatePlaceholder();
            this.itemsUpdate.next(newInitLabels);
        }
    }

    /**
     * The getSuggests() method from the original directive is overriden to
     * use the labelsService rather than suggest service.
     */
    protected getSuggests() {
        const value = this.getInputValue();

        if (value) {
            // parse
            const labels = value.split(";");

            // find label at caret location
            const position = this.getInputPosition();
            let length = 0;
            let val:
                | { value: string, start: number, length: number }
                | undefined;
            for (const label of labels) {
                if (position >= length && position <= length + label.length) {
                    val = {
                        value: label,
                        start: length,
                        length: label.length,
                    };
                    break;
                }
                length += label.length + 1;
            }

            // Get suggestions from web service
            if (val) {
                this._getLabelsSuggestions(val.value);
            }
        } else {
            if (!!this.labelsService.labelsAutoSuggestWildcard) {
                this._getLabelsSuggestions(
                    this.labelsService.labelsAutoSuggestWildcard
                );
            } else {
                this.start();
            }
        }
    }

    private _getLabelsSuggestions(val: string) {
        this.labelsWebService.list(val, this.public).subscribe(
            (labels: Labels) => {
                if (
                    this.getState() === AutocompleteState.ACTIVE ||
                    this.getState() === AutocompleteState.OPENED
                ) {
                    /** Eliminate suggestions that are already selected */
                    labels.labels = labels.labels.filter(
                        (label) =>
                            !this.labelsItems.find(
                                (item) => item.display === label
                            )
                    );

                    /** update the local list of suggestions */
                    this._suggestions = labels.labels;

                    /** limit the suggestions to be displayed to 10  */
                    labels.labels = labels.labels.slice(0, 10);

                    this.dropdown.update(
                        true,
                        labels.labels.map((label) => {
                            return {
                                display: label,
                                category: "",
                            };
                        })
                    );
                }
            },
            () => {
                this.dropdown.update(false);
            },
            () => {
                if (
                    this.dropdown.hasItems &&
                    this.getState() === AutocompleteState.ACTIVE
                ) {
                    this.open(); // Switch from ACTIVE to OPENED (if not already)
                } else if (
                    !this.dropdown.hasItems &&
                    this.getState() === AutocompleteState.OPENED
                ) {
                    // No data
                    this.active(); // Switch from OPENED to ACTIVE (if not already)
                }
            }
        );
    }

    /**
     * The setAutocompleteItem() method from the original directive is overriden to
     * Sets the content of the <input> based on the given
     * Autocomplete Item.
     * @returns false since labels items don't need to be searched
     */
    protected setAutocompleteItem(item: AutocompleteItem): boolean {
        if (item) {
            // Store the autocomplete items that will be used to create a selection
            this.labelsItems.push(item);
            this.updatePlaceholder();
            this.itemsUpdate.next(this.labelsItems);
            this.setInputValue("");
        }
        return false;
    }

    /**
     * The startOrActive() method from the original directive is overriden to
     * immediately switch to ACTIVE if it is not the case
     */
    protected startOrActive(): void {
        if (
            this.getState() !== AutocompleteState.ACTIVE &&
            this.getState() !== AutocompleteState.OPENED
        ) {
            // Avoid flickering
            this.start();
            this.active();
        }
    }

    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove labels items, enhance the enter key to support adding new labels.
     * @param event the keyboard
     */
    keydown(event: KeyboardEvent) {
        const keydown = super.keydown(event);

        if (keydown === undefined) {
            //We can remove selections by typing <backspace> when the input is empty
            if (event.keyCode === Keys.backspace) {
                if (this.getInputValue() === "") {
                    this.labelsItems.pop();
                    this.updatePlaceholder();
                    this.itemsUpdate.next(this.labelsItems);
                }
            }
            /** Allow the selection one of new labels that not exists in the list */
            if (event.keyCode === Keys.enter) {
                this._manageSetAutocompleteItem();
            }
        }
        return keydown;
    }

    /**
     * Listens to focus events on the <input> host and overrides the parent focus events in order to launch the autocomplete
     * If empty input :
     * - display top relevent labels if the auto-suggest wildcard is configured
     * - restart the autocomplete if no auto-suggest wildcard is found
     * If not empty input :
     * retrieve suggestions based on this input text
     */
    @HostListener("focus") focus() {
        this.start();
        this.active();
    }

    /**
     * Listens to blur events (out of focus) on the <input> host and overrides the parent blur events
     */
    @HostListener("blur", ["$event"]) blur(event: FocusEvent) {
        this._manageSetAutocompleteItem();
        this.init();
    }

    /**
     * Overrides the parent inputChanged method, so that it is possible to reinitialize the autocomplete
     * @param event
     */
    @HostListener("input", ["$event"]) inputChanged(event: Event) {
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
                this.active();
                break;
            case AutocompleteState.INIT:
                break;
        }
    }

    /**
     * Updates the <input>'s placeholder to avoid displaying something
     * when there are labelsItems displayed to the left.
     */
    updatePlaceholder() {
        this._placeholder = this.labelsItems.length > 0 ? "" : this.placeholder;
    }

    private _manageSetAutocompleteItem(): void {
        /** Always consider if there is text in the <input> and that it is not yet added in the labelsItems  */
        if (!!this.getInputValue() && this.getInputValue() !== "") {
            if (this.allowNewLabels) {
                /** When it is an add Labels action ==> check the privilege to create new label */
                if (
                    !this.public ||
                    (this.public && this.allowManagePublicLabels)
                ) {
                    this.setAutocompleteItem({
                        display: this.getInputValue(),
                        category: "",
                    });
                }
            } else {
                /** For all other actions on the labels, check if the typed text equals an existing label in the _suggestions  */
                if (this._suggestions.indexOf(this.getInputValue()) > -1) {
                    this.setAutocompleteItem({
                        display: this.getInputValue(),
                        category: "",
                    });
                }
            }
        }
    }
}
