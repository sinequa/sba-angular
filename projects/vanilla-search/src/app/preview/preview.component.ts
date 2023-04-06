import { Component, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription, filter, forkJoin, of } from 'rxjs';

import { AuditEventType, PreviewData, Tab } from '@sinequa/core/web-services';
import { AppService, Query } from '@sinequa/core/app-utils';
import { Action } from '@sinequa/components/action';
import { PreviewService, PreviewHighlightColors, Preview } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { IntlService } from '@sinequa/core/intl';
import { PREVIEW_HIGHLIGHTS } from '@sinequa/vanilla/config';
import { ChatService, InitChat } from '@sinequa/components/machine-learning';

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
  changeDetection: ChangeDetectionStrategy.OnPush
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
  subpanel = "chat";
  extractsType: string;
  minimapType = "extractslocations";
  tabs: Tab[];

  chatQuery?: Query;
  chat?: InitChat;

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
    public chatService: ChatService,
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
        this.getTab('chat'),
        this.getTab('extracts'),
        this.getTab('entities')
      ];
      this.initChat();
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

  initChat() {
    if(this.previewData?.record) {
      const content = `The text below is extracted from a document retrieved by a search engine. Generate a summary of this text in 5 sentences.`;
      const messages = [
        {role: 'system', display: false, content}
      ];
      const $record = this.previewData.record;
      const passages = $record.matchingpassages?.passages
        .slice(0,5)
        .map(p => ({location: p.location, $record }));
      const attachments =
        passages? forkJoin(this.chatService.addPassages(passages, 2, 4)) :
        $record.extracts? this.chatService.addExtracts($record, $record.extracts) : of([]);
      this.chat = {messages, attachments};
      this.chatQuery = this.searchService.makeQuery({
        filters: {field: 'id', value: $record.id}
      })
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
}
