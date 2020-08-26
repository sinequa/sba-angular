import {Component, ElementRef, EventEmitter, Output} from "@angular/core";
import {Keys} from "@sinequa/core/base";
import { LabelsService } from '../../labels.service';
import { AutocompleteItem } from '@sinequa/components/autocomplete';


/**
 * Component containing a form, radio buttons and autocomplete to search
 * through the list labels according to a specific type (public/private) and select one(s) of them
 *
 * The component can be used as custom component in the Action
 * menu's modals.
 */

@Component({
    selector: "sq-labels-action-item",
    templateUrl: "./labels-action-item.html",
    styles: [`
        .sq-dropdown-form {
            min-width: 13rem;
        }
        .input-autocomplete{
            border: none;
            width: 100%;
        }
        .input-autocomplete:focus {
            outline: none;
        }
        .clickable {
            cursor: pointer;
        }
        .clickable:hover {
            opacity: 85%;
        }
        .disabled {
            cursor: not-allowed;
        }
    `]
})
export class BsLabelsActionItem {

    @Output() labelsUpdate = new EventEmitter<{values: string[], public: boolean}>();

    radioButtons: any[] = [];
    public: boolean;

    constructor(private elementRef: ElementRef, public labelsService: LabelsService) {

        if (!!this.labelsService.publicLabelsField && !!this.labelsService.privateLabelsField) {
            this.public = true;
            this.radioButtons = [
                {
                    id: "publicLabel",
                    name: "msg#labels.public",
                    value: true,
                    disabled: false,
                    checked: true
                },
                {
                    id: "privateLabel",
                    name: "msg#labels.private",
                    value: false,
                    disabled: false,
                    checked: false
                }
            ];
        } else if (!!this.labelsService.publicLabelsField) {
            this.public = true;
            this.radioButtons = [
                {
                    id: "publicLabel",
                    name: "msg#labels.public",
                    value: true,
                    disabled: true,
                    checked: true
                }
            ];
        } else {
            this.public = false;
            this.radioButtons = [
                {
                    id: "privateLabel",
                    name: "msg#labels.private",
                    value: false,
                    disabled: true,
                    checked: true
                }
            ];
        }
    }

    private getDropdownItem(): HTMLElement | null {
        if (this.elementRef) {
            let current: HTMLElement | null = this.elementRef.nativeElement as HTMLElement;
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

    updateLabelsNature(nature: boolean) {
        this.public = nature;
    }

    onLabelsItemsChanged(labelsItems: AutocompleteItem[]) {
        this.labelsUpdate.next({
            values: labelsItems.map((item => item.display)),
            public: this.public
        })
    }
}
