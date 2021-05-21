import { Component, OnInit, OnChanges, Input, Optional, Inject, InjectionToken, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationEnd, RouterEvent } from '@angular/router';
import { LoginService } from '@sinequa/core/login';
import { PreviewData, Results } from '@sinequa/core/web-services';
import { Query } from '@sinequa/core/app-utils';
import { Action } from '@sinequa/components/action';
import { PreviewService, PreviewDocument } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { Subscription } from 'rxjs';
import { IntlService } from '@sinequa/core/intl';
import { UIService } from '@sinequa/components/utils';
import { UserPreferences } from '@sinequa/components/user-settings';
import {filter} from 'rxjs/operators';

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

  // Set when the preview has finished loading and initializing
  previewDocument?: PreviewDocument;

  // State of the preview
  collapsedPanel= true;
  homeRoute = "/home";
  showBackButton = true;
  subpanels = ["extracts", "entities"];
  subpanel = 'extracts';
  previewSearchable = true;

  // Page management for splitted documents
  pagesResults: Results;

  // Subscriptions
  private loginSubscription: Subscription;
  private routerSubscription: Subscription;

  // Preview Tooltip
  tooltipEntityActions: Action[] = [];
  tooltipTextActions: Action[] = [];

  private readonly scaleFactorThreshold = 0.05;
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
    public prefs: UserPreferences,
    public ui: UIService,
    protected activatedRoute: ActivatedRoute) {

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
          this.clear();
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
        }
      );
    }
  }

  /**
   * Called when the HTML of the preview finishes loading in the iframe
   * @param previewDocument
   */
  onPreviewReady(previewDocument: PreviewDocument){
    if(this.previewData) {
      // uses preferences to uncheck highlighted entities
      const uncheckedEntities = this.entitiesStartUnchecked;
      Object.keys(uncheckedEntities)
        .map(key => ({entity: key, value: uncheckedEntities[key]}))
        .filter(item => item.value === true)
        .map(item => previewDocument.toggleHighlight(item.entity, false));

      this.previewDocument = previewDocument;
      this.previewDocument.selectHighlight("matchlocations", 0); // Scroll to first match
    }
  }

  onPreviewPageChange(event: string | PreviewDocument) {
    if (event instanceof PreviewDocument) {
      this.previewDocument = event;
    } else {
      this.currentUrl = event;
      this.previewDocument = undefined;
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
   * Resets the state of the page
   */
  clear(){
    this.previewData = undefined;
    this.previewDocument = undefined;
    this.downloadUrl = undefined;
  }

  /**
   * Notification for the audit service
   */
  openOriginalDoc(){
    if (this.previewData) {
      this.searchService.notifyOpenOriginalDocument(this.previewData.record);
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
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { id }, // Assumes that we can keep the same query(!)
        queryParamsHandling: 'merge'
      });
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
