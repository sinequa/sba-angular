import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { AutocompleteItem } from '../autocomplete.directive';
import { FieldSearchItemsContainer } from '../autocomplete-field-search.directive';

@Component({
    selector: "sq-field-search-items",
    template: `
<span *ngFor="let item of items" class="badge badge-pill badge-info align-self-center mr-1" [ngClass]="item.category">
    {{item.display}} <span class="fas fa-times-circle clickable" (click)="removeItem(item)"></span>
</span>
`,
    styles: [`
:host {
    display: flex;
}
.clickable {
    cursor: pointer;
}
.clickable:hover {
    opacity: 85%;
}
`]
})
export class BsFieldSearchItemsComponent implements FieldSearchItemsContainer {
    @Output() itemRemoved = new EventEmitter<AutocompleteItem>();

    items: AutocompleteItem[] = [];

    constructor(protected changeDetectorRef: ChangeDetectorRef) {
    }

    update(items: AutocompleteItem[]): void {
        this.items = items;
        this.changeDetectorRef.markForCheck();
    }

    removeItem(item: AutocompleteItem) {
        this.itemRemoved.next(item);
        this.changeDetectorRef.markForCheck();
    }

}
