import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvancedService } from '@sinequa/components/advanced';

@Component({
  selector: 'app-advanced-form-multi-input',
  templateUrl: './advanced-form-multi-input.component.html'
})
export class AdvancedFormMultiInputComponent implements OnInit {

  form: FormGroup;

  code = `<sq-advanced-form-multi-input
    [form]="form"
    [field]="'person'">
</sq-advanced-form-multi-input>`;

  code2 = `form: FormGroup;

ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('person',
        this.advancedService.createMultiInputControl('person'));
}`;

  constructor(private formBuilder: FormBuilder,
    private advancedService: AdvancedService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('person', this.advancedService.createMultiInputControl('person'));
  }

}
