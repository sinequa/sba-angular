import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { ChatComponent, ChatConfig, ChatMessage, ChatService, defaultChatConfig, InitChat } from "@sinequa/components/machine-learning";
import { SearchService } from "@sinequa/components/search";
import { UserPreferences } from "@sinequa/components/user-settings";
import { AppService } from "@sinequa/core/app-utils";
import { AuditWebService, Results } from "@sinequa/core/web-services";
import { marked } from "marked";
import { filter, map, Subscription, switchMap, tap } from "rxjs";
import { PromptService } from "../prompt.service";

interface ChatSuggestion {
  query?: string,
  sources?: string[],
  answer?: string
}

@Component({
  selector: "sq-assistant",
  template: `
  <sq-facet-card [title]="'Assistant'" [icon]="'fas fa-fw  fa-comments primary-icon'" [collapsible]="false" [actions]="[chatSettingsAction]" class="mb-3">
    <sq-chat #facet *ngIf="!chatSettingsAction.selected"
      [chat]="initChat"
      [displayAttachments]="false"
      [textBeforeAttachments]="chatConfig.textBeforeAttachments"
      [displayAttachments]="chatConfig.displayAttachments"
      [temperature]="chatConfig.temperature"
      [topP]="chatConfig.topP"
      [maxTokens]="chatConfig.maxTokens"
      [initialSystemPrompt]="chatConfig.initialSystemPrompt"
      [initialUserPrompt]="chatConfig.initialUserPrompt"
      [addAttachmentPrompt]="chatConfig.addAttachmentPrompt"
      [addAttachmentsPrompt]="chatConfig.addAttachmentsPrompt"
      [attachmentsHiddenPrompt]="chatConfig.attachmentsHiddenPrompt"
      [autoSearchMinScore]="chatConfig.autoSearchMinScore"
      [autoSearchMaxPassages]="chatConfig.autoSearchMaxPassages"
      [model]="chatConfig.model"
      (data)="summarizeAction.disabled = false">
    </sq-chat>
    <sq-chat-settings *ngIf="chatSettingsAction.selected" [config]="chatConfig"></sq-chat-settings>
  </sq-facet-card>
  `
})
export class AssistantComponent implements AfterViewInit, OnDestroy {

  sub = new Subscription();

  public summarizeAction: Action;
  public chatSettingsAction: Action;

  @ViewChild(ChatComponent) chat: ChatComponent;
  @ViewChild('suggestionTpl') suggestionTpl: TemplateRef<any>;

  initChat: InitChat|null = {messages: []};

  constructor(
    public searchService: SearchService,
    public promptService: PromptService,
    public chatService: ChatService,
    public appService: AppService,
    public prefs: UserPreferences,
    public auditService: AuditWebService
  ) {

    this.summarizeAction = new Action({
      text: "Answer with ChatGPT",
      action: () => {
        const passages = this.searchService.results?.topPassages?.passages;
        if(passages?.length) {
          const messages = [
            {role: 'system', display: false, content: this.promptService.getPrompt('answerPrompt')}
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
  }

  ngAfterViewInit() {
    this.sub.add(
      // Listen to query changes
      this.searchService.queryStream.pipe(
        // Only process the distinct full text search
        map(query => query?.text),
        filter((text): text is string => !!text),

        // Display the loading spinner
        tap(() => this.chat.loading = true),
        tap(() => this.chat.cdr.detectChanges()),

        // Prompt GPT-4 for query improvements and a first answer
        switchMap(content =>
          this.chatService.fetch([
            {role: 'system', content: this.promptService.getPrompt("searchPrompt"), display: false, $content: ''},
            {role: 'user', content, display: false, $content: ''},
          ], 'GPT4-8K', 0.8, 500, 1.0)
        ),

        // Turn off spinner
        tap(() => this.chat.loading = false),
        tap(() => this.chat.cdr.detectChanges()),

        // Parse the output of GPT-4
        map(res => {
          const message = res.messagesHistory.at(-1)!.content;
          const match = message.match(/\{[^]*\}/gm)?.at(0);
          if(match) {
            try {
              const sug = JSON.parse(match) as ChatSuggestion;
              if(sug.answer) {
                sug.answer = marked(sug.answer);
              }
              if(sug.query === this.searchService.query.text) {
                delete sug.query;
              }
              return sug;
            }
            catch(e) {
              console.error(e);
            }
          }
          return undefined;
        }),

        // Stop there if there is no suggestion
        filter((suggestions): suggestions is ChatSuggestion => !!suggestions),

        // Take the suggestions and format them as messages
        tap((suggestions: ChatSuggestion) => {
          // Content matters for the conversation follow-up
          const messages: ChatMessage[] = this.chat.messages$.value || [];

          // The starting point: a user's search query
          const query = `I am searching for "${this.searchService.query.text}" in a search engine.`;
          messages.push({role: 'user', content: query, display: false, $content: query});

          // Provide an answer, if any
          if(suggestions.answer) {
            messages.push({role: 'assistant', content: suggestions.answer, display: true, $content: marked(suggestions.answer)});
          }

          if(suggestions.query || suggestions.sources) {
            let content = "";

            if(suggestions.query) {
              content += `How about rewriting your query as \`${suggestions.query}\` for better results?\n\n`;
            }

            if(suggestions.sources) {
              content += `How about restricting your search to these sources: ${suggestions.sources.join(', ')}?\n\n`;
            }

            const $actions = [
              new Action({
                icon: 'fas fa-check',
                text: 'apply',
                action: () => {
                  this.applySuggestions(suggestions.query, suggestions.sources);
                  this.searchService.search();
                }
              })
            ];

            messages.push({role: 'assistant', content, display: true, $content: marked(content), $actions});
          }

          this.chat.updateData(messages, {used: 0, model: 4096});

        }),

        // If there are suggestions of query changes, re-run a search with these suggestions
        switchMap((suggestion: ChatSuggestion) => {
          if(suggestion.query || suggestion.sources) {
            this.chat.loading = true;
            this.chat.cdr.detectChanges();
            const query = this.searchService.query.copy();
            this.applySuggestions(suggestion.query, suggestion.sources, query);
            return this.searchService.getResults(query, undefined, {searchInactive: true}).pipe(
              tap(results => {
                if(results?.rowCount) {
                  // Content matters for the conversation follow-up
                  const messages: ChatMessage[] = this.chat.messages$.value || [];
                  const answer = `I found ${results.rowCount} documents by applying these suggestions, would like to display them?`;
                  const $actions = [
                    new Action({
                      icon: 'fas fa-check',
                      text: 'display',
                      action: action => {
                        this.setResults(results);
                        action.disabled = true;
                      }
                    })
                  ]
                  messages.push({role: 'assistant', content: answer, display: true, $content: answer, $actions});
                  this.chat.updateData(messages, this.chat.tokens!);
                }
                else {
                  this.chat.loading = false;
                  this.chat.cdr.detectChanges();
                }
              }),
            );
          }
          else {
            return this.searchService.resultsStream;
          }
        }),


        filter((results: Results|undefined): results is Results => !!results?.records.length),

        // Turn on spinner
        tap(() => this.chat.loading = true),
        tap(() => this.chat.cdr.detectChanges()),

        switchMap((results: Results) => results.topPassages?.passages?.length?
          this.chatService.addTopPassages(results.topPassages?.passages) :
          this.chatService.addDocuments(results.records.slice(0,5))
        ),
      ).subscribe((attachments: any) => {
        if(attachments?.length) {
          const messages = this.chat.messages$.value || [];
          messages.push(...this.chatService.prepareAttachmentMessages(attachments, [], false));
          messages.push(
            {role: 'user', content: this.promptService.getPrompt("answer2Prompt"), display: false, $content: ''}
          );
          this.chat.fetch(messages);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  applySuggestions(text: string|undefined, sources: string[]|undefined, query = this.searchService.query) {
    if(text) {
      query.text = text;
    }
    if(sources) {
      console.log(sources);
    }
  }

  setResults(results: Results) {
    this.searchService.setResults(results);
  }


  configPatchDone = false;

  get chatConfig(): ChatConfig {
    let config = this.prefs.get('chat-config') || {};
    if(!this.configPatchDone) {
      let defaultChatConfigOverride = this.appService.app?.data?.chatConfig;
      if(typeof defaultChatConfigOverride !== 'object') {
        defaultChatConfigOverride = {};
      }
      config = {
        ...defaultChatConfig,
        ...defaultChatConfigOverride,
        ...config
      };
      this.prefs.set('chat-config', config);
      this.configPatchDone = true;
    }
    return config;
  }
}
