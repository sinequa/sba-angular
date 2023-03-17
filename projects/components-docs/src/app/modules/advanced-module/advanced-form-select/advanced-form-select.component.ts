import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvancedService } from '@sinequa/components/advanced';

@Component({
  selector: 'doc-advanced-form-select',
  templateUrl: './advanced-form-select.component.html'
})
export class DocAdvancedFormSelectComponent implements OnInit {

  form: FormGroup;

  code = `<sq-advanced-form-select
    [form]="form"
    [field]="'authors'">
</sq-advanced-form-select>`;

  code2 = `form: FormGroup;

ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('authors', this.advancedService.createSelectControl('authors'));
}`;

  constructor(private formBuilder: FormBuilder,
    private advancedService: AdvancedService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('authors', this.advancedService.createSelectControl('authors'));
  }

}
