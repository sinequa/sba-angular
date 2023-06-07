import { Component, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
import { PREVIEW_HIGHLIGHTS } from '@sinequa/vanilla/config';
import { ChatService, InitChat } from '@sinequa/components/machine-learning';
import { AssistantService } from '../assistant/assistant.service';
import { ProviderFactory } from '@sinequa/analytics/network';
import { GptProvider } from './network.provider';

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

  networkProvider: GptProvider;
  networkSettingsAction = new Action({
    icon: 'fas fa-pen-fancy',
    title: 'Customize prompt',
    action: action => action.selected = !action.selected
  });

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
    public cdRef: ChangeDetectorRef,
    public assistantService: AssistantService,
    public factory: ProviderFactory
  ) {

    // The URL can be changed when searching within the page
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getPreviewDataFromUrl());

    titleService.setTitle(this.intlService.formatMessage("msg#preview.pageTitle"));

    this.networkProvider = new GptProvider(this.factory, this.assistantService, this.chatService);

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
        this.getTab('network'),
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

    if(this.subpanel === 'network' && this.previewData?.record) {
      this.networkProvider.updateRecord(this.previewData?.record, this.query);
      setTimeout(() => this.cdRef.detectChanges());
    }
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
      const record = this.previewData.record;

      // Chat view
      this.chat = {
        messages: [{
          role: 'system',
          display: false,
          content: this.assistantService.getPrompt("previewPrompt", record, {query: this.query})
        }],
        attachments: this.chatService.addDocument(record, [], 2048, 5, 10)
      };
      this.chatQuery = this.searchService.makeQuery({
        filters: {field: 'id', value: record.id}
      });

      if(this.subpanel === 'network') {
        this.networkProvider.updateRecord(record, this.query);
      }

    }
  }

  get networkPrompt() {
    return this.assistantService.getRawPrompt("networkPrompt");
  }

  set networkPrompt(prompt: string) {
    this.assistantService.setRawPrompt("networkPrompt", prompt);
  }

  resetNetworkPrompt() {
    this.assistantService.resetPrompt("networkPrompt");
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
