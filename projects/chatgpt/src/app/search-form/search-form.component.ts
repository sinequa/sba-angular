import { Component, Input, ViewChild } from "@angular/core";
import { FacetConfig } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { AppService, Query } from "@sinequa/core/app-utils";
import { FacetParams, FACETS } from "../../config";
import { DEFAULT_FACET_COMPONENTS } from '@sinequa/components/facet';
import { BsFacetDate } from '@sinequa/analytics/timeline';
import { SearchFormComponent } from "@sinequa/components/search-form";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class AppSearchFormComponent {

  /** List of autocomplete sources displayed by the autocomplete */
  @Input() autocompleteSources?: string[];
  /** Route where a new search navigates to */
  @Input() searchRoute = "search";

  /** Mapping of facet types to facet components */
  @Input()
  facetComponents = {
    ...DEFAULT_FACET_COMPONENTS,
    "date": BsFacetDate
  }

  @ViewChild("searchForm") searchForm: SearchFormComponent;


  constructor(
    public searchService: SearchService,
    public appService: AppService
  ) {}


  /**
   * Returns the configuration of the facets displayed in the facet-multi component.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get facets(): FacetConfig<FacetParams>[] {
    return this.appService.app?.data?.facets as any as FacetConfig<FacetParams>[] || FACETS;
  }


  onFiltersChange() {
    this.searchForm.onFiltersChanged();
  }

  onAutocompleteSearch(text: string, query: Query) {
    query.text = text;
    this.searchForm.applyFilters(); // Apply the autocomplete query and close the form
  }

  onAutocompleteSelect(text: string, query: Query) {
    query.text = text;
  }

}
