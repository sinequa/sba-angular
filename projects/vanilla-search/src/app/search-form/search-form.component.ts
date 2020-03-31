import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { SearchService } from '@sinequa/components/search';
import { LoginService } from '@sinequa/core/login';
import { AppService } from '@sinequa/core/app-utils';
import { Subscription } from 'rxjs';
import { FEATURES } from '../../config';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html'
})
export class SearchFormComponent implements OnInit, OnDestroy {
  searchControl: FormControl;
  form: FormGroup;
  autofocus = 0;

  constructor(
    public searchService: SearchService,
    public loginService: LoginService,
    private formBuilder: FormBuilder,
    public appService: AppService) {
  }

  /**
   * Initialization of the form
   */
  ngOnInit() {
    this.searchControl = new FormControl('');
    this.form = this.formBuilder.group({
      search: this.searchControl
    });
    // Every time the query changes, we want to update the search form
    this._searchSubscription = this.searchService.queryStream.subscribe(query => {
      this.searchControl.setValue((!query || !query.text) ? "" : query.text);
      this.autofocus++;
    });
  }

  private _searchSubscription: Subscription;
  ngOnDestroy(){
    if(this._searchSubscription){
      this._searchSubscription.unsubscribe();
    }
  }

  /**
   * Trigger a search query via the search service
   */
  search() {
    if(this.loginService.complete){
      this.searchService.clearQuery();
      this.searchService.query.text = this.searchControl.value || "";
      this.searchService.searchText("search");
    }
  }

  /**
   * Autocomplete icon per category
   * @param category
   */
  autocompleteIcon(category): string {
    switch(category){
      case "recent-document": return "far fa-file-alt fa-fw";
      case "recent-query": return "fas fa-history fa-fw";
      case "basket": return "fas fa-inbox fa-fw";
      case "saved-query": return "far fa-save fa-fw"
    }
    return "far fa-lightbulb fa-fw"
  }

  /**
   * Retrieve autocomplete sources, which include the standard
   */
  get autocompleteSources(): string[] {
    if(this.appService.app && this.appService.app.data && this.appService.app.data.features){
      return <string[]> this.appService.app.data.features;
    }
    return FEATURES;
  }

}
