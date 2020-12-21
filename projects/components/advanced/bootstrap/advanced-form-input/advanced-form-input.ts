import { Component, Input, OnChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AppService } from "@sinequa/core/app-utils";

@Component({
    selector: "sq-advanced-form-input",
    templateUrl: "./advanced-form-input.html"
})
export class BsAdvancedFormInput implements OnChanges {
    @Input() form: FormGroup;
    @Input() field: string;
    @Input() suggestQuery: string;
    @Input() label: string;

    constructor(public appService: AppService) {}

    ngOnChanges() {
        if(this.label === undefined) {
            this.label = this.appService.getLabel(this.field);
        }
    }
}
