import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SearchService } from '@sinequa/components/search';
import { UserPreferences } from '@sinequa/components/user-settings';
import { AppService } from '@sinequa/core/app-utils';
import { IntlService } from '@sinequa/core/intl';
import { LoginService } from '@sinequa/core/login';
import { Results, Record, TopPassage } from '@sinequa/core/web-services';
import { map, Observable, tap } from 'rxjs';
import { FEATURES } from '../../config';
import { defaultChatConfig } from '../chat/chat.component';
import { ChatService } from '../chat/chat.service';
import { AppSearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  results$: Observable<Results | undefined>;

  // Passages
  passages$: Observable<TopPassage[]>;
  documentsNb: number;
  loading = false;

  @ViewChild(AppSearchFormComponent) searchForm: AppSearchFormComponent;

  view: 'documents' | 'passages' = 'documents';

  // Chat options
  settingsView = false;

  constructor(
    public loginService: LoginService,
    public searchService: SearchService,
    public appService: AppService,
    public titleService: Title,
    public intlService: IntlService,
    public chatService: ChatService,
    public prefs: UserPreferences
  ){}


  ngOnInit(): void {
    this.setTitle('');
    // Subscribe to the search service to update the page title based on the searched text
    this.results$ = this.searchService.resultsStream.pipe(
      tap(() => this.setTitle(this.searchService.query.text || "")),
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
      })
    );
  }

  /**
   * Update page title
   */
  setTitle(search: string) {
    this.titleService.setTitle(this.intlService.formatMessage("msg#search.pageTitle", {search}));
  }

  attachDocument(record: Record, event: Event) {
    event.stopPropagation();
    this.chatService.addDocument(record, this.searchService.query);
  }

  attachPassage(passage: TopPassage, event: Event) {
    event.stopPropagation();
    this.chatService.addPassage(passage, this.searchService.query);
  }


  /**
   * Open the search form to add/remove filters
   */
  editFilters() {
    // setTimeout is need to come after the "click outside" event that collapses the search form
    setTimeout(() => this.searchForm.searchForm.expand());
    return false;
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

  toggleChatSettings() {
    this.settingsView = !this.settingsView;
    if(!this.settingsView) {
      this.prefs.set('chat-config', this.chatConfig);
    }
  }

  get chatConfig() {
    return this.prefs.get('chat-config') || defaultChatConfig;
  }
}