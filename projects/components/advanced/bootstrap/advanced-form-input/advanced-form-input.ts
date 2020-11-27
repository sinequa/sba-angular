import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AppService } from "@sinequa/core/app-utils";
import { AdvancedInput } from '../../advanced.service';

@Component({
    selector: "sq-advanced-form-input",
    templateUrl: "./advanced-form-input.html",
    styles: [
        `
            .input-autocomplete {
                display: flex;
                flex-direction: column;
            }
        `,
    ],
})
export class BsAdvancedFormInput implements OnInit {
    @Input() form: FormGroup;
    @Input() config: AdvancedInput;
    @Input() autocompleteEnabled: boolean = true;
    @Input() suggestQuery: string;

    name: string;
    label: string;

    constructor(public appService: AppService) {}

    ngOnInit() {
        this.name = this.config.name;
        this.label = this.config.label;
    }
}
