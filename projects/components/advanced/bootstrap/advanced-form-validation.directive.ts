import { Directive, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ValidationDirective } from "@sinequa/core/validation";

@Directive({
    selector: "[sqAdvancedFormValidation]",
})
export class BsAdvancedFormValidation extends ValidationDirective implements OnInit {
    @Input() field: string;
    @Input() validationForm: FormGroup;
    
    ngOnInit() {
        this.options = {
            form: this.validationForm,
            controlName: this.field,
        };
        super.ngOnInit();
    }
}
