import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    Input,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { Keys } from "@sinequa/core/base";
import { AutocompleteItem } from "@sinequa/components/autocomplete";
import { Subject } from "rxjs";

/**
 * Component containing a form and autocomplete to search
 * through the list labels according to a specific type (public/private) and select one(s) of them
 *
 * The component can be used as custom component in the Action
 * menu's modals.
 */

@Component({
    selector: "sq-labels-autocomplete",
    templateUrl: "./labels-autocomplete.component.html",
    styles: [
        `
            .sq-dropdown-form {
                min-width: 13rem;
                display: inline;
            }
            .disabled {
                cursor: not-allowed;
            }
            :host ::ng-deep .sq-autocomplete-list {
                width: 50% !important;
            }
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
            .label-public {
                background-color: #4fc3f7;
                margin: 2px;
            }
            .label-private {
                background-color: #7283a7;
                margin: 2px;
            }

            :host div {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                height: unset !important;
            }
            :host input {
                border: none;
                flex-grow: 1;
                flex-basis: 100px;
                min-width: 100px;
            }
            :host input:focus {
                outline: none;
            }
        `,
    ],
})
export class BsLabelsAutocompleteComponent implements OnChanges {
    /** Event synchronizing the list of selected labels and label's type in the parent component */
    @Output() labelsUpdate = new EventEmitter<string[]>();

    @Input() public: boolean; /** Whether labels are public/private */
    @Input() disableAutocomplete: boolean = false /** Whether the autocomplete input is disabled or not */;
    @Input() allowNewLabels: boolean; /** Whether enable adding new labels or not */
    @Input() allowManagePublicLabels: boolean; /** Define the right of adding new labels */
    @Input() initLabels: string[]; /** Initial labels to be displayed in the labelsAutocomplete input*/

    itemRemoved$ = new Subject<AutocompleteItem>(); /** Subject firing each delete of an AutocompleteItem from the list */
    items: AutocompleteItem[] = []; /** List of assigned labels to selected record(s) */

    constructor(private elementRef: ElementRef) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.public) {
            this.public = changes.public.currentValue;
        }
        if (changes.initLabels) {
            this.initLabels = changes.initLabels.currentValue;
        }
    }

    removeItem(item: AutocompleteItem) {
        this.itemRemoved$.next(item);
    }

    onLabelsItemsChanged(labelsItems: AutocompleteItem[]) {
        this.items = labelsItems;
        this.labelsUpdate.next(labelsItems.map((item) => item.display));
    }

    private getDropdownItem(): HTMLElement | null {
        if (this.elementRef) {
            let current: HTMLElement | null = this.elementRef
                .nativeElement as HTMLElement;
            while (current && !current.classList.contains("dropdown-item")) {
                current = current.parentElement;
            }
            return current;
        }
        return null;
    }

    keydown(event: KeyboardEvent) {
        // Intercept tab and set focus to surrounding dropdown-item
        if (event.keyCode === Keys.tab) {
            const dropdownItem = this.getDropdownItem();
            if (dropdownItem) {
                dropdownItem.focus();
                event.preventDefault();
                return false;
            }
        }
        return undefined;
    }

    keypress(event: KeyboardEvent) {
        if (event.keyCode === Keys.enter) {
            // Stop click event firing on surrounding anchor (Firefox)
            event.preventDefault();
            return false;
        }
        return undefined;
    }
}
