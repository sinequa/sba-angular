import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { SearchService } from '@sinequa/components/search';
import { LoginService } from '@sinequa/core/login';
import { AppService } from '@sinequa/core/app-utils';
import { Subscription } from 'rxjs';
import { FEATURES } from '../../config';
import { ParseResult } from '@sinequa/components/autocomplete';
import { AutocompleteExtended } from './autocomplete-extended.directive';
import { UserPreferences } from '@sinequa/components/user-settings';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styles: [`
.search-input {
  border: none;
  width: 100%;  
}
.search-input:focus {
  outline: none;
}
.form-control:focus-within {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
  `]
})
export class SearchFormComponent implements OnInit, OnDestroy {
  searchControl: FormControl;
  form: FormGroup;
  autofocus = 0;

  fieldSearchExpression?: string;

  parseResult?: ParseResult;

  @ViewChild(AutocompleteExtended) autocompleteDirective: AutocompleteExtended;

  constructor(
    public searchService: SearchService,
    public loginService: LoginService,
    private formBuilder: FormBuilder,
    public appService: AppService,
    public prefs: UserPreferences) {
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
      this.fieldSearchExpression = query?.findSelect("search-form")?.expression;
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
      if(this.getMode() === "selects") {
        const expr = this.autocompleteDirective.getFieldSearchExpression();
        if(expr) {
          this.searchService.query.addSelect(expr, "search-form");
        }
      }
      this.searchService.searchText("search");
    }
  }

  onParse(parseResult: ParseResult) {
    this.parseResult = parseResult;
    this.searchControl.setErrors(parseResult.error? {incorrect: true} : null);
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
      case "saved-query": return "far fa-save fa-fw";
    }
    return "far fa-lightbulb fa-fw";
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

  /**
   * Sets the field search mode
   * event.preventDefault() to avoid the label stealing the focus
   * and closing the autocomplete...
   */
  setMode(mode: "off" | "selects" | "text", event?: Event) {
    event?.preventDefault();
    this.prefs.set('field-search-mode', mode);
  }

  /**
   * Returns the field search mode, stored in user
   * preferences
   */
  getMode(): "off" | "selects" | "text" {
    return this.prefs.get('field-search-mode') || "selects";
  }
}
