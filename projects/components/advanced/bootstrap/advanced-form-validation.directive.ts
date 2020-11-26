import { Directive, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ValidationDirective } from "@sinequa/core/validation";
import {
    AdvancedSelect,
    AdvancedRange,
    AdvancedInput,
    AdvancedCheckbox,
    BasicAdvancedConfig,
} from "../advanced.service";

@Directive({
    selector: "[sqAdvancedFormValidation]",
})
export class BsAdvancedFormValidation extends ValidationDirective implements OnInit {
    @Input() config:
        | BasicAdvancedConfig
        | AdvancedSelect
        | AdvancedRange
        | AdvancedInput
        | AdvancedCheckbox;
    @Input() validationForm: FormGroup;
    ngOnInit() {
        this.options = {
            form: this.validationForm,
            controlName: this.config.name,
        };
        super.ngOnInit();
    }
}
