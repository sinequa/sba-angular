import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Query } from '@sinequa/core/app-utils';

@Component({
  selector: 'sq-preview-search-form',
  template: `
<form novalidate [formGroup]="form">
  <div class="input-group">
    <input id="search-input" type="text" placeholder="{{ 'msg#searchForm.searchFor' | sqMessage }}" formControlName="search" class="form-control" sqAutofocus>

    <button class="btn btn-primary" type="submit" (click)="search()" title="{{ 'msg#searchForm.search' | sqMessage }}">
      <i class="fas fa-fw fa-search"></i>
    </button>
  </div>
</form>
  `,
})
export class PreviewSearchFormComponent implements OnChanges {
  @Input() query: Query;
  @Output() searchText = new EventEmitter<string>();

  // Search form
  readonly form: UntypedFormGroup;
  readonly searchControl: UntypedFormControl;

  constructor(
    private formBuilder: UntypedFormBuilder) {

    this.searchControl = new UntypedFormControl('');
    this.form = this.formBuilder.group({
      search: this.searchControl
    });
  }

  /**
   * Updates the text of the search form when the query changes
   */
  ngOnChanges() {
    this.searchControl.setValue((!this.query || !this.query.text) ? "" : this.query.text);
  }

  /**
   * Emits an event for the parent component to search this next text
   */
  search() {
    this.searchText.next(this.searchControl.value || "");
  }
}
