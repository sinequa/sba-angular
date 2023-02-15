import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription, tap } from 'rxjs';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { LoginService } from '@sinequa/core/login';
import { Record, Results } from '@sinequa/core/web-services';
import { SelectionService } from '@sinequa/components/selection';
import { SearchService } from '@sinequa/components/search';
import { default_facet_components, FacetConfig, FacetService } from '@sinequa/components/facet';
import { UIService } from '@sinequa/components/utils';
import { PreviewService } from '@sinequa/components/preview';
import { BsDropdownService } from '@sinequa/components/action';
import { FACETS, METADATA, FEATURES, FacetParams } from '../../config';
import { BsFacetDate } from '@sinequa/analytics/timeline';
import { AppSearchFormComponent } from '../search-form/search-form.component';
import { AppDashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public results$: Observable<Results | undefined>;

  private subscriptions: Subscription[] = [];

  public readonly facetComponents = {
    ...default_facet_components,
    "date": BsFacetDate
  }

  // Used to scroll (on the results list side) to the latest document selected in a widget
  lastSelectedId?: string;

  showResults = true;

  @ViewChild(AppSearchFormComponent) searchForm: AppSearchFormComponent;
  @ViewChild(AppDashboardComponent) dashboard: AppDashboardComponent;

  constructor(
    public searchService: SearchService,
    public facetService: FacetService,
    public selectionService: SelectionService,
    private previewService: PreviewService,
    private titleService: Title,
    private intlService: IntlService,
    private appService: AppService,
    public loginService: LoginService,
    public ui: UIService,
    public dropdownService: BsDropdownService
  ) {

    // Subscribe to the search service to update the page title based on the searched text
    this.results$ = this.searchService.resultsStream.pipe(
      tap(() => this.setTitle(this.searchService.query.text || ""))
    );

  }

  /**
   * Initialize the page title
   */
  ngOnInit() {
    this.setTitle('');
  }

  /**
   * Unsubscribe from the search service
   */
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Update page title
   */
  setTitle(search: string) {
    this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", {search}));
  }

  /**
   * Returns the configuration of the facets displayed in the facet-multi component.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get facets(): FacetConfig<FacetParams>[] {
    return this.appService.app?.data?.facets as any as FacetConfig<FacetParams>[] || FACETS;
  }

  /**
   * Returns the list of features activated in the top right menus.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get features(): string[] {
    return this.appService.app?.data?.features as string[] || FEATURES;
  }

  /**
   * Returns the configuration of the metadata displayed in the facet-preview component.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get metadata(): string[] {
    return this.appService.app?.data?.metadata as string[] || METADATA;
  }

  /**
   * Responds to a click on a document
   * @param record
   * @param event
   */
  onDocumentClicked(record: Record, event: Event) {
    if(!this.isClickAction(event)){
      this.dashboard.openPreview(record);
    }
  }

  /**
   * Responds to a click on a document represented within a view (eg. on a map)
   * @param record
   */
  onDocumentClickedFromView(record: Record) {
    this.selectionService.toggleSelectedRecords(record);
    if(record.$selected) {
      this.lastSelectedId = record.id;
    }
  }

  /**
   * Open the preview when this record has no url1
   * @param record
   * @param isLink
   */
  openPreviewIfNoUrl(record: Record, isLink: boolean) {
    if(!isLink){
      this.previewService.openRoute(record, this.searchService.query);
    }
  }

  // Make sure the click is not meant to trigger an action
  private isClickAction(event: Event): boolean {
    const target = event.target as HTMLElement|null;
    return event.type !== 'click' || !!target?.matches("a, a *, input, input *, button, button *");
  }

  /**
   * Whether the UI is in dark or light mode
   */
  isDark(): boolean {
    return document.body.classList.contains("dark");
  }

  /**
   * Open the search form to add/remove filters
   */
  editFilters() {
    // setTimeout is need to come after the "click outside" event that collapses the search form
    setTimeout(() => this.searchForm.searchForm.expand());
    return false;
  }

  /**
   * Hide/show the result's sidebar
   */
  toggleResults(): void {
    this.showResults = !this.showResults;
  }

}
