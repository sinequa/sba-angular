import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsFacetDate } from '@sinequa/analytics/timeline';
import { Action } from '@sinequa/components/action';
import { DEFAULT_FACET_COMPONENTS, FacetConfig } from '@sinequa/components/facet';
import { MetadataConfig } from '@sinequa/components/metadata';
import { Preview, PreviewHighlightColors, PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { SelectionService } from '@sinequa/components/selection';
import { HelpFolderOptions } from '@sinequa/components/user-settings';
import { UIService } from '@sinequa/components/utils';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { LoginService } from '@sinequa/core/login';
import { AuditEventType, AuditWebService, Filter, Record, Results } from '@sinequa/core/web-services';
import { Observable, Subscription, filter, tap } from 'rxjs';

import { FACETS, FEATURES, FacetParams, METADATA_CONFIG, PREVIEW_HIGHLIGHTS } from '../../config';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport)
  public viewPort?: CdkVirtualScrollViewport

  // Document "opened" via a click (opens the preview facet)
  public openedDoc?: Record;
  public preview?: Preview;
  public passageId?: number;

  ui = inject(UIService);

  // Custom action for the preview facet (open the preview route)
  public previewCustomActions: Action[];

  /**
   * Controls visibility of filters (small screen sizes)
   */
  public showFilters = this.ui.screenSizeIsGreaterOrEqual('md');
  /**
   * Controls visibility of menu (small screen sizes)
   */
  public showMenu = (this.ui.screenSizeIsGreaterOrEqual('md')) ? true : false;
  /**
   * Controls visibility of the search bar (small screen sizes)
   */
  public showSearch = true;
  /**
   * Controls visibility of the filters toggle button (small screen sizes)
   */
  public showFilterToggle = false;

  public results$: Observable<Results | undefined>;

  public readonly facetComponents = {
      ...DEFAULT_FACET_COMPONENTS,
      "date": BsFacetDate
  }

  public helpFolderOptions: HelpFolderOptions = {
    path: '/r/_sinequa/webpackages/help',
    indexFile: 'olh-search.html#sdard-search',
  }

  public isDark: boolean;
  public queryName: string;
  public filters?: Filter;

  private subscription = new Subscription();

  constructor(
    private previewService: PreviewService,
    private titleService: Title,
    private intlService: IntlService,
    private appService: AppService,
    public searchService: SearchService,
    public selectionService: SelectionService,
    public loginService: LoginService,
    public auditService: AuditWebService,
  ) {

    const expandAction = new Action({
      icon: "fas fa-fw fa-expand-alt",
      title: "msg#preview.expandTitle",
      action: () => {
        if (this.openedDoc) {
          this.previewService.openRoute(this.openedDoc, this.searchService.query);
        }
      }
    });

    const closeAction = new Action({
      icon: "fas fa-fw fa-times",
      title: "msg#preview.closeTitle",
      action: () => {
        this.closeDocument();
      }
    });

    this.previewCustomActions = [expandAction, closeAction];

    this.showFilters = (this.ui.screenSizeIsGreater('md'));
    this.showFilterToggle = (this.ui.screenSizeIsLessOrEqual('md'));

    // when size change, adjust _showFilters variable accordingly
    // To avoid weird behavior with the Toggle Filters button
    this.subscription.add(this.ui.resizeEvent.subscribe(_ => {
      this.showFilterToggle = (this.ui.screenSizeIsLessOrEqual('md'));
      this.showMenu = (this.ui.screenSizeIsGreaterOrEqual('md'));
      this.showSearch = (this.ui.screenSizeIsGreaterOrEqual('sm'));
      this.showFilters = (this.ui.screenSizeIsGreaterOrEqual('md'));
    }));

    this.subscription.add(this.ui.isDarkTheme$.subscribe(value => this.isDark = value))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Initialize the page title
   */
  /**
   * Initializes the component.
   * Sets the page title and subscribes to the search service events.
   * Updates the query name and filters when new results are received.
   * Mutates the results/records if desired and updates the page title.
   */
  ngOnInit() {
    this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", { search: "" }));

    this.searchService.events
      .pipe(filter(event => event.type === "new-results"))
      .subscribe(() => {
        const { name, filters } = this.searchService.query;
        this.queryName = name
        this.filters = filters;
      });


    // mutate results/records if desired, convert to switchMap or mergeMap if additional calls need to be chained
    // consult RxJS documentation for additional functionality like combineLatest, etc.
    this.results$ = this.searchService.resultsStream
      .pipe(
        tap(results => {
          this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", { search: this.searchService.query.text || "" }));
          if (!this.showResults) {
            this.openedDoc = undefined;
            this.showFilters = false;
          }
          if(results && results.records.length <= results.pageSize) {
            window.scrollTo({top: 0, behavior: 'auto'});
          }
        })
      );
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
  public get metadata(): MetadataConfig[] {
    return this.appService.app?.data?.metadata as any as MetadataConfig[] || METADATA_CONFIG;
  }

  public get previewHighlights(): PreviewHighlightColors[] {
    return this.appService.app?.data?.previewHighlights as any || PREVIEW_HIGHLIGHTS;
  }

  /**
   * Responds to a click on a document (setting openedDoc will open the preview facet)
   * @param record
   * @param event
   */
  onDocumentClicked(record: Record, event: Event) {
    if(!this.isClickAction(event)){
      this.openMiniPreview(record);
    }
  }

  openMiniPreview(record: Record, passageId?: number) {

    this.passageId = passageId;

    if(this.openedDoc !== record) {
      this.preview = undefined;
      this.openedDoc = record;
    }
    else {
      // Select the passage in the already open preview
      this.selectPassage();
    }

    if (this.ui.screenSizeIsLessOrEqual('md')) {
      this.showFilters = false; // Hide filters on small screens if a document gets opened
    }
  }

  onPreviewReady(preview: Preview) {
    this.preview = preview;
    this.selectPassage();
  }

  /**
   * Select the selected matchingpassage in the preview, if any
   */
  selectPassage() {
    if(this.passageId !== undefined && this.preview) {
      const passage = this.preview.data?.record.matchingpassages?.passages.find(p => p.id === this.passageId);
      if(passage) {
        this.preview.selectStart("matchingpassages", passage.rlocation[0]);
      }
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

  /**
   * Responds to the preview facet being closed by a user action
   */
  closeDocument(){
    if(this.openedDoc){
      this.auditService.notify({
        type: AuditEventType.Preview_Close,
        detail: this.previewService.getAuditPreviewDetail(this.openedDoc.id, this.searchService.query, this.openedDoc, this.searchService.results?.id)
      });
      this.openedDoc = undefined;
      if(this.ui.screenSizeIsEqual('md')){
        this.showFilters = true; // Show filters on medium screen when document is closed
      }
    }
  }

  // Make sure the click is not meant to trigger an action
  private isClickAction(event: Event): boolean {
    const target = event.target as HTMLElement|null;
    return event.type !== 'click' || !!target?.matches("a, a *, input, input *, button, button *");
  }

  /**
   * Show or hide the left facet bar (small screen sizes)
   */
  toggleFilters(){
    this.showFilters = !this.showFilters;
    if(this.showFilters){ // Close document if filters are displayed
      this.openedDoc = undefined;
    }
  }


  /**
   * Show or hide the user menus (small screen sizes)
   */
  toggleMenu(){
    this.showMenu = !this.showMenu;
    this.showSearch = !this.showMenu;
  }

  /**
   * Determine whether to show or hide results
   */
  get showResults(): boolean {
    if(this.ui.screenSizeIsLessOrEqual('sm')){
      return !this.showFilters && !this.openedDoc;
    }
    return true;
  }

  /**
   * Any icons mappings overrides
   * Overrides "defaultFormatIcons" from @sinequa/components/result
   */
  get formatIcons(): any {
    return this.appService.app?.data?.formatIcons;
  }

  /**
   * Handles the click event for similar documents.
   * @param {Object} id - The ID of the document.
   */
  similarDocumentsClick({id}) {
    this.searchService.getRecords([id]).subscribe(records => {
      if (records.length > 0) {
        const record = records[0] as Record;
        this.previewService.openRoute(record, this.searchService.query);
      }
    });
  }

  fetchMore() {
    if (this.viewPort) {
      const end = this.viewPort.getRenderedRange().end
      const total = this.viewPort.getDataLength()

      // If we're close to the bottom, fetch the next page.
      if (end >= total - 3) {
        this.searchService.loadMore();
      }
    }
  }
}
