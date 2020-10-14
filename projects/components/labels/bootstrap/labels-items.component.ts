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
    template: ``
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
