import { Component, Input, OnChanges } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { AppService } from '@sinequa/core/app-utils';

@Component({
    selector: "sq-advanced-form-checkbox",
    templateUrl: "./advanced-form-checkbox.html",
})
export class BsAdvancedFormCheckbox implements OnChanges {
    @Input() form: UntypedFormGroup;
    @Input() field: string;
    @Input() label: string;

    constructor(public appService: AppService) {}

    ngOnChanges() {
        if(this.label === undefined) {
            this.label = this.appService.getLabel(this.field);
        }
    }
}
