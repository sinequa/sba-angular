import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, tap } from 'rxjs';
import { Action } from '@sinequa/components/action';
import { BsFacetCard, DEFAULT_FACET_COMPONENTS, FacetConfig, FacetViewDirective } from '@sinequa/components/facet';
import { PreviewDocument, PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { SelectionService } from '@sinequa/components/selection';
import { UIService } from '@sinequa/components/utils';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { LoginService } from '@sinequa/core/login';
import { Answer, AuditEventType, AuditWebService, Record, Results } from '@sinequa/core/web-services';
import { FacetParams, FACETS, FEATURES, METADATA } from '../../config';
import { TopPassage } from '@sinequa/core/web-services';
import { BsFacetDate } from '@sinequa/analytics/timeline';
import { ChatComponent, ChatConfig, ChatService, defaultChatConfig, InitChat } from '@sinequa/components/machine-learning';
import { UserPreferences } from '@sinequa/components/user-settings';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  // Document "opened" via a click (opens the preview facet)
  public openedDoc?: Record;
  public openedDocChat?: InitChat;

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
  public summarizeAction: Action;
  public chatSettingsAction: Action;

  public readonly facetComponents = {
      ...DEFAULT_FACET_COMPONENTS,
      "date": BsFacetDate
  }

  @ViewChild(ChatComponent) chat: ChatComponent;
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
    public chatService: ChatService,
    public prefs: UserPreferences,
    public ui: UIService,
  ) {

    this.summarizeAction = new Action({
      text: "Summarize",
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
            {role: 'system', display: false, content: 'Assistant helps Sinequa employees with their internal question'},
            {role: 'user', display: false, content: prompt}
          ];
          const attachments = this.chatService.getPassages(passages, this.searchService.query);
          this.chat.openChat(messages, undefined, attachments);
          this.summarizeAction.disabled = true;
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
            this.openedDocChat = undefined;
            this._showFilters = false;
          }
          this.hasAnswers = !!results?.answers?.answers?.length;
          this.hasPassages = !!results?.topPassages?.passages?.length;
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
  public get metadata(): string[] {
    return this.appService.app?.data?.metadata as string[] || METADATA;
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
    if(record.matchingpassages?.passages) {
      const passages = record.matchingpassages?.passages.slice(0,10).map(p => ({$record: record, location: p.location}))
      this.openedDocChat = {
        messages: [
          {role: 'system', display: false, content: `The following snippets are extracted from a document titled \"${record.title}\". Please summarize this document as best as possible, taking into account that the user's original search query was \"${this.searchService.query.text || ''}\".`}
        ],
        attachments: this.chatService.getPassages(passages, this.searchService.query)
      }
      const passage = record.matchingpassages.passages.find(p => p.id === passageId);
      if(passage) {
        this.chatService.addAttachments(
          this.chatService.getPassages([{$record: record, location: passage.location}], this.searchService.query)
        );
      }
    }
    if(passageId === undefined) {
      this.chatService.addAttachments(
        [this.chatService.getDocument(record, this.searchService.query)]
      );
    }
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
      this.openedDocChat = undefined;
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

  // Make sure the click is not meant to trigger an action
  private isClickAction(event: Event): boolean {
    const target = event.target as HTMLElement|null;
    return event.type !== 'click' || !!target?.matches("a, a *, input, input *, button, button *");
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
      this.openedDocChat = undefined;
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

  configPatchDone = false;

  get chatConfig(): ChatConfig {
    let config = this.prefs.get('chat-config') || {};
    if(!this.configPatchDone) {
      config = {
        ...defaultChatConfig,
        displayAttachments: false,
        ...config
      };
      this.prefs.set('chat-config', config);
      this.configPatchDone = true;
    }
    return config;
  }
}
