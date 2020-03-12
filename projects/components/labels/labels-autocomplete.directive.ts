import {Directive, ElementRef, Input} from "@angular/core";
import {Autocomplete, SuggestService, AutocompleteState} from '@sinequa/components/autocomplete';
import {AppService} from '@sinequa/core/app-utils';
import {UIService} from '@sinequa/components/utils';
import {LabelsWebService, Labels} from '@sinequa/core/web-services';

@Directive({
    selector: "[sqAutocompleteLabels]"
})
export class LabelsAutocomplete extends Autocomplete {
    // fieldSearch unused
    // excludedFields unused
    // suggestQuery unused
    // parse unused
    @Input() public: boolean; // Whether the labels are public or not

    constructor(
        elementRef: ElementRef,
        suggestService: SuggestService,
        appService: AppService,
        uiService: UIService,
        private labelsWebService: LabelsWebService){

        super(elementRef, suggestService, appService, uiService);
    }

    /**
     * The getSuggests() method from the original directive is overriden to 
     * use the labelsService rather than suggest service.
     */
    protected getSuggests(){

        let value = this.getInputValue();

        if(value) { // If there is text

            // parse
            let labels = value.split(";");

            // find label at caret location
            let position = this.getInputPosition();
            let length = 0;
            let val: { value: string, start : number, length: number } | undefined;
            for (let label of labels) {
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
                this.labelsWebService.list(val.value, this.public).subscribe(
                            
                    (labels: Labels) => {
                        if(this.getState() === AutocompleteState.ACTIVE || this.getState() === AutocompleteState.OPENED){
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
            
        }
        else {  // If empty input, restart autocomplete
            this.start();
        }

    }

}