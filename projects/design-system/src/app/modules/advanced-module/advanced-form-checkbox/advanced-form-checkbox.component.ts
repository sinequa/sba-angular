import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AdvancedService } from '@sinequa/components/advanced';

@Component({
  selector: 'app-advanced-form-checkbox',
  templateUrl: './advanced-form-checkbox.component.html'
})
export class AdvancedFormCheckboxComponent implements OnInit {

  form: UntypedFormGroup;

  code = `<sq-advanced-form-checkbox
    [form]="form"
    [field]="'enabled'">
</sq-advanced-form-checkbox>`;

code2 = `form: UntypedFormGroup;

ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('enabled',
        this.advancedService.createCheckboxControl('enabled', []));
}`;

  constructor(private formBuilder: UntypedFormBuilder,
    private advancedService: AdvancedService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('enabled', this.advancedService.createCheckboxControl('enabled', []));
  }

}
