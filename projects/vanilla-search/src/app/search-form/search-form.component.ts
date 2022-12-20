import { Component, ViewChild } from "@angular/core";
import { FacetConfig } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { AppService, Query } from "@sinequa/core/app-utils";
import { FacetParams, FACETS, FEATURES } from "../../config";
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
  `],
})
export class AppSearchFormComponent {

  @ViewChild("searchForm") searchForm: SearchFormComponent;

  facetComponents = {
    ...default_facet_components,
    "date": BsFacetDate
  }

  /** When a facet is open in the facet-container, we hide the autocomplete */
  facetOpen: boolean;
  /** editFilter = true when we display the filter editor */
  editFilters: boolean;

  constructor(
    public searchService: SearchService,
    public appService: AppService,
  ) {}

  onFacetOpen(state: boolean) {
    this.facetOpen = state;
  }

  toggleEdit() {
    this.editFilters = !this.editFilters;
  }

  onFiltersChange() {
    this.searchForm.onFiltersChanged();
  }

  onAutocompleteSearch(text: string, query: Query) {
    query.text = text;
    this.searchForm.applyFilters(); // Apply the autocomplete query and close the form
  }

  /**
   * Retrieve autocomplete sources, which include the standard
   */
  get autocompleteSources(): string[] {
    return this.appService.app?.data?.features as string[] || FEATURES;
  }

  get facets(): FacetConfig<FacetParams>[] {
    return this.appService.app?.data?.facets as any as FacetConfig<FacetParams>[] || FACETS;
  }

}
