import { Location } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { Action } from '@sinequa/components/action';
import { Preview, PreviewHighlightColors, PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { AppService, Query } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { AuditEventType, CCQuery, PreviewData, SimilarDocumentOptions, Tab, Record as Article } from '@sinequa/core/web-services';
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
    styleUrls: ['./preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PreviewComponent implements OnDestroy {

  @ViewChild(Preview) preview: Preview;

  get previewData(): PreviewData|undefined {
    if(this.preview?.loading) {
      return undefined;
    }
    return this.preview?.data;
  }

  id?: string;
  query: Query;

  // State of the preview
  collapsedPanel = false;
  homeRoute = "/home";
  subpanel = "extracts";
  extractsType: string;
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

  queryName;
  options: SimilarDocumentOptions = {};

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public titleService: Title,
    public _location: Location,
    public intlService: IntlService,
    public previewService: PreviewService,
    public searchService: SearchService,
    public appService: AppService,
    public cdRef: ChangeDetectorRef
  ) {

    // The URL can be changed when searching within the page
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getPreviewDataFromUrl());

    titleService.setTitle(this.intlService.formatMessage("msg#preview.pageTitle"));

    this.searchService.events
    .pipe(filter(event => event.type === "new-results"))
    .subscribe(() => {
      const { name } = this.searchService.query;
      this.queryName = name
    });

    this.appService.events.pipe(filter(e => e.type === "query-changed") ).subscribe(() => {
      const queries = Object.values(this.appService.app?.queries as Record<string, CCQuery>);
      this.queryName = queries[0].name;
    });


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
    this.cdRef.detectChanges();
  }

  /**
   * Called when the HTML of the preview finishes loading in the iframe
   */
  onPreviewReady() {
    if (this.id && this.previewData) {
      this.preview.selectMostRelevant();
      this.tabs = [
        this.getTab('extracts'),
        this.getTab('entities')
      ];
      this.extractsType = this.previewData.highlightsPerCategory['matchingpassages']?.values.length?
        'matchingpassages' : 'extractslocations';
      this.titleService.setTitle(this.intlService.formatMessage("msg#preview.pageTitle", { title: this.previewData.record?.title || "" }));
      this.cdRef.detectChanges();
    }
  }

  openPanel(tab: Tab) {
    this.subpanel = tab.value;
  }

  /**
   * Back button (navigating back to search)
   */
  back() {
    this._location.back();
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

    /**
   * Handles the click event for similar documents.
   * @param {Object} id - The ID of the document.
   */
    documentClick({id}) {
      this.searchService.getRecords([id]).subscribe(records => {
        if (records.length > 0) {
          const record = records[0] as Article;
          this.previewService.openRoute(record, this.searchService.query);
        }
      });
    }
}
