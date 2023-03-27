import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Action } from '@sinequa/components/action';
import { SearchService } from '@sinequa/components/search';
import { UserPreferences } from '@sinequa/components/user-settings';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { LoginService } from '@sinequa/core/login';
import { Results, Record, TopPassage, RelevantExtract, MatchingPassage } from '@sinequa/core/web-services';
import { map, Observable, tap } from 'rxjs';
import { FEATURES, METADATA } from '../../config';
import { ChatComponent, ChatAttachment, ChatService, SavedChat, ChatMessage, ChatConfig, defaultChatConfig } from '@sinequa/components/machine-learning';
import { AppSearchFormComponent } from '@sinequa/pepper/app/search-form/search-form.component';
import { UIService } from '@sinequa/components/utils';

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
    public ui: UIService
  ) { }


  ngOnInit(): void {
    this.setTitle('');
    // Subscribe to the search service to update the page title based on the searched text
    this.results$ = this.searchService.resultsStream.pipe(
      tap(() => this.setTitle(this.searchService.query.text || "")),
      tap(results => {
        results?.records.forEach(r => r.extracts?.forEach(ex => {
          ex.highlighted = ex.highlighted.replace(/{b}/g, '<b>').replace(/{nb}/g, '</b>');
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

  // Save chats

  toggleSavedChats() {
    this.settingsView = false;
    this.savedChatView = !this.savedChatView;
  }

  onChatData(messages: ChatMessage[]) {
    this.showChatActions = messages.length > 4;
  }

  openChat(chat: SavedChat) {
    this.savedChatView = false;
    this.chat = chat;
  }

  resetChat() {
    this.showChatActions = false;
    this.sqChat?.resetChat(true);
  }

  saveChat() {
    this.sqChat?.saveChat();
  }

}
