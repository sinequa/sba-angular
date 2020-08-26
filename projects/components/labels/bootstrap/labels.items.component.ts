import {
    Component,
    EventEmitter,
    Output,
    ChangeDetectorRef,
} from "@angular/core";
import { AutocompleteItem } from '@sinequa/components/autocomplete';
import { LabelsItemsContainer } from '../labels-autocomplete.directive';

@Component({
    selector: "sq-labels-items",
    template: `
        <span
            *ngFor="let item of items"
            class="badge badge-pill badge-info clickable align-self-center mr-1">
            {{ item.display }}
            <span class="fas fa-times clickable" (click)="removeItem(item)"></span>
        </span>
    `,
    styles: [
        `
            :host {
                display: flex;
            }
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
    ],
})
export class BsLabelsItemsComponent implements LabelsItemsContainer {
    @Output() itemRemoved = new EventEmitter<AutocompleteItem>();
    items: AutocompleteItem[] = [];

    constructor(protected changeDetectorRef: ChangeDetectorRef) {}

    update(items: AutocompleteItem[]): void {
        this.items = items;
        this.changeDetectorRef.markForCheck();
    }

    removeItem(item: AutocompleteItem) {
        this.itemRemoved.next(item);
        this.changeDetectorRef.markForCheck();
    }

}
