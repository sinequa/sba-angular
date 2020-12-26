import { Directive, Input, ElementRef } from "@angular/core";
import { Autocomplete, SuggestService } from "@sinequa/components/autocomplete";
import { UIService } from "@sinequa/components/utils";
import { AppService } from "@sinequa/core/app-utils";

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: "[sqAdvancedFormAutocomplete]",
})
export class BsAdvancedFormAutocomplete extends Autocomplete {
    @Input() field : string;

    constructor(
        elementRef: ElementRef,
        suggestService: SuggestService,
        appService: AppService,
        uiService: UIService
    ) {
        super(elementRef, suggestService, appService, uiService);
    }

    /**
     * The ngOnInit() method from the original directive is overriden
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit() {
        this._dropdownSubscription = this.dropdown.clicked.subscribe((item) => {
            this.select(item, false); // An item was selected from the autocomplete => take the value
        });
        this.start();
    }

    protected getSuggests() {
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
}
