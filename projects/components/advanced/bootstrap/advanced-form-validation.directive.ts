import { Directive, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Utils, MapOf } from "@sinequa/core/base";
import { ValidationDirective } from "@sinequa/core/validation";
import {
    AdvancedSelect,
    AdvancedRange,
    AdvancedInput,
    AdvancedCheckbox,
} from "../advanced-form.service";

@Directive({
    selector: "[sq-advanced-form-validation]",
})
export class BsAdvancedFormValidation
    extends ValidationDirective
    implements OnInit {
    @Input("sq-advanced-form-validation") afvOptions: {
        form: FormGroup;
        config:
            AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
            | any;
    };

    ngOnInit() {
        const config = this.afvOptions.config;
        const controlName = config.name || config.field;
        const errorMessages: MapOf<string> = {};
        if (this.afvOptions.config.validators) {
            for (const validator of config.validators) {
                if (validator.active && !!validator.errorMessage) {
                    errorMessages[
                        validator.name || Utils.toLowerCase(validator.type)
                    ] = validator.errorMessage;
                }
            }
        }
        this.options = {
            form: this.afvOptions.form,
            controlName: controlName,
            errorMessages: errorMessages,
        };
        super.ngOnInit();
    }
}
