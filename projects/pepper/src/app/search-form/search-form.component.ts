import { Component, Input, ViewChild } from "@angular/core";
import { FacetConfig } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { Query } from "@sinequa/core/app-utils";
import { FacetParams } from "../../config";
import { default_facet_components } from '@sinequa/components/facet';
import { BsFacetDate } from '@sinequa/analytics/timeline';
import { SearchFormComponent } from "@sinequa/components/search-form";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styles: [`
  :host {
    position: relative;
    display: block;
  }

  .search-dropdown {
    padding: 0.75rem;
    max-height: 400px;
    overflow-y: auto;
  }

  sq-autocomplete {
    display: block;
    margin: 0 -0.75rem;
  }
  `],
})
export class AppSearchFormComponent {

  /** List of autocomplete sources displayed by the autocomplete */
  @Input() autocompleteSources?: string[];
  /** List of facets displayed in the facet editor */
  @Input() facets?: FacetConfig<FacetParams>[];
  /** Route where a new search navigates to */
  @Input() searchRoute = "search";

  /** Mapping of facet types to facet components */
  @Input()
  facetComponents = {
    ...default_facet_components,
    "date": BsFacetDate
  }

  @ViewChild("searchForm") searchForm: SearchFormComponent;


  /** editFilter = true when we display the filter editor */
  filtersEdited: boolean;

  constructor(
    public searchService: SearchService
  ) {}

  toggleEdit() {
    this.filtersEdited = !this.filtersEdited;
  }

  onFiltersChange() {
    this.searchForm.onFiltersChanged();
  }

  clearFilters(query: Query) {
    delete query.filters;
    this.searchForm.onFiltersChanged();
  }

  onAutocompleteSearch(text: string, query: Query) {
    query.text = text;
    this.searchForm.applyFilters(); // Apply the autocomplete query and close the form
  }

}
