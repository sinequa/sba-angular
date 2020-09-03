import {Directive, ElementRef, Input, EventEmitter, SimpleChanges, Output} from "@angular/core";
import {Autocomplete, SuggestService, AutocompleteState, AutocompleteItem} from '@sinequa/components/autocomplete';
import {AppService} from '@sinequa/core/app-utils';
import {UIService} from '@sinequa/components/utils';
import {LabelsWebService, Labels} from '@sinequa/core/web-services';
import { Subscription } from 'rxjs';
import { Keys } from '@sinequa/core/base';
import { LabelsService } from './labels.service';

/**
 * Interface required to be implement by the component displaying
 * the labels items (basically the content of labelsItems)
 */
export interface LabelsItemsContainer {

    /** Update the list of items displayed by the container */
    update(items: AutocompleteItem[]): void;

    /** Event triggered when the user removes an item from the container */
    itemRemoved: EventEmitter<AutocompleteItem>;
}

@Directive({
    selector: "[sqAutocompleteLabels]"
})
export class LabelsAutocomplete extends Autocomplete {

    /** Event synchronizing the list of selected labels in the parent component */
    @Output() itemsUpdate = new EventEmitter<AutocompleteItem[]>();

    /** Container displaying the labelsItems */
    @Input() labelsItemsContainer?: LabelsItemsContainer;

    /** Whether the labels are public or not */
    @Input() public: boolean;

    /** Allow adding new labels in labelsItems or not */
    @Input() allowNewLabels: boolean = false;

    /** Stores the selected labels items selected via Tab */
    public readonly labelsItems: AutocompleteItem[] = [];

    constructor(
        elementRef: ElementRef,
        suggestService: SuggestService,
        appService: AppService,
        uiService: UIService,
        private labelsWebService: LabelsWebService,
        private labelsService: LabelsService){

        super(elementRef, suggestService, appService, uiService);
    }

    /**
     * If the off input changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges){
        super.ngOnChanges(changes);

        // Subscribe to the labels items's container
        if(changes["labelsItemsContainer"] && this.labelsItemsContainer) {
            if(this._labelsSubscription){
                this._labelsSubscription.unsubscribe();
            }
            this._labelsSubscription = this.labelsItemsContainer.itemRemoved.subscribe(item => {
                this.labelsItems.splice(this.labelsItems.indexOf(item), 1);
                this.updatePlaceholder();
                this.submit.next();
            });
        }

        // If labels category changes, we must remove the selected labels items
        if(changes["public"] && this.labelsItems.length > 0) {
            this.setState(AutocompleteState.START);
            this.labelsItems.splice(0);
            this.setInputValue("");
        }

        this.updatePlaceholder();
        this.labelsItemsContainer?.update(this.labelsItems);
        this.itemsUpdate.next(this.labelsItems);
    }

    private _labelsSubscription: Subscription;
    /**
     * Unsubscribe when destroying the component
     */
    ngOnDestroy(){
        super.ngOnDestroy();
        if(this._labelsSubscription){
            this._labelsSubscription.unsubscribe();
        }
    }

    /**
     * The getSuggests() method from the original directive is overriden to
     * use the labelsService rather than suggest service.
     */
    protected getSuggests(){

        const value = this.getInputValue();

        if(value) { // If there is text

            // parse
            const labels = value.split(";");

            // find label at caret location
            const position = this.getInputPosition();
            let length = 0;
            let val: { value: string, start : number, length: number } | undefined;
            for (const label of labels) {
                if (position >= length && position <= length + label.length) {
                    val = {
                        value: label,
                        start: length,
                        length: label.length
                    };
                    break;
                }
                length += label.length + 1;
            }

            // Get suggestions from web service
            if(val) {
                this._getLabelsSuggestions(val.value);
            }
        }
        else {
            this.start();
        }
    }

    private _getLabelsSuggestions(val: string) {
        this.labelsWebService.list(val, this.public).subscribe(
            (labels: Labels) => {
                if(this.getState() === AutocompleteState.ACTIVE || this.getState() === AutocompleteState.OPENED){
                    labels.labels = labels.labels.filter(label => !this.labelsItems.find(item => (item.display === label) )) /** Eliminate suggestions that are already selected */
                    this.dropdown.update(true, labels.labels.map(label => {
                        return {
                            display: label,
                            category: ""
                        };
                    }));
                }
            },
            err => {
                this.dropdown.update(false);
            },
            () => {
                if(this.dropdown.hasItems && this.getState() === AutocompleteState.ACTIVE){
                    this.open();    // Switch from ACTIVE to OPENED (if not already)
                }
                else if(!this.dropdown.hasItems && this.getState() === AutocompleteState.OPENED){   // No data
                    this.active();  // Switch from OPENED to ACTIVE (if not already)
                }
            }
        );
    }

    /**
     * The start() method from the original directive is overriden
     * If empty input :
     * - display top relevent labels if the auto-suggest wildcard is configured
     * - restart the autocomplete if no auto-suggest wildcard is found
     */
    protected start() {
        if (!!this.labelsService.labelsAutoSuggestWildcard) {
            this.setState(AutocompleteState.OPENED);
            this._getLabelsSuggestions(this.labelsService.labelsAutoSuggestWildcard);
        } else {
            this.setState(AutocompleteState.START);
            this.dropdown.update(false);
        }
    }

    /**
     * The setAutocompleteItem() method from the original directive is overriden to
     * Sets the content of the <input> based on the given
     * Autocomplete Item.
     * @returns false since labels items don't need to be searched
     */
    protected setAutocompleteItem(item: AutocompleteItem): boolean {
        if(item) {
            // Store the autocomplete items that will be used to create a selection
            this.labelsItems.push(item);
            this.updatePlaceholder();
            this.labelsItemsContainer?.update(this.labelsItems);
            this.itemsUpdate.next(this.labelsItems);
            this.setInputValue("");
        }
        return false;
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

        if(keydown === undefined) {
            //We can remove selections by typing <backspace> when the input is empty
            if(event.keyCode === Keys.backspace) {
                if( this.getInputValue() === '') {
                    this.labelsItems.pop();
                    this.updatePlaceholder();
                    this.labelsItemsContainer?.update(this.labelsItems);
                    this.itemsUpdate.next(this.labelsItems);
                }
            }
            /** Allow the selection on of new labels that not exists in the list */
            if(event.keyCode === Keys.enter && this.allowNewLabels) {
                if (!this.public || (this.public && this.labelsService.allowPublicLabelsModification && this.labelsService.userLabelsRights && this.labelsService.userLabelsRights.canModifyPublicLabels)) {
                    this.setAutocompleteItem({
                        display: this.getInputValue(),
                        category: ""
                    })
                }
            }
        }
        return keydown;
    }

    /**
     * Updates the <input>'s placeholder to avoid displaying something
     * when there are labelsItems displayed to the left.
     */
    updatePlaceholder() {
        this._placeholder = this.labelsItems.length > 0 ? '' : this.placeholder;
    }
}
