import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Query } from '@sinequa/core/app-utils';

@Component({
  selector: 'sq-preview-search-form',
  templateUrl: './preview-search-form.component.html',
  styleUrls: ['./preview-search-form.component.scss']
})
export class BsPreviewSearchFormComponent implements OnChanges {
  @Input() query: Query;
  @Output() searchText = new EventEmitter<string>();

  // Search form
  readonly form: FormGroup;
  readonly searchControl: FormControl;

  constructor(
    private formBuilder: FormBuilder) {

    this.searchControl = new FormControl('');
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
