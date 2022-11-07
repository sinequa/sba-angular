import { Component, OnInit, OnChanges, Input, Optional, Inject, InjectionToken, OnDestroy, ChangeDetectorRef, NgZone} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { LoginService } from '@sinequa/core/login';
import { AuditEventType, PreviewData, Results } from '@sinequa/core/web-services';
import { AppService, Query } from '@sinequa/core/app-utils';
import { Action } from '@sinequa/components/action';
import { PreviewService, PreviewDocument } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { IntlService } from '@sinequa/core/intl';
import { UIService } from '@sinequa/components/utils';
import { UserPreferences } from '@sinequa/components/user-settings';

export interface PreviewConfig {
  initialCollapsedPanel?: boolean;
  homeRoute?: string;
  showBackButton?: boolean;
  subpanels?: string[];
  defaultSubpanel?: string;
  previewSearchable?: boolean;
}

export interface PreviewInput {
  config?: PreviewConfig;
  id: string;
  query: Query;
}

export interface EntitiesState {
  count: number;
  sortFreq: boolean;
  hidden: Map<string,boolean>;
  nav: Map<string,number>;
  category: string;
}

export const PREVIEW_CONFIG = new InjectionToken<PreviewConfig>("PREVIEW_CONFIG");

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnChanges, OnDestroy {
  // Inputs can be passed via binding or the URL + deps injection (defaults are initialized below)
  @Input() id?: string;
  @Input() query?: Query;
  @Input() previewConfig?: PreviewConfig;

  // Set when the preview service responds
  previewData?: PreviewData;
  downloadUrl?: string;
  currentUrl?: string;
  sandbox?: string | null;

  loading = false;

  // Set when the preview has finished loading and initializing
  previewDocument?: PreviewDocument;

  // State of the preview
  collapsedPanel= true;
  homeRoute = "/home";
  showBackButton = true;
  subpanels = ["extracts", "entities"];
  subpanel = 'extracts';
  previewSearchable = true;
  minimapType = "extractslocations"

  // Page management for splitted documents
  pagesResults: Results;

  // Subscriptions
  private loginSubscription: Subscription;
  private routerSubscription: Subscription;

  // Preview Tooltip
  tooltipEntityActions: Action[] = [];
  tooltipTextActions: Action[] = [];

  private readonly scaleFactorThreshold = 0.2;
  scaleFactor = 1.0;

  constructor(
    @Optional() @Inject(PREVIEW_CONFIG) previewConfig: PreviewConfig,
    @Optional() @Inject(MODAL_MODEL) previewInput: PreviewInput,
    private cdr: ChangeDetectorRef,
    protected router: Router,
    protected route: ActivatedRoute,
    protected titleService: Title,
    protected _location: Location,
    public loginService: LoginService,
    protected intlService: IntlService,
    protected previewService: PreviewService,
    protected searchService: SearchService,
    public appService: AppService,
    public prefs: UserPreferences,
    public ui: UIService,
    protected activatedRoute: ActivatedRoute,
    private zone: NgZone
    ) {

    // If the page is refreshed login needs to happen again, then we can get the preview data
    this.loginSubscription = this.loginService.events.subscribe({
      next: (event) => {
        if (event.type === "session-changed") {
          this.getPreviewData();
        }
      }
    });

    // The URL can be changed when searching within the page
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof RouterEvent && event.url !== this.homeRoute)
      ).subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.getPreviewDataFromUrl();
        }
      }
    });

    // In case the component is loaded in a modal
    if(previewInput){
      if(previewInput.config){
        previewConfig = previewInput.config;
      }
      this.id = previewInput.id;
      this.query = previewInput.query;
    }

    // Configuration may be injected by the root app (or as above by the modal)
    if(previewConfig){
      this.previewConfig = previewConfig;
    }

    this.tooltipTextActions.push(new Action({
      text: "msg#searchForm.search",
      title: "msg#preview.searchText",
      icon: "sq-preview-search-icon",
      action: (action, event) => {
        if (this.query) {
          this.query.text = event['text'].slice(0, 50);
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {query: this.query.toJsonForQueryString()},
            queryParamsHandling: 'merge',
            state: {}
          });
        }
      }
    }));

    titleService.setTitle(this.intlService.formatMessage("msg#preview.pageTitle"));

  }

  /**
   * Loads the preview data in the case where id and query are provided as inputs
   * (eg. the component is inserted in a parent rather than as a route)
   */
  ngOnChanges() {
    this.getPreviewData();
  }

  /**
   * Initializes the configuration and potentially loads the preview data from the URL
   * (in the case where the id and query are not provided via the Input bindings)
   */
  ngOnInit() {

    if(!this.id || !this.query) { // do nothing if the parameters are already here
      this.getPreviewDataFromUrl();
    }

    if(this.previewConfig){
      if(this.previewConfig.initialCollapsedPanel !== undefined){
        this.collapsedPanel = this.previewConfig.initialCollapsedPanel;
      }
      if(this.previewConfig.homeRoute !== undefined){
        this.homeRoute = this.previewConfig.homeRoute;
      }
      if(this.previewConfig.showBackButton !== undefined){
        this.showBackButton = this.previewConfig.showBackButton;
      }
      if(this.previewConfig.subpanels !== undefined){
        this.subpanels = this.previewConfig.subpanels;
      }
      if(this.previewConfig.defaultSubpanel !== undefined){
        this.subpanel = this.previewConfig.defaultSubpanel;
      }
      if(this.previewConfig.previewSearchable !== undefined){
        this.previewSearchable = this.previewConfig.previewSearchable;
      }
    }
  }

  ngOnDestroy(){
    this.loginSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  /**
   * Extracts id and query from the URL and request the preview data from the preview service
   */
  private getPreviewDataFromUrl() {
    const map = this.route.snapshot.queryParamMap;
    this.id = map.get("id") || undefined;
    this.query = this.searchService.makeQuery();
    this.query.fromJson(map.get("query") || "{}");
    this.getPreviewData();
  }

  /**
   * Performs a call to the preview service. Update the search form with the searched query text (page refresh or navigation)
   */
  private getPreviewData() {
    if(!!this.id && !!this.query && this.loginService.complete) {
      this.previewService.getPreviewData(this.id, this.query).subscribe(
        previewData => {
          this.previewData = previewData;
          const url = previewData?.documentCachedContentUrl;
          if(previewData.highlightsPerCategory['matchingpassages']?.values.length && !this.subpanels.includes("passages")) {
            this.subpanels.unshift("passages");
            this.subpanel = "passages";
            this.minimapType = "matchingpassages";
          }
          // Manage splitted documents
          const pageNumber = this.previewService.getPageNumber(previewData.record);
          if(pageNumber) {
            this.previewService.fetchPages(previewData.record.containerid!, this.query!)
              .subscribe(results => this.pagesResults = results);
          }
          this.currentUrl = url;
          this.downloadUrl = url ? this.previewService.makeDownloadUrl(url) : undefined;
          this.sandbox = ["xlsx","xls"].includes(previewData.record.docformat) ? null : undefined;
          this.titleService.setTitle(this.intlService.formatMessage("msg#preview.pageTitle", {title: previewData?.record?.title || ""}));
          this.loading = true;
        }
      );
    }
  }

  /**
   * Called when the HTML of the preview finishes loading in the iframe
   * @param previewDocument
   */
  onPreviewReady(previewDocument: PreviewDocument){
    if (this.previewData) {
      this.loading = false;
      // uses preferences to uncheck highlighted entities
      const uncheckedEntities = this.entitiesStartUnchecked;
      Object.keys(uncheckedEntities)
        .map(key => ({entity: key, value: uncheckedEntities[key]}))
        .filter(item => item.value === true)
        .map(item => previewDocument.toggleHighlight(item.entity, false));

      this.previewDocument = previewDocument;
      if(!this.highlightMostRelevant(this.previewData, this.previewDocument, "matchingpassages")) {
        this.highlightMostRelevant(this.previewData, this.previewDocument, "extractslocations");
      }
    }
  }

  highlightMostRelevant(previewData: PreviewData, previewDocument: PreviewDocument, type: string): boolean {
    const extracts = this.previewService.getExtracts(previewData, undefined, type);
    if(extracts[0]) {
      const mostRelevantExtract = extracts[0].textIndex;
      previewDocument.selectHighlight(type, mostRelevantExtract); // Scroll to most relevant extract
      return true;
    }
    return false;
  }

  openPanel(panel: string) {
    this.subpanel = panel;
    // Change the type of extract highlighted by the minimap in function of the current tab
    if(panel === "passages") {
      this.minimapType = "matchingpassages";
    }
    if(panel === "extracts") {
      this.minimapType = "extractslocations";
    }
    return false;
  }

  onPreviewPageChange(event: string | PreviewDocument) {
    if (event instanceof PreviewDocument) {
      this.previewDocument = event;
      this.loading = false;
    } else {
      this.currentUrl = event;
      this.previewDocument = undefined;
      this.loading = true;
    }
    this.cdr.detectChanges();
  }

  /**
   * Back button (navigating back to search)
   */
  back(){
    this._location.back();
  }

  /**
   * @returns URL of the original document, if any
   */
  getOriginalDocUrl(): string | undefined {
    return this.previewData?.record.url1 || this.previewData?.record.originalUrl;
  }

  /**
   * Notification for the audit service
   */
  notifyOriginalDoc(){
    if (this.previewData) {
      const type = this.previewData?.record.url1? AuditEventType.Doc_Url1 : AuditEventType.Doc_CacheOriginal;
      this.searchService.notifyOpenOriginalDocument(this.previewData.record, undefined, type);
    }
  }

  notifyPdf() {
    if (this.previewData) {
      this.searchService.notifyOpenOriginalDocument(this.previewData.record, undefined, AuditEventType.Doc_CachePdf);
    }
  }

  /**
   * Navigate to another page of this document
   * @param id
   */
  gotoPage(page: number) {
    const containerid = this.previewData?.record.containerid;
    if(containerid) {
      const id = `${containerid}/#${page}#`;

      // we needs surround router.navigate() as we navigate outside Angular
      // if an error occurs, this allow page navigation, broken otherwise
      this.zone.run(() => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { id }, // Assumes that we can keep the same query(!)
          queryParamsHandling: 'merge'
        });
      })
    }
  }

  /**
   * Search for new text within the same document
   * @param text
   */
  searchText(text: string) {
    if(this.query && this.query.text !== text) {
      this.query.text = text;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {query: this.query.toJsonForQueryString()},
        queryParamsHandling: 'merge',
        state: {}
      });
    }
  }

  /**
   * Whether the UI is in dark or light mode
   */
  isDark(): boolean {
    return document.body.classList.contains("dark");
  }

  // User preferences

  /**
   * Entity facets state
   */
  get entitiesStartUnchecked(): {[entity: string]: boolean} {
    return this.prefs.get("preview-entities-checked") || {};
  }

  entitiesChecked(event: {entity: string, checked: boolean}) {
    const startUnchecked = this.entitiesStartUnchecked;
    startUnchecked[event.entity] = !event.checked;
    this.prefs.set("preview-entities-checked", startUnchecked);
  }

  increaseScaleFactor() {
    this.scaleFactor = this.scaleFactor + this.scaleFactorThreshold;
    return false;
  }

  decreaseScaleFactor() {
    this.scaleFactor = Math.round(Math.max(0.1, this.scaleFactor - this.scaleFactorThreshold) * 100) / 100;
    return false;
  }

  shouldDisableMinimize() {
    return this.scaleFactor <= 0.1;
  }

  leftPanelTooltipPlacement() {
    return this.collapsedPanel ? 'right' : 'bottom'
  }
}
