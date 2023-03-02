import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvancedService } from '@sinequa/components/advanced';

@Component({
  selector: 'doc-advanced-form-input',
  templateUrl: './advanced-form-input.component.html'
})
export class DocAdvancedFormInputComponent implements OnInit {

  form: FormGroup;

  code = `<sq-advanced-form-input
    [form]="form"
    [field]="'title'">
</sq-advanced-form-input>`;

  code2 = `form: FormGroup;

ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addsControl('title',
        this.advancedService.createInputControl('title'));
}`;

  constructor(private formBuilder: FormBuilder,
    private advancedService: AdvancedService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('title', this.advancedService.createInputControl('title'));
  }

}
