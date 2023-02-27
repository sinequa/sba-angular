import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { AuditEventType, PreviewData, Tab } from '@sinequa/core/web-services';
import { AppService, Query } from '@sinequa/core/app-utils';
import { Action } from '@sinequa/components/action';
import { PreviewService, PreviewHighlightColors, Preview } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { IntlService } from '@sinequa/core/intl';
import { UIService } from '@sinequa/components/utils';
import { PREVIEW_HIGHLIGHTS } from '@sinequa/vanilla/config';

export interface EntitiesState {
  count: number;
  sortFreq: boolean;
  hidden: Map<string, boolean>;
  nav: Map<string, number>;
  category: string;
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {

  @ViewChild(Preview) preview: Preview;

  get previewData(): PreviewData|undefined {
    return this.preview?.data;
  }

  id?: string;
  query: Query;

  sandbox?: string | null;

  // State of the preview
  collapsedPanel = false;
  homeRoute = "/home";
  showBackButton = true;
  subpanels = ["entities"];
  subpanel: string;
  previewSearchable = true;
  minimapType = "extractslocations";
  tabs: Tab[];

  // Subscriptions
  private routerSubscription: Subscription;

  // Preview Tooltip
  tooltipEntityActions: Action[];
  tooltipTextActions: Action[] = [
    new Action({
      text: "msg#searchForm.search",
      title: "msg#preview.searchText",
      icon: "fas fa-search",
      action: (action) => this.searchText(action.data.slice(0, 50))
    })
  ];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected titleService: Title,
    protected _location: Location,
    public ui: UIService,

    protected intlService: IntlService,
    protected previewService: PreviewService,
    protected searchService: SearchService,
    public appService: AppService,
  ) {

    // The URL can be changed when searching within the page
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getPreviewDataFromUrl());

    titleService.setTitle(this.intlService.formatMessage("msg#preview.pageTitle"));

  }

  /**
   * Initializes the configuration and potentially loads the preview data from the URL
   * (in the case where the id and query are not provided via the Input bindings)
   */
  ngOnInit() {
    this.getPreviewDataFromUrl();
    this.collapsedPanel = this.ui.screenSizeIsLessOrEqual('xs');
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  /**
   * Extracts id and query from the URL and request the preview data from the preview service
   */
  private getPreviewDataFromUrl() {
    const map = this.route.snapshot.queryParamMap;
    this.id = map.get("id") || undefined;
    this.query = this.searchService.makeQuery();
    const query = map.get("query");
    if(query) {
      this.query.fromJson(query);
    }
  }

  /**
   * Called when the HTML of the preview finishes loading in the iframe
   */
  onPreviewReady() {
    if (this.id && this.previewData) {
      this.preview.selectMostRelevant();
      this.subpanels = ["entities"];
      this.tabs = [
        this.getTab('entities')
      ];
      if (this.previewData.highlightsPerCategory['matchingpassages']?.values.length) {
        this.subpanels.unshift("passages");
        this.tabs.unshift(this.getTab('passages'));
        this.subpanel = "passages";
        this.minimapType = "extractslocations";
      } else {
        this.subpanels.unshift("extracts");
        this.tabs.unshift(this.getTab('extracts'));
        this.subpanel = "extracts";
        this.minimapType = "extractslocations";
      }
      this.sandbox = ["xlsx", "xls"].includes(this.previewData.record.docformat) ? null : undefined;
      this.titleService.setTitle(this.intlService.formatMessage("msg#preview.pageTitle", { title: this.previewData.record?.title || "" }));
    }
  }

  openPanel(tab: Tab) {
    const panel = tab.value;
    this.subpanel = panel;
    // Change the type of extract highlighted by the minimap in function of the current tab
    if (panel === "passages") {
      this.minimapType = "extractslocations";
      // if (this.previewData && this.previewDocument) {
      //   this.highlightMostRelevant(this.previewData, this.previewDocument, "matchingpassages")
      // }
    } else {
      // this.previewDocument?.clearPassageHighlight();
    }
    if (panel === "extracts") {
      this.minimapType = "extractslocations";
      // if (this.previewData && this.previewDocument) {
      //   this.highlightMostRelevant(this.previewData, this.previewDocument, "extractslocations")
      // }
    }
    if (panel === 'entities') {
      this.minimapType = "none";
      //this.updateHighlights('entities');
    }
  }

  /**
   * Back button (navigating back to search)
   */
  back() {
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
  notifyOriginalDoc() {
    if (this.previewData) {
      const type = this.previewData?.record.url1 ? AuditEventType.Doc_Url1 : AuditEventType.Doc_CacheOriginal;
      this.searchService.notifyOpenOriginalDocument(this.previewData.record, undefined, type);
    }
  }

  notifyPdf() {
    if (this.previewData) {
      this.searchService.notifyOpenOriginalDocument(this.previewData.record, undefined, AuditEventType.Doc_CachePdf);
    }
  }

  /**
   * Search for new text within the same document
   * @param text
   */
  searchText(text: string) {
    if (this.query && this.query.text !== text) {
      this.query.text = text;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { query: this.query.toJsonForQueryString() },
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

  private getTab(panel: string): Tab {
    return {
      name: panel,
      display: `msg#preview.${panel}`,
      value: panel,
      count: 1
    }
  }

  public get previewHighlights(): PreviewHighlightColors[] {
    return this.appService.app?.data?.previewHighlights as any || PREVIEW_HIGHLIGHTS;
  }
}
