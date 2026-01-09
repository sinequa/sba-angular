import { Observable } from 'rxjs';

import { Directive, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";

import { Autocomplete, AutocompleteItem, AutocompleteState } from "@sinequa/components/autocomplete";

@Directive({
    selector: "[sqAdvancedFormAutocomplete]",
    standalone: false
})
export class BsAdvancedFormAutocomplete extends Autocomplete implements OnInit {
    @Output() UpdateItem = new EventEmitter<AutocompleteItem | undefined>();
    @Input() field: string;

    /**
     * The ngOnInit() method from the original directive is overridden
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    override ngOnInit() {
        this._dropdownSubscription = this.dropdown.clicked.subscribe((item) => {
            this.select(item, false); // An item was selected from the autocomplete => take the value
        });
        this.start();
    }

    protected override getSuggests() {
        const value = this.getInputValue();
        if (value) {
            // If there is text, make a call to the suggest API
            this.processSuggests(
                this.getSuggestsObs(value, [this.field])
            );
        } else {
            // If empty input, restart autocomplete
            this.start();
        }
    }

    protected override processSuggests(obs: Observable<AutocompleteItem[]>){
        obs.subscribe(
            suggests => {
                if(this.getState() === AutocompleteState.ACTIVE || this.getState() === AutocompleteState.OPENED){
                    this.dropdown.update(true, suggests
                        .filter(item => item.category !== "$field$")  // Filter out fields
                        .map(item => {
                            if(!item.label){
                                item.label = this.appService.getLabel(item.category);
                            }
                            if (!item.normalized) {
                                item.normalized = item.display;
                            }
                            return item;
                        }));
                }
            },
            () => {
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

    protected override setAutocompleteItem(item: AutocompleteItem): boolean {
        if(item) {
            this.setInputValue(item.display);
            this.UpdateItem.next({
                ...item,
                normalized: item.normalized ? item.normalized : item.display
            });
            return true;
        }
        return false;
    }

    /**
     * Listen to blur events on the <input> host and overrides the autocomplete blur events
     */
    @HostListener("blur", ["$event"]) override blur(event: FocusEvent) {
        /** If there is text in the <input/> and not selected from the dropdown ==> set the item manually */
        if (this.getState() !== AutocompleteState.SELECTED) {
            if (!!this.getInputValue() && this.getInputValue() !== "") {
                const item = {
                    display: this.getInputValue(),
                    normalized: this.getInputValue(),
                    category: "",
                }
                this.setAutocompleteItem(item);
            } else {
                this.UpdateItem.next(undefined);
            }
        }
        this.init();
    }

    /**
     * Overrides the parent inputChanged method, so that it is possible to reinitialize the autocomplete
     * @param event
     */
    @HostListener("input", ["$event"]) override inputChanged(event: Event) {
        // If there is text in the <input/> and not selected from the dropdown ==> set the item manually
        if (!!this.getInputValue() && this.getInputValue() !== "") {
            const item = {
                display: this.getInputValue(),
                normalized: this.getInputValue(),
                category: "",
            }
            this.UpdateItem.next(item);
        } else {
            this.UpdateItem.next(undefined);
        }

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
}
