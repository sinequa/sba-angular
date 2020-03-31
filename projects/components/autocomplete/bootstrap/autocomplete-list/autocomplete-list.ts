import {Output, ContentChild, TemplateRef, Component, EventEmitter, ChangeDetectorRef} from "@angular/core";
import {AutocompleteItem, AutocompleteComponent} from "../../autocomplete.directive";

@Component({
    selector: "sq-autocomplete-list",
    templateUrl: "./autocomplete-list.html",
    styleUrls: ["./autocomplete-list.css"]
})
export class BsAutocompleteList implements AutocompleteComponent {

    /**
     * Template for the display of AutocompleteItem items, passed by transclusion
     */
    @ContentChild("itemTpl", {static: false}) itemTpl: TemplateRef<any>;

    /**
     * Optional footer template, passed by transclusion
     */
    @ContentChild("footerTpl", {static: false}) footerTpl: TemplateRef<any>;

    /**
     * Event emitter for clicks on an autocomplete item
     */
    @Output() clicked = new EventEmitter<AutocompleteItem>();

    _active: boolean = false;
    _items: AutocompleteItem[] | undefined;

    _cursor: number = -1;


    constructor(
        private changeDetectorRef: ChangeDetectorRef){
    }


    /**
     * Update the data and state of this component
     * @param active whether the component should be displayed
     * @param items The list of items to display
     */
    public update(active: boolean, items?: AutocompleteItem[]){
        //console.log("autocomplete update ", active, items);
        this._active = active;
        this._items = items;
        this._cursor = -1;

        this.changeDetectorRef.markForCheck();
    }

    /**
     * Whether there are any item to display
     */
    public get hasItems(): boolean {
        return this._active && !!this._items && this._items.length > 0;
    }

    /**
     * Returns the currently selected item, if any
     */
    public get selectedValue(): AutocompleteItem | undefined {
        if(this._items && this._cursor >= 0 && this._cursor < this._items.length)
            return this._items[this._cursor];
        return undefined;
    }

    /**
     * Select the next item in the list and returns it
     */
    public selectNext(): AutocompleteItem | undefined {
        if (this._items && this._cursor < this._items.length-1) {
            this._cursor++;
        }
        return this.selectedValue;
    }

    /**
     * Select the previous item in the list and returns it
     */
    public selectPrevious(): AutocompleteItem | undefined {
        if(this._cursor > 0)
            this._cursor--;
        return this.selectedValue;
    }

    /**
     * Test whether an item is selected
     * @param item
     * @param i
     */
    _isSelected(item: AutocompleteItem, i: number): boolean {
        return this._cursor === i;
    }

    /**
     * Listen to click events and emits events
     * @param item
     * @param event
     */
    _itemClicked(item: AutocompleteItem, event){
        this.clicked.next(item);
        event.stopPropagation();
        return false;
    }

    /**
     * This prevents the focus to be removed from the <input>, which clauses the dropdown
     */
    _mouseDown(event){
        event.preventDefault();
    }

}