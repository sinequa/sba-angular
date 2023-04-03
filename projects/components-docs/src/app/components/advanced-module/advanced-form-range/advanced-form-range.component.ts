import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvancedService } from '@sinequa/components/advanced';

@Component({
  selector: 'doc-advanced-form-range',
  templateUrl: './advanced-form-range.component.html'
})
export class DocAdvancedFormRangeComponent implements OnInit {

  form: FormGroup;

  code1 = `<sq-advanced-form-range
    [form]="form"
    [field]="'size'">
</sq-advanced-form-range>`;

  code2 = `form: FormGroup;

ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('size',
        this.advancedService.createRangeControl('size',
            [this.advancedService.validators.range('size')]
    ));
}`;

  constructor(private formBuilder: FormBuilder,
    private advancedService: AdvancedService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('size', this.advancedService.createRangeControl('size',
      [this.advancedService.validators.range('size')]
    ));
  }

}
