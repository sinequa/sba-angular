import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AdvancedService } from '@sinequa/components/advanced';

@Component({
  selector: 'app-advanced-form-select',
  templateUrl: './advanced-form-select.component.html'
})
export class AdvancedFormSelectComponent implements OnInit {

  form: UntypedFormGroup;

  code = `<sq-advanced-form-select
    [form]="form"
    [field]="'authors'">
</sq-advanced-form-select>`;

  code2 = `form: UntypedFormGroup;

ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('authors', this.advancedService.createSelectControl('authors'));
}`;

  constructor(private formBuilder: UntypedFormBuilder,
    private advancedService: AdvancedService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('authors', this.advancedService.createSelectControl('authors'));
  }

}
