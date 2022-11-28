import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, tap } from 'rxjs';
import { Action } from '@sinequa/components/action';
import { BsFacetCard, default_facet_components, FacetConfig, FacetViewDirective } from '@sinequa/components/facet';
import { PreviewDocument, PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { SelectionService } from '@sinequa/components/selection';
import { UIService } from '@sinequa/components/utils';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { LoginService } from '@sinequa/core/login';
import { Answer, AuditEventType, AuditWebService, Record, Results } from '@sinequa/core/web-services';
import { FacetParams, FACETS, FEATURES, METADATA } from '../../config';
import { BsFacetDate } from '@sinequa/analytics/timeline';
import { TopPassage } from '@sinequa/core/web-services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // Dynamic display of facets titles/icons in the multi-facet component
  public multiFacetIcon? = "fas fa-filter fa-fw";
  public multiFacetTitle = "msg#facet.filters.title";

  // Document "opened" via a click (opens the preview facet)
  public openedDoc?: Record;

  // Custom action for the preview facet (open the preview route)
  public previewCustomActions: Action[];

  // Whether the left facet bar is shown
  public _showFilters = this.ui.screenSizeIsEqual('md');
  // Whether the menu is shown on small screens
  public _showMenu = false;

  public results$: Observable<Results | undefined>;

  // Whether the results contain answers/passages data (neural search)
  public hasAnswers: boolean;
  public hasPassages: boolean;
  public passageId?: string;

  public readonly facetComponents = {
      ...default_facet_components,
      "date": BsFacetDate
  }

  @ViewChild("previewFacet") previewFacet: BsFacetCard;
  @ViewChild("passagesList", {read: FacetViewDirective}) passagesList: FacetViewDirective;

  constructor(
    private previewService: PreviewService,
    private titleService: Title,
    private intlService: IntlService,
    private appService: AppService,
    public searchService: SearchService,
    public selectionService: SelectionService,
    public loginService: LoginService,
    public auditService: AuditWebService,
    public ui: UIService,
  ) {

    const expandAction = new Action({
      icon: "fas fa-fw fa-expand-alt",
      title: "msg#facet.preview.expandTitle",
      action: () => {
        if (this.openedDoc) {
          this.previewService.openRoute(this.openedDoc, this.searchService.query);
        }
      }
    });

    const closeAction = new Action({
      icon: "fas fa-fw fa-times",
      title: "msg#facet.preview.closeTitle",
      action: () => {
        this.closeDocument();
      }
    });

    this.previewCustomActions = [ expandAction, closeAction ];
  }

  /**
   * Initialize the page title
   */
  ngOnInit() {
    this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", {search: ""}));

    // mutate results/records if desired, convert to switchMap or mergeMap if additional calls need to be chained
    // consult RxJS documentation for additional functionality like combineLatest, etc.
    this.results$ = this.searchService.resultsStream
      .pipe(
        tap(results => {
          this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", {search: this.searchService.query.text || ""}));
          if (!this.showResults) {
            this.openedDoc = undefined;
            this._showFilters = false;
          }
          this.hasAnswers = !!results?.answers?.answers?.length;
          this.hasPassages = !!results?.topPassages?.passages?.length;
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
  public get metadata(): string[] {
    return this.appService.app?.data?.metadata as string[] || METADATA;
  }

  /**
   * Responds to a change of facet in the multi facet
   * @param facet
   */
  facetChanged(facet: FacetConfig<FacetParams>){
    if(!facet) {
      this.multiFacetIcon = "fas fa-filter fa-fw";
      this.multiFacetTitle = "msg#facet.filters.title";
    }
    else {
      this.multiFacetIcon = facet.icon;
      this.multiFacetTitle = facet.title || facet.name || facet.parameters?.aggregation || '';
    }
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
    this.openedDoc = record;
    this.openedDoc.$hasPassages = !!this.openedDoc.matchingpassages?.passages?.length;
    this.passageId = passageId?.toString();
    if (this.passageId) {
      if (this.previewFacet && this.passagesList) {
        this.previewFacet.setView(this.passagesList);
      }
    }
    if (this.ui.screenSizeIsLessOrEqual('md')) {
      this._showFilters = false; // Hide filters on small screens if a document gets opened
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
        this._showFilters = true; // Show filters on medium screen when document is closed
      }
    }
  }

  /**
   * Document is loaded and displayed on screen. It could be manipulated easily.
   *
   * eg: scroll to a specific location
   * document.getContentWindow().scrollTo(0, 3000);
   * @param document the document currently in preview
   */
  previewReady(document: PreviewDocument) {
    // document.getContentWindow().scrollTo(0, Math.random() * 4000);
  }

  // VERY SPECIFIC TO THIS APP:
  // Make sure the click is not meant to trigger an action (from sq-result-source or sq-result-title)
  private isClickAction(event: Event): boolean {
    if (event.type !== 'click') {
      return true;
    }
    const target = event.target as HTMLElement;
    if (!target) {
      return false;
    }
    return event.type !== 'click' ||
      target.tagName === "A" ||
      target.tagName === "INPUT" ||
      target.matches("sq-result-selector *, .sq-result-title, sq-result-source *, sq-labels *");
  }


  /**
   * Controls visibility of filters (small screen sizes)
   */
  get showFilters(): boolean {
    return this.ui.screenSizeIsGreaterOrEqual('lg') || this._showFilters;
  }

  /**
   * Show or hide the left facet bar (small screen sizes)
   */
  toggleFilters(){
    this._showFilters = !this._showFilters;
    if(this._showFilters){ // Close document if filters are displayed
      this.openedDoc = undefined;
    }
  }

  /**
   * Controls visibility of menu (small screen sizes)
   */
  get showMenu(): boolean {
    return this.ui.screenSizeIsGreaterOrEqual('sm') || this._showMenu;
  }

  /**
   * Show or hide the user menus (small screen sizes)
   */
  toggleMenu(){
    this._showMenu = !this._showMenu;
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
   * On small screens only show the search form when the facets are displayed
   */
  get showForm(): boolean {
    return this.ui.screenSizeIsGreaterOrEqual('sm') || this._showFilters;
  }

  /**
   * On small screens, show the logo unless the filters or menu are displayed
   */
  get showLogo(): boolean {
    return this.ui.screenSizeIsGreaterOrEqual('sm') || !(this._showFilters || this._showMenu)
  }

  /**
   * On medium screens, show the filter toggle, unless on mobile the menu is displayed
   */
  get showFilterToggle(): boolean {
    return this.ui.screenSizeIsLess('lg') && (this.ui.screenSizeIsGreaterOrEqual('sm') || !this._showMenu);
  }

  /**
   * Whether the UI is in dark or light mode
   */
  isDark(): boolean {
    return document.body.classList.contains("dark");
  }

  onTitleClick(value: {item: Answer | TopPassage, isLink: boolean}) {
    if (value.item.$record) {
      this.openPreviewIfNoUrl(value.item.$record, value.isLink);
    }
  }
}
