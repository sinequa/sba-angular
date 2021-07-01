import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ValidationService } from "@sinequa/core/validation";

@Component({
    selector: 'sq-preview-page-form',
    templateUrl: './preview-page-form.component.html'
})
export class BsPreviewPageFormComponent implements OnChanges{
    @Input() pageNumber?: number;
    @Output() gotopage = new EventEmitter<number>();

    form: FormGroup;
    pageControl: FormControl;

    constructor(
        formBuilder: FormBuilder,
        validationService: ValidationService
    ) {
        this.pageControl = new FormControl('', [validationService.integerValidator(), validationService.minValidator(1)]);
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