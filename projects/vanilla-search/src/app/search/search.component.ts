import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { forkJoin, Observable, Subscription, tap } from 'rxjs';
import { Action } from '@sinequa/components/action';
import { BsFacetCard, DEFAULT_FACET_COMPONENTS, FacetConfig, FacetViewDirective } from '@sinequa/components/facet';
import { PreviewHighlightColors, PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { SelectionService } from '@sinequa/components/selection';
import { UIService } from '@sinequa/components/utils';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { LoginService } from '@sinequa/core/login';
import { Answer, AuditEventType, AuditWebService, MatchingPassage, Record, RelevantExtract, Results } from '@sinequa/core/web-services';
import { FacetParams, FACETS, FEATURES, METADATA, PREVIEW_HIGHLIGHTS } from '../../config';
import { TopPassage } from '@sinequa/core/web-services';
import { BsFacetDate } from '@sinequa/analytics/timeline';
import { ChatAttachment, ChatComponent, ChatConfig, ChatService, defaultChatConfig, InitChat } from '@sinequa/components/machine-learning';
import { UserPreferences } from '@sinequa/components/user-settings';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {


  // Document "opened" via a click (opens the preview facet)
  public openedDoc?: Record;
  public openedDocChat?: InitChat;

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

  // Whether the results contain answers/passages data (neural search)
  public hasAnswers: boolean;
  public hasPassages: boolean;
  public passageId?: string;
  public summarizeAction: Action;
  public chatSettingsAction: Action;

  public readonly facetComponents = {
      ...DEFAULT_FACET_COMPONENTS,
      "date": BsFacetDate
  }

  @ViewChild(ChatComponent) chat: ChatComponent;
  public isDark: boolean;

  @ViewChild("previewFacet") previewFacet: BsFacetCard;
  @ViewChild("passagesList", {read: FacetViewDirective}) passagesList: FacetViewDirective;

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
    public chatService: ChatService,
    public prefs: UserPreferences,
    public ui: UIService,
  ) {

    this.summarizeAction = new Action({
      text: "Answer with ChatGPT",
      action: () => {
        const passages = this.searchService.results?.topPassages?.passages;
        if(passages?.length) {
          const prompt = ` The below documents contains extracts returned by a search engine. Your job is two perform 2 tasks:
          1 - Try to answer the Query in one short sentence. If you can't or don't have enough context or information from any documents to answer the query, just say so.
          2 - Generate a single summary of all the documents in the context of the Query, using between 5 to 12 sentences.
          Make sure you include the reference in the form [id].
          Answer using using markdown syntax.
          Query: ${this.searchService.query.text || ''}`;
          const messages = [
            {role: 'system', display: false, content: prompt}
          ];
          const attachments = this.chatService.addTopPassages(passages, []);
          this.chat.openChat(messages, undefined, attachments);
          this.summarizeAction.disabled = true;
          this.auditService.notify({
            type: 'Chat_Summarize_Results',
            detail: {
              querytext: this.searchService.query.text
            }
          });
        }
      }
    });

    this.chatSettingsAction = new Action({
      icon: 'fas fa-cog',
      title: 'Settings',
      action: action => {
        action.selected = !action.selected;
        if(!action.selected) {
          this.prefs.set('chat-config', this.chatConfig);
        }
      }
    })

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
            this.openedDocChat = undefined;
            this.showFilters = false;
          }
          this.hasAnswers = !!results?.answers?.answers?.length;
          this.hasPassages = !!results?.topPassages?.passages?.length;
          if(results && results.records.length <= results.pageSize) {
            window.scrollTo({top: 0, behavior: 'auto'});
          }
        }),

        tap((results) => this.updateSelected(this.chatService.attachments$.value, results))
      );

    this.chatService.attachments$.subscribe(attachments => this.updateSelected(attachments, this.searchService.results));
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
    this.openedDoc = record;
    if(record.matchingpassages?.passages.length) {
      const passages = record.matchingpassages.passages
        .slice(0,10) // Limit to 10 passages
        .map(p => ({$record: record, location: p.location})); // prepare input for the chat service

      this.openedDocChat = {
        messages: [
          {role: 'system', display: false, content: `The following snippets are extracted from a document titled \"${record.title}\". Please summarize this document as best as possible, taking into account that the user's original search query was \"${this.searchService.query.text || ''}\".`}
        ],
        attachments: forkJoin(this.chatService.addPassages(passages)).pipe(
          tap(() => this.auditService.notify({
            type: 'Chat_Summarize_Document',
            detail: this.previewService.getAuditPreviewDetail(record.id, this.searchService.query, record, this.searchService.results?.id)
          }))
        )
      }
    }
    this.passageId = passageId?.toString();
    if (this.passageId) {
      if (this.previewFacet && this.passagesList) {
        this.previewFacet.setView(this.passagesList);
      }
    }
    if (this.ui.screenSizeIsLessOrEqual('md')) {
      this.showFilters = false; // Hide filters on small screens if a document gets opened
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
      this.openedDocChat = undefined;
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
      this.openedDocChat = undefined;
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

  onTitleClick(value: {item: Answer | TopPassage, isLink: boolean}) {
    if (value.item.$record) {
      this.openPreviewIfNoUrl(value.item.$record, value.isLink);
    }
  }

  configPatchDone = false;

  get chatConfig(): ChatConfig {
    let config = this.prefs.get('chat-config') || {};
    if(!this.configPatchDone) {
      config = {
        ...defaultChatConfig,
        ...config
      };
      this.prefs.set('chat-config', config);
      this.configPatchDone = true;
    }
    return config;
  }

  attachDocument(record: Record, event: Event) {
    event.stopPropagation();
    if (record.$selected) {
      const attachment = this.chatService.attachments$.getValue().find(a => a.recordId === record.id);
      if (attachment) {
        this.chatService.removeAttachment(attachment);
        return;
      }
    }
    this.chatService.addDocument(record)
      .subscribe(a => this.chatService.addAttachments([a]));
  }

  attachPassage(passage: TopPassage, event: Event) {
    event.stopPropagation();
    this.chatService.addTopPassagesSync([passage]);
  }

  attachMatchingPassage(passage: MatchingPassage, event: Event, $record: Record) {
    event.stopPropagation();
    this.chatService.addPassagesSync([{$record, location: passage.location}]);
  }

  attachExtract(record: Record, extract: RelevantExtract, event: Event) {
    event.stopPropagation();
    this.chatService.addExtractsSync(record, [extract]);
  }

  attachAll(passages: TopPassage[]) {
    this.chatService.addTopPassagesSync(passages, []);
  }

  updateSelected(attachments: ChatAttachment[], results: Results | undefined) {
    if (results?.records) {
      for (let r of results.records) {
        r.$selected = !!attachments.find(a => a.recordId === r.id);
      }
    }
  }

}
