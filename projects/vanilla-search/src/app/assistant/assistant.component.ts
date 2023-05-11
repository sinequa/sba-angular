import { AfterViewInit, Component, EventEmitter, OnDestroy, Output, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { ChatAttachment, ChatComponent, ChatConfig, ChatMessage, ChatService } from "@sinequa/components/machine-learning";
import { SearchService } from "@sinequa/components/search";
import { UserPreferences } from "@sinequa/components/user-settings";
import { AppService } from "@sinequa/core/app-utils";
import { AuditWebService, Results, Record } from "@sinequa/core/web-services";
import { marked } from "marked";
import { filter, map, Subscription, switchMap, tap } from "rxjs";
import { AssistantService } from "./assistant.service";

interface ChatSuggestion {
  query?: string,
  sources?: string[],
  answer?: string
}

@Component({
  selector: "sq-assistant",
  templateUrl: "./assistant.component.html"
})
export class AssistantComponent implements AfterViewInit, OnDestroy {

  @Output() referenceClicked = new EventEmitter<{record: Record, isLink: boolean}>();

  sub = new Subscription();

  chatSettingsAction: Action;
  autoModeAction: Action;

  autoMode = true;

  @ViewChild(ChatComponent) chat: ChatComponent;

  constructor(
    public searchService: SearchService,
    public assistantService: AssistantService,
    public chatService: ChatService,
    public appService: AppService,
    public prefs: UserPreferences,
    public auditService: AuditWebService
  ) {

    this.autoModeAction = new Action({
      icon: 'fas fa-pause',
      title: 'Stop the assistant from responding automatically',
      action: action => action.selected = !action.selected,
    });

    this.chatSettingsAction = new Action({
      icon: 'fas fa-cog',
      title: 'Settings',
      action: action => {
        action.selected = !action.selected;
        if(!action.selected) {
          this.assistantService.saveChatConfig();
        }
      }
    });
  }

  ngAfterViewInit() {
    this.sub.add(this.initializeMeeseeksMode());
    this.sub.add(this.initializeAutoAnswerMode());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onReferenceClicked(record: Record) {
    const isLink = !!(record.url1 || record.originalUrl);
    this.referenceClicked.emit({record, isLink});
  }

  initializeMeeseeksMode() {

    // Listen to query changes
    return this.searchService.queryStream.pipe(
      filter(() => this.assistantService.assistantMode === 'Meeseeks'),
      filter(() => !this.autoModeAction.selected),

      // Only process the distinct full text search
      map(query => query?.text),
      filter((text): text is string => !!text),

      // Cancel default chat and display the spinner
      tap(() => {
        this.chat.resetChat();
        this.chat.loading = true;
        this.chat.cdr.detectChanges();
      }),

      // Prompt GPT-4 for query improvements and a first answer
      switchMap(content =>
        this.chatService.fetch([
          {role: 'system', content: this.assistantService.getPrompt("searchPrompt"), display: false, $content: ''},
          {role: 'user', content, display: false, $content: ''},
        ], 'GPT4-8K', 0.8, 500, 1.0)
      ),

      // Parse the output of GPT-4
      map(res => {
        const message = res.messagesHistory.at(-1)!.content;
        const match = message.match(/\{[^]*\}/gm)?.at(0);
        if(match) {
          try {
            const sug = JSON.parse(match) as ChatSuggestion;
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

      // Turn off spinner
      tap(suggestions => {
        this.chat.loading = false;
        this.chat.cdr.detectChanges();
        if(!suggestions) {
          this.chat.loadDefaultChat();
        }
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
                const answer = `I found ${results.rowCount} documents by applying these suggestions, would you like to display them?`;
                const $actions = [
                  new Action({
                    icon: 'fas fa-check',
                    text: 'display',
                    action: action => {
                      this.searchService.setResults(results);
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

      // Stop there if no results
      filter((results: Results|undefined): results is Results => !!results?.records.length),

      // Turn on spinner
      tap(() => {
        this.chat.loading = true;
        this.chat.cdr.detectChanges()
      }),

      // Build attachments from the results
      switchMap((results: Results) =>
        this.chatService.searchAttachments(results,
          this.assistantService.chatConfig.autoSearchMinScore,
          this.assistantService.chatConfig.autoSearchMaxPassages,
          this.assistantService.chatConfig.autoSearchMaxDocuments,
          this.assistantService.chatConfig.autoSearchExpand,
          this.assistantService.chatConfig.autoSearchExpand * 2
        )
      )

    ).subscribe((attachments: any) => {
      if(attachments?.length) {
        // Finally feed the chat with the attachments and ask it to provide an answer
        this.chat.fetch([
          {role: 'system', content: this.assistantService.chatConfig.initialSystemPrompt, display: false, $content: ''},
          ...(this.chat.messages$.value || []),
          ...this.chatService.prepareAttachmentMessages(attachments, [], false),
          {role: 'user', content: this.assistantService.getPrompt("answer2Prompt"), display: false, $content: ''}
        ]);
      }
    });
  }

  initializeAutoAnswerMode() {
    return this.searchService.resultsStream.pipe(
      filter(() => this.assistantService.assistantMode === 'Auto-Answer'),
      filter(() => !this.autoModeAction.selected),
      filter((results): results is Results => !!results),

      // Cancel default chat and display the spinner
      tap(() => {
        this.chat.resetChat();
        this.chat.loading = true;
        this.chat.cdr.detectChanges();
      }),

      // Build attachments from the results
      switchMap((results: Results) =>
        this.chatService.searchAttachments(results,
          this.assistantService.chatConfig.autoSearchMinScore,
          this.assistantService.chatConfig.autoSearchMaxPassages,
          this.assistantService.chatConfig.autoSearchMaxDocuments,
          this.assistantService.chatConfig.autoSearchExpand,
          this.assistantService.chatConfig.autoSearchExpand * 2
        )
      )

    ).subscribe((attachments: ChatAttachment[]) => {
      if(attachments?.length) {
        // Finally feed the chat with the attachments and ask it to provide an answer
        const sysPrompt = this.assistantService.chatConfig.initialSystemPrompt;
        const ansPrompt = this.assistantService.getPrompt("answerPrompt");
        const content = `${sysPrompt}. ${ansPrompt}`;
        this.chat.fetch([
          {role: 'system', content, display: false, $content: ''},
          ...this.chatService.prepareAttachmentMessages(attachments, [], false)
        ]);
      }
    });
  }

  applySuggestions(text: string|undefined, sources: string[]|undefined, query = this.searchService.query) {
    if(text) {
      query.text = text;
    }

    if(sources) {
      query.removeFieldFilters("treepath");
      const values = sources.flatMap(source => {
        switch(source) {
          case 'doc':      return ['Documentation', 'University']
          case 'support':  return ['Sinequa_Overflow']
          case 'files':    return ['Sinequa_GoogleDrive']
          case 'internet': return ['Sinequa.com', 'Wikipedia']
          case 'intranet': return ['Loopio']
        }
        return [];
      });

      if(values.length) {
        query.addFilter({
          operator: 'or',
          filters: values.map(display => ({field: 'treepath', display, value: `/${display}/*`}))
        });
      }
    }
  }

  get chatConfig() : ChatConfig {
    return this.assistantService.chatConfig;
  }

}
