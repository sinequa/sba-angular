import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { Query } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { BehaviorSubject, delay, map, Observable, of, Subscription, switchMap } from "rxjs";
import { ChatService } from "./chat.service";
import { ChatAttachment, ChatMessage, GllmModel, GllmModelDescription, GllmTokens, RawMessage } from "./types";

export interface ChatConfig {
  textBeforeAttachments: boolean;
  displayAttachments: boolean;
  temperature: number;
  topP: number;
  maxTokens: number;
  initialSystemPrompt: string;
  initialUserPrompt: string;
  addAttachmentPrompt: string;
  addAttachmentsPrompt: string;
  attachmentsHiddenPrompt: string;
  autoSearchMinScore: number;
  autoSearchMaxPassages: number;
  autoSearchMaxDocuments: number;
  autoSearchExpand: number;
  model: GllmModel;
}

export const defaultChatConfig: ChatConfig = {
  textBeforeAttachments: false,
  displayAttachments: true,
  temperature: 1.0,
  topP: 1.0,
  maxTokens: 800,
  initialSystemPrompt: "You are a helpful assistant",
  initialUserPrompt: "Hello, I am a user of the Sinequa search engine",
  addAttachmentPrompt: "Summarize this document",
  addAttachmentsPrompt: "Summarize these documents",
  attachmentsHiddenPrompt: "You can refer to the above documents in the form: [id] (eg [2], [7])",
  autoSearchMinScore: 0.5,
  autoSearchMaxPassages: 5,
  autoSearchMaxDocuments: 3,
  autoSearchExpand: 1,
  model: 'GPT35Turbo'
}

export interface InitChat {
  messages: RawMessage[];
  tokens?: GllmTokens;
  attachments?: Observable<ChatAttachment[]|ChatAttachment>;
}

@Component({
  selector: 'sq-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent extends AbstractFacet implements OnChanges, OnDestroy {
  @Input() chat?: InitChat;
  @Input() enableChat = true;
  @Input() searchMode = false;
  @Input() textBeforeAttachments =    defaultChatConfig.textBeforeAttachments;
  @Input() displayAttachments =       defaultChatConfig.displayAttachments;
  @Input() temperature =              defaultChatConfig.temperature;
  @Input() topP =                     defaultChatConfig.topP;
  @Input() maxTokens =                defaultChatConfig.maxTokens;
  @Input() initialSystemPrompt =      defaultChatConfig.initialSystemPrompt;
  @Input() initialUserPrompt =        defaultChatConfig.initialUserPrompt;
  @Input() addAttachmentPrompt =      defaultChatConfig.addAttachmentPrompt;
  @Input() addAttachmentsPrompt =     defaultChatConfig.addAttachmentsPrompt;
  @Input() attachmentsHiddenPrompt =  defaultChatConfig.attachmentsHiddenPrompt;
  @Input() autoSearchMinScore =       defaultChatConfig.autoSearchMinScore;
  @Input() autoSearchMaxPassages =    defaultChatConfig.autoSearchMaxPassages;
  @Input() autoSearchMaxDocuments =   defaultChatConfig.autoSearchMaxDocuments;
  @Input() autoSearchExpand =         defaultChatConfig.autoSearchExpand;
  @Input() model =                    defaultChatConfig.model;
  @Input() showCredits = true;
  @Input() query?: Query;
  @Output() data = new EventEmitter<ChatMessage[]>();
  @Output() referenceClicked = new EventEmitter<Record>();

  @ViewChild('messageList') messageList?: ElementRef<HTMLUListElement>;
  @ViewChild('questionInput') questionInput?: ElementRef<HTMLInputElement>;

  loading = false;
  loadingAttachments = false;
  messages$ = new BehaviorSubject<ChatMessage[] | undefined>(undefined);

  question = '';

  tokensPercentage = 0;
  tokensAbsolute = 0;
  tokensQuota = 0;
  tokens?: GllmTokens;

  openChatAction: Action;
  _actions: Action[] = [];
  override get actions() { return this._actions; }

  sub = new Subscription();
  dataSubscription: Subscription | undefined;

  modelDescription: GllmModelDescription;
  assistantIcon: string;
  privacyUrl: string;

  constructor(
    public chatService: ChatService,
    public searchService: SearchService,
    public cdr: ChangeDetectorRef
  ) {
    super();
    this.sub.add(
      this.chatService.attachments$.subscribe(attachments => {
        this.loadingAttachments = false;
        this.updateTokensPercentage();
        this.question = this.suggestQuestion(attachments);
        setTimeout(() => this.questionInput?.nativeElement.focus());
      })
    );

    this.sub.add(
      this.chatService.savedChats$.subscribe(() => this.updateActions())
    )

    this.openChatAction = new Action({
      icon: 'fas fa-folder-open',
      title: 'Open Saved chat',
      children: []
    });

    this._actions.push(new Action({
      icon: 'fas fa-sync',
      title: 'Reset chat',
      action: () => this.loadDefaultChat()
    }));

    this._actions.push(new Action({
      icon: 'fas fa-save',
      title: 'Save chat',
      action: () => this.saveChat()
    }));

    this._actions.push(this.openChatAction);

    this.chatService.listModels().subscribe(models => {
      this.modelDescription = models.find(m => m.name === this.model)!;
      switch(this.modelDescription.provider) {
        case 'Google':
          this.assistantIcon = 'sq-google';
          break;
        case 'OpenAI':
          this.assistantIcon = 'sq-chatgpt';
          this.privacyUrl = 'https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy';
          break;
      }
    });
  }

  ngOnChanges() {
    this.chatService.attachmentModel = this.model;
    if(this.chat) {
      this.openChat(this.chat.messages, this.chat.tokens, this.chat.attachments);
    }
    else {
      this.loadDefaultChat();
    }
    this.updateActions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.dataSubscription?.unsubscribe();
  }

  submitQuestion() {
    if(this.question.trim() && this.messages$.value) {
      const attachments = this.chatService.attachments$.value;
      this.fetchAnswer(this.question.trim(), this.messages$.value, attachments);
    }
  }

  searchAttachments(event?: Event) {
    if(this.searchMode && this.question.trim()) {
      event?.preventDefault();
      this.loadingAttachments = true;
      const query = (this.query || this.searchService.query).copy();
      query.text = this.question;
      this.chatService.searchAttachmentsSync(query, this.autoSearchMinScore, this.autoSearchMaxPassages, this.autoSearchMaxDocuments, this.autoSearchExpand, 2 * this.autoSearchExpand);
    }
  }

  updateTokensPercentage() {
    if (this.tokens) {
      const questionTokens = Math.floor(this.question.trim().length / 3.5);
      const attachments = this.chatService.attachments$.value;
      const attachmentTokens = attachments.reduce((prev, cur) => prev + cur.$tokenCount, 0);
      this.tokensAbsolute = (this.tokens.used || 0) + questionTokens + attachmentTokens;
      this.tokensPercentage = Math.min(100, 100 * this.tokensAbsolute / (this.tokens.model - this.maxTokens));
      this.tokensQuota = this.tokens.quota? Math.min(100, Math.ceil(100 * this.tokens.quota.tokenCount / this.tokens.quota.periodTokens)) : 0;
    }
  }

  private fetchAnswer(question: string, conversation: ChatMessage[], attachments: ChatAttachment[]) {
    const attachmentMessages = this.getAttachmentMessages(conversation, attachments);
    const userMsg = this.chatService.processMessage({role: 'user', content: question, display: true}, conversation);
    const messages = this.textBeforeAttachments?
        [...conversation, userMsg, ...attachmentMessages]
      : [...conversation, ...attachmentMessages, userMsg];
    this.fetch(messages);
  }

  /**
   * Given a list of messages, fetch the server for a continuation and updates
   * the list of messages accordingly.
   * @param messages
   */
  public fetch(messages: ChatMessage[]) {
    this.loading = true;
    this.cdr.detectChanges();
    this.dataSubscription?.unsubscribe();
    this.dataSubscription = this.chatService.fetch(messages, this.model, this.temperature, this.maxTokens, this.topP)
      .subscribe(res => this.updateData(res.messagesHistory, res.tokens));
    this.scrollDown();
  }

  private getAttachmentMessages(conversation: ChatMessage[], attachments: ChatAttachment[], display = this.displayAttachments) {
    const attachmentMessages = this.chatService.prepareAttachmentMessages(attachments, conversation, display);
    if(this.attachmentsHiddenPrompt && attachmentMessages.length > 0) {
      attachmentMessages.push(
        this.chatService.processMessage({role: 'user', content: this.attachmentsHiddenPrompt, display: false}, conversation)
      );
    }
    return attachmentMessages;
  }

  updateData(messages: ChatMessage[], tokens: GllmTokens) {
    this.messages$.next(messages);
    this.data.emit(messages);
    this.loading = false;
    this.tokens = tokens;
    this.chatService.attachments$.next([]); // This updates the tokensPercentage
    this.question = '';
    this.scrollDown();
    this.dataSubscription = undefined;
  }

  suggestQuestion(attachments: ChatAttachment[]) {
    if(attachments.length === 1 && this.question === '') {
      return this.addAttachmentPrompt || this.question;
    }
    else if(attachments.length > 1 && (this.question === '' || this.question === this.addAttachmentPrompt)) {
      return this.addAttachmentsPrompt || this.question;
    }
    return this.question;
  }

  scrollDown() {
    setTimeout(() => {
      if(this.messageList?.nativeElement) {
        this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
      }
    });
  }

  resetChat() {
    if(this.messages$.value) {
      this.messages$.next(undefined); // Reset chat
    }
    this.loading = false;
    this.question = '';
    this.tokensPercentage = 0;
    this.tokensAbsolute = 0;
    this.tokens = undefined;
    this.dataSubscription?.unsubscribe();
  }

  loadDefaultChat() {
    this.openChat([
      {role: 'system', content: this.initialSystemPrompt, display: false},
      {role: 'user', content: this.initialUserPrompt, display: true},
    ]);
  }

  saveChat() {
    if(this.messages$.value && this.tokens) {
      this.chatService.saveChatModal(this.messages$.value, this.tokens);
    }
  }

  openChat(messages: RawMessage[], tokens?: GllmTokens, attachments$?: Observable<ChatAttachment[]|ChatAttachment>) {
    this.resetChat();
    this.loading = true;
    this.dataSubscription = this.chatService.restoreMessages(messages)
      .pipe(
        delay(0), // In case the observer completes synchronously, the delay forces async update and prevents "change after checked" error
        switchMap(messages => attachments$?.pipe( // Process the optional attachments
            map(attachments => Utils.asArray(attachments)),
            map(attachments => [
              ...messages,
              ...this.chatService.prepareAttachmentMessages(attachments, messages, false)
            ])
          ) ?? of(messages)
        )
      )
      .subscribe(messages => {
        const lastMessage = messages.at(-1);
        if(lastMessage && lastMessage.role !== 'assistant') {
          this.fetch(messages); // If the last message if from a user, an answer from ChatGPT is expected
        }
        else if(tokens) {
          this.updateData(messages, tokens); // If the last message if from the assistant, we can load the conversation right away
        }
      });
  }

  updateActions() {
    this.openChatAction.children = this.chatService.savedChats.map(chat => new Action({
      text: chat.name,
      action: () => this.openChat(chat.messages, chat.tokens)
    }));
    this.openChatAction.hidden = this.openChatAction.children.length === 0;
  }

  onReferenceClicked(record: Record, event: MouseEvent) {
    const url = record.url1 || record.originalUrl;
    if(!url) {
      event.preventDefault();
    }
    this.referenceClicked.emit(record);
  }
}
