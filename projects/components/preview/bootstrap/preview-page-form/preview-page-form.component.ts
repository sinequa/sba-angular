import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { ValidationService } from "@sinequa/core/validation";

@Component({
    selector: 'sq-preview-page-form',
    templateUrl: './preview-page-form.component.html'
})
export class BsPreviewPageFormComponent implements OnChanges{
    @Input() pageNumber?: number;
    @Output() gotopage = new EventEmitter<number>();

    form: UntypedFormGroup;
    pageControl: UntypedFormControl;

    constructor(
        formBuilder: UntypedFormBuilder,
        validationService: ValidationService
    ) {
        this.pageControl = new UntypedFormControl('', [validationService.integerValidator(), validationService.minValidator(1)]);
        this.form = formBuilder.group({
          page: this.pageControl
        });
    }

    ngOnChanges() {
        this.pageControl.setValue(this.pageNumber);
    }

    submit() {
        const page = parseInt(this.pageControl.value, 10);
        if(!isNaN(page) && page !== this.pageNumber) {
            // remember the page number submitted
            // this allow us to submit again the previous page 
            // when page not exists and/or an error is triggered
            this.pageNumber = page;
            this.gotopage.next(page);
        }
    }

}