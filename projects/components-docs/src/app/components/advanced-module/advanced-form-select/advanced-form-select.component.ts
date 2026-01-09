import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvancedService } from '@sinequa/components/advanced';
import { FirstPageService } from '@sinequa/components/search';
import { environment } from 'src/environments/environment';
import { RESULTS } from 'src/mocks/data/results';

@Component({
    selector: 'doc-advanced-form-select',
    templateUrl: './advanced-form-select.component.html',
    standalone: false
})
export class DocAdvancedFormSelectComponent implements OnInit {

  form: FormGroup;

  code1 = `<sq-advanced-form-select
    [form]="form"
    [field]="'company'">
</sq-advanced-form-select>`;

  code2 = `form: FormGroup;

ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('company', this.advancedService.createSelectControl('company'));
}`;

  constructor(private formBuilder: FormBuilder,
    private advancedService: AdvancedService,
    private firstPageService: FirstPageService) {
      if (environment.mock) {
        this.firstPageService.firstPage = RESULTS as any;
      }
    }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.form.addControl('company', this.advancedService.createSelectControl('company'));
  }

}
