import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Query } from '@sinequa/core/app-utils';

@Component({
  selector: 'sq-preview-search-form',
  templateUrl: './preview-search-form.component.html',
  styleUrls: ['./preview-search-form.component.scss']
})
export class BsPreviewSearchFormComponent implements OnChanges {
  @Input() query: Query;

  // Search form
  readonly form: FormGroup;
  readonly searchControl: FormControl;

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
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
   * Updates the query with the content of the search form and navigate to this new query
   * (the page is updated via the router.events listener in the constructor)
   */
  search(){
    this.query.text = this.searchControl.value || "";
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {query: this.query.toJsonForQueryString()},
      queryParamsHandling: 'merge',
      state: {}
    });
  }
}
