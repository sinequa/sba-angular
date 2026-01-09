import { Directive, Input, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { ValidationDirective } from "@sinequa/core/validation";

@Directive({
    selector: "[sqAdvancedFormValidation]",
    standalone: false
})
export class BsAdvancedFormValidation extends ValidationDirective implements OnInit {
    @Input() field: string;
    @Input() validationForm: UntypedFormGroup;
    
    override ngOnInit() {
        this.options = {
            form: this.validationForm,
            controlName: this.field,
        };
        super.ngOnInit();
    }
}
