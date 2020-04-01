import {Directive, Input, OnInit, ElementRef} from "@angular/core";
import {Autocomplete, SuggestService} from "@sinequa/components/autocomplete";
import {UIService} from "@sinequa/components/utils";
import {Control} from "./advanced-models";
import {AppService} from '@sinequa/core/app-utils';
import {SuggestFieldWebService} from '@sinequa/core/web-services';

export interface AdvancedFormAutocompleteOptions {
    autocompleteEnabled: boolean;
    suggestQuery: string;
    control: Control;
}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: "[sq-advanced-form-autocomplete]"
})
export class BsAdvancedFormAutocomplete extends Autocomplete implements OnInit {
    @Input("sq-advanced-form-autocomplete") afaOptions: AdvancedFormAutocompleteOptions;

    constructor(
        elementRef: ElementRef,
        suggestService: SuggestService,
        appService: AppService,
        uiService: UIService,
        private suggestFieldWebService: SuggestFieldWebService) {
        super(elementRef, suggestService, appService, uiService);
    }

    protected getSuggests() {
        const value = this.getInputValue();
        if(value) { // If there is text, make a call to the suggest API

            this.processSuggests(
                this.suggestFieldWebService.get(value, this.afaOptions.control.field), [this.afaOptions.control.field]
            );

        }
        else {  // If empty input, restart autocomplete
            this.start();
        }
    }
}