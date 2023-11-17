import {
    Directive,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from "@angular/core";

import { AutocompleteItem } from "@sinequa/components/autocomplete";
import { Keys } from "@sinequa/core/base";

import { BsAdvancedFormAutocomplete } from "../advanced-form-autocomplete.directive";

@Directive({
    selector: "[sqAdvancedFormAutocompleteMultiInput]",
})
export class BsAdvancedFormAutocompleteMultiInput extends BsAdvancedFormAutocomplete {
    /** Event synchronizing the list of search terms in the parent component */
    @Output() itemsUpdate = new EventEmitter<AutocompleteItem[]>();

    /** Stores the selected search terms selected via Tab */
    @Input() items: AutocompleteItem[] = [];

    /**
     * The setAutocompleteItem() method from the original directive is overriden to
     * Sets the content of the <input> based on the given
     * Autocomplete Item.
     * @returns false since we don't need trigger search at this point of time
     */
    protected override setAutocompleteItem(item: AutocompleteItem): boolean {
        if (item) {
            // Store the autocomplete items that will be used to create a selection
            this.items.push(item);
            this.itemsUpdate.next(this.items);
            this.setInputValue("");
        }
        return false;
    }

    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove items, enhance the enter key to support adding new items.
     * @param event the keyboard
     */
    override keydown(event: KeyboardEvent) {
        const keydown = super.keydown(event);

        if (keydown === undefined) {
            /** We can remove selections by typing <backspace> when the input is empty */
            if (event.key === Keys.backspace) {
                if (this.getInputValue() === "") {
                    this.items.pop();
                    this.itemsUpdate.next(this.items);
                }
            }
            /** Allow the selection one of new item */
            if (event.key === Keys.enter) {
                this._manageSetAutocompleteItem();
            }
        }
        return keydown;
    }

    /**
     * Listens to blur events (out of focus) on the <input> host and overrides the parent blur events
     */
    @HostListener("blur", ["$event"]) override blur() {
        this._manageSetAutocompleteItem();
        this.init();
    }

    private _manageSetAutocompleteItem(): void {
        /** Always consider if there is text in the <input> and that it is not yet added in items  */
        if (!!this.getInputValue() && this.getInputValue() !== "") {
            this.setAutocompleteItem({
                display: this.getInputValue(),
                normalized: this.getInputValue(),
                category: "",
            });
        }
    }
}
