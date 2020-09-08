import {
    Component,
    EventEmitter,
    Output,
    ChangeDetectorRef,
    Input,
} from "@angular/core";
import { AutocompleteItem } from '@sinequa/components/autocomplete';
import { LabelsItemsContainer } from '../labels-autocomplete.directive';

@Component({
    selector: "sq-labels-items",
    template: `
        <span
            *ngFor="let item of items"
            class="badge badge-pill badge-info align-self-center mr-1 d-inline"
            [ngClass]="{'label-public': public, 'label-private': !public}">
            {{ item.display }}
            <span class="fas fa-times-circle clickable" (click)="removeItem(item)"></span>
        </span>
    `,
    styles: [
        `
            :host {
                display: inline;
            }
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
            .label-public {
                background-color: #4fc3f7;
            }
            .label-private {
                background-color: #7283a7;
            }
        `
    ]
})
export class BsLabelsItemsComponent implements LabelsItemsContainer {

    @Input() public: boolean;
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
