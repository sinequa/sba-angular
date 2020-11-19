import { Directive, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ValidationDirective } from "@sinequa/core/validation";
import {
    AdvancedSelect,
    AdvancedRange,
    AdvancedInput,
    AdvancedCheckbox,
} from "../advanced.service";

@Directive({
    selector: "[sq-advanced-form-validation]",
})
export class BsAdvancedFormValidation
    extends ValidationDirective
    implements OnInit {
    @Input("sq-advanced-form-validation") afvOptions: {
        form: FormGroup;
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox;
    };

    ngOnInit() {
        this.options = {
            form: this.afvOptions.form,
            controlName: this.afvOptions.config.name,
        };
        super.ngOnInit();
    }
}
