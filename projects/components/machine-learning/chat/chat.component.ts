import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "@sinequa/components/facet";
import { Utils } from "@sinequa/core/base";
import { BehaviorSubject, delay, map, Observable, of, Subscription, switchMap } from "rxjs";
import { ChatService } from "./chat.service";
import { ChatAttachment, ChatMessage, OpenAIModel, OpenAITokens, RawMessage } from "./types";

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
  model: OpenAIModel;
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
  attachmentsHiddenPrompt: "Refer to the above content in the form [id] (eg [2], [7])",
  autoSearchMinScore: 0.5,
  autoSearchMaxPassages: 5,
  model: 'GPT35Turbo'
}

export interface InitChat {
  messages: RawMessage[];
  tokens?: OpenAITokens;
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
  @Input() model =                    defaultChatConfig.model;
  @Input() showCredits = true;
  @Output() data = new EventEmitter<ChatMessage[]>();

  @ViewChild('messageList') messageList?: ElementRef<HTMLUListElement>;
  @ViewChild('questionInput') questionInput?: ElementRef<HTMLInputElement>;

  loading = false;
  loadingAnswer = false;
  loadingAttachments = false;
  messages$ = new BehaviorSubject<ChatMessage[] | undefined>(undefined);

  question = '';

  tokensPercentage = 0;
  tokensAbsolute = 0;
  tokens?: OpenAITokens;

  openChatAction: Action;
  _actions: Action[] = [];
  override get actions() { return this._actions; }

  sub = new Subscription();

  constructor(
    public chatService: ChatService
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
      action: () => this.resetChat(true)
    }));

    this._actions.push(new Action({
      icon: 'fas fa-save',
      title: 'Save chat',
      action: () => this.saveChat()
    }));

    this._actions.push(this.openChatAction);
  }

  ngOnChanges() {
    this.chatService.attachmentModel = this.model;
    if(this.chat) {
      this.openChat(this.chat.messages, this.chat.tokens, this.chat.attachments);
    }
    else {
      this.resetChat(true)
    }
    this.updateActions();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
      this.chatService.searchAttachmentsSync(this.question, this.autoSearchMinScore, this.autoSearchMaxPassages);
    }
  }

  updateTokensPercentage() {
    if (this.tokens) {
      const questionTokens = Math.floor(this.question.trim().length / 3.5);
      const attachments = this.chatService.attachments$.value;
      const attachmentTokens = attachments.reduce((prev, cur) => prev + cur.$tokenCount, 0);
      this.tokensAbsolute = (this.tokens.used || 0) + questionTokens + attachmentTokens;
      this.tokensPercentage = Math.min(100, 100 * this.tokensAbsolute / (this.tokens.model - this.maxTokens));
    }
  }

  private fetchAnswer(question: string, conversation: ChatMessage[], attachments: ChatAttachment[]) {
    this.loadingAnswer = true;
    const attachmentMessages = this.chatService.prepareAttachmentMessages(attachments, conversation, this.displayAttachments);
    const userMsg = this.chatService.processMessage({role: 'user', content: question, display: true}, conversation);
    if(this.attachmentsHiddenPrompt && attachmentMessages.length > 0) {
      attachmentMessages.push(
        this.chatService.processMessage({role: 'user', content: this.attachmentsHiddenPrompt, display: false}, conversation)
      );
    }
    const messages = this.textBeforeAttachments?
        [...conversation, userMsg, ...attachmentMessages]
      : [...conversation, ...attachmentMessages, userMsg];
    this.fetch(messages);
  }

  private fetch(messages: ChatMessage[]) {
    this.chatService.fetch(messages, this.model, this.temperature, this.maxTokens, this.topP)
      .subscribe(res => this.updateData(res.messagesHistory, res.tokens));
    this.scrollDown();
  }

  updateData(messages: ChatMessage[], tokens: OpenAITokens) {
    this.messages$.next(messages);
    this.data.emit(messages);
    this.loading = false;
    this.loadingAnswer = false;
    this.tokens = tokens;
    this.chatService.attachments$.next([]); // This updates the tokensPercentage
    this.question = '';
    this.scrollDown();
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

  resetChat(loadDefaultChat?: boolean) {

    if(this.messages$.value) {
      this.messages$.next(undefined); // Reset chat
    }
    this.question = '';
    this.tokensPercentage = 0;
    this.tokensAbsolute = 0;
    this.tokens = undefined;

    if(loadDefaultChat) {
      this.openChat([
        {role: 'system', content: this.initialSystemPrompt, display: false},
        {role: 'user', content: this.initialUserPrompt, display: true},
      ]);
    }
  }

  saveChat() {
    if(this.messages$.value && this.tokens) {
      this.chatService.saveChatModal(this.messages$.value, this.tokens);
    }
  }

  openChat(messages: RawMessage[], tokens?: OpenAITokens, attachments$?: Observable<ChatAttachment[]|ChatAttachment>) {
    this.loading = true;
    this.resetChat();
    this.chatService.restoreMessages(messages)
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
        if(messages.at(-1)?.role !== 'assistant') {
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
  }
}
