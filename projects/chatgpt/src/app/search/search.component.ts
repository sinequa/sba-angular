import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';
import { UserPreferences } from '@sinequa/components/user-settings';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { LoginService } from '@sinequa/core/login';
import { Results, Record, TopPassage, RelevantExtract } from '@sinequa/core/web-services';
import { map, Observable, tap } from 'rxjs';
import { FEATURES, METADATA } from '../../config';
import { ChatComponent, ChatAttachment, ChatService, SavedChat, ChatMessage } from '@sinequa/components/machine-learning';
import { AppSearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  results$: Observable<Results | undefined>;

  showSearchPanel = false;

  // Passages
  passages$: Observable<TopPassage[]>;
  documentsNb: number;
  loading = false;

  @ViewChild(AppSearchFormComponent) searchForm: AppSearchFormComponent;
  @ViewChild(ChatComponent) sqChat: ChatComponent;

  // Chat options
  settingsView = false;
  savedChatView = false;
  showChatActions = false;
  chat?: SavedChat;

  openedDoc: Record|undefined;

  get neuralSearchEnabled() {
    return this.appService.isNeural() && this.searchService.query.neuralSearch !== false;
  }

  get view(): 'documents' | 'passages' {
    if (!this.neuralSearchEnabled) {
      return 'documents';
    }
    return this.prefs.get('search-view') || 'documents';
  }

  set view(view: string) {
    console.log('view', view);
    this.prefs.set('search-view', view);
  }

  previewCustomActions = [
    new Action({
      icon: 'fas fa-times',
      action: () => this.openedDoc = undefined
    })
  ]

  constructor(
    public loginService: LoginService,
    public searchService: SearchService,
    public appService: AppService,
    public titleService: Title,
    public intlService: IntlService,
    public chatService: ChatService,
    public prefs: UserPreferences,
  ) { }


  ngOnInit(): void {
    this.setTitle('');
    // Subscribe to the search service to update the page title based on the searched text
    this.results$ = this.searchService.resultsStream.pipe(
      tap(() => this.setTitle(this.searchService.query.text || "")),
      tap(results => {
        results?.records.forEach(r => r.extracts?.forEach(ex => {
          ex.highlighted = ex.highlighted.replace(/{b}/g, '<b>').replace(/{nb}/g, '</b>');
          ex['$record'] = r;
        }))
      }),
      tap(res => {
        const passages = res?.topPassages?.passages || [];
        const ids = passages.filter(p => !p.$record).map(p => p.recordId);
        this.loading = true;
        this.passages$ = this.searchService.getRecords(ids).pipe(
          map(records => {
            passages.sort(this.comparePassages);

            passages.forEach((passage) => {
              passage.$record = passage.$record || records.find(record => record?.id === passage.recordId);
              passage.$checked = true;
            });

            // Set the numbers of unique documents
            const uniqueRecords = [...new Set(passages.map(p => p.recordId))];
            this.documentsNb = uniqueRecords.length;
            this.loading = false;
            return passages;
          })
        )
      }),
      tap((results) => this.updateSelected(this.chatService.attachments$.value, results))
    );

    this.chatService.attachments$.subscribe(attachments => this.updateSelected(attachments, this.searchService.results));
  }

  /**
   * Update page title
   */
  setTitle(search: string) {
    this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", { search }));
  }

  attachDocument(record: Record, event: Event) {
    event.stopPropagation();
    if (record.$selected) {
      const attachments = this.chatService.attachments$.value;
      const i = attachments.findIndex(a => a.type === 'document' && a.recordId === record.id);
      if (i !== -1) {
        attachments.splice(i, 1);
        this.chatService.attachments$.next(attachments);
        return;
      }
    }
    this.chatService.addDocument(record, this.searchService.query);
  }

  attachPassage(passage: TopPassage, event: Event, record?: Record) {
    event.stopPropagation();
    if(record) {
      passage.$record = record;
    }
    this.chatService.addPassages([passage], this.searchService.query);
  }

  attachExtract(extract: RelevantExtract, event: Event) {
    event.stopPropagation();
    this.chatService.addExtracts([extract], this.searchService.query);
  }

  attachAll(passages: TopPassage[]) {
    this.chatService.addPassages(passages, this.searchService.query);
  }

  updateSelected(attachments: ChatAttachment[], results: Results | undefined) {
    if (results?.records) {
      for (let r of results.records) {
        r.$selected = !!attachments.find(a => a.type === 'document' && a.recordId === r.id);
      }
    }
  }


  /**
   * Open the search form to add/remove filters
   */
  editFilters() {
    // setTimeout is need to come after the "click outside" event that collapses the search form
    setTimeout(() => this.searchForm.searchForm.expand());
    return false;
  }

  openPreview(record: Record) {
    this.openedDoc = record;
  }

  /**
   * Returns the list of features activated in the top right menus.
   * The configuration from the config.ts file can be overriden by configuration from
   * the app configuration on the server
   */
  public get features(): string[] {
    return this.appService.app?.data?.features as string[] || FEATURES;
  }

  public get metadata(): string[] {
    return this.appService.app?.data?.metadata as string[] || METADATA;
  }

  /**
   * Whether the UI is in dark or light mode
   */
  isDark(): boolean {
    return document.body.classList.contains("dark");
  }


  // sort passages to have the ones with an answer first, ordered by answer score
  private comparePassages(a: TopPassage, b: TopPassage) {
    const aAnswer: boolean = !!a.answer && !!a.answerScore;
    const bAnswer: boolean = !!b.answer && !!b.answerScore;
    if (aAnswer && !bAnswer) {
      return -1;
    }
    if (bAnswer && !aAnswer) {
      return 1;
    }
    if (aAnswer && bAnswer) {
      return a.answerScore! > b.answerScore! ? -1 : 1;
    }
    return 0;
  }

  // Chat settings

  toggleChatSettings() {
    this.settingsView = !this.settingsView;
    this.savedChatView = false;
    if (!this.settingsView) {
      this.prefs.set('chat-config', this.chatConfig);
    }
  }

  configPatchDone = false;

  get chatConfig() {
    let config = this.prefs.get('chat-config') || {};
    if(!this.configPatchDone) {
      config = {
        modelTemperature: 1.0, // Introduce new options
        modelTopP: 1.0,
        modelMaxTokens: 800,
        addAttachmentPrompt: "Summarize this document",
        addAttachmentsPrompt: "Summarize these documents",
        initialUserPrompt: "Hello, I am a user of the Sinequa search engine",
        textBeforeAttachments: false,
        ...config
      };
      this.prefs.set('chat-config', config);
      this.configPatchDone = true;
    }
    return config;
  }

  // Save chats

  toggleSavedChats() {
    this.settingsView = false;
    this.savedChatView = !this.savedChatView;
  }

  onChatData(messages: ChatMessage[]) {
    this.showChatActions = messages.length > 4;
    this.chat = undefined;
  }

  openChat(chat: SavedChat) {
    this.savedChatView = false;
    this.chat = chat;
  }

  resetChat() {
    this.showChatActions = false;
    this.sqChat?.fetchInitial();
  }

  saveChat() {
    this.sqChat?.saveChat();
  }

}
