import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AdvancedService } from '@sinequa/components/advanced';

@Component({
  selector: 'app-advanced-form-input',
  templateUrl: './advanced-form-input.component.html'
})
export class AdvancedFormInputComponent implements OnInit {

  form: UntypedFormGroup;

  code = `<sq-advanced-form-input
    [form]="form"
    [field]="'title'">
</sq-advanced-form-input>`;

  code2 = `form: UntypedFormGroup;

ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addsControl('title',
        this.advancedService.createInputControl('title'));
}`;

  constructor(private formBuilder: UntypedFormBuilder,
    private advancedService: AdvancedService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('title', this.advancedService.createInputControl('title'));
  }

}
