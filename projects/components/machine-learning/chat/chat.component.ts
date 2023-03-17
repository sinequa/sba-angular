import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from "@angular/core";
import { BehaviorSubject, delay, forkJoin, map, Observable, of, Subscription, switchMap } from "rxjs";
import { ChatAttachment, ChatAttachmentWithTokens, ChatMessage, ChatService, OpenAITokens, RawMessage } from "./chat.service";

export interface ChatConfig {
  searchMode: boolean;
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
}

export const defaultChatConfig: ChatConfig = {
  searchMode: true,
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
  autoSearchMaxPassages: 5
}

export interface InitChat {
  messages: RawMessage[];
  tokens?: OpenAITokens;
  attachments?: Observable<ChatAttachmentWithTokens>[];
}

@Component({
  selector: 'sq-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnChanges, OnDestroy {
  @Input() chat?: InitChat;
  @Input() searchMode =               defaultChatConfig.searchMode;
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

  constructor(
    public chatService: ChatService
  ) {
    this.sub.add(
      this.chatService.attachments$.subscribe(attachments => {
        this.loadingAttachments = false;
        this.updateTokensPercentage();
        this.question = this.suggestQuestion(attachments);
        setTimeout(() => this.questionInput?.nativeElement.focus());
      })
    );
  }

  ngOnChanges() {
    if(this.chat) {
      this.openChat(this.chat.messages, this.chat.tokens, this.chat.attachments);
    }
    else {
      this.resetChat(true)
    }
  }

  sub = new Subscription();
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
    if(this.question.trim()) {
      event?.preventDefault();
      this.loadingAttachments = true;
      this.chatService.searchAttachments(this.question, this.autoSearchMinScore, this.autoSearchMaxPassages);
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
    const attachmentMessages = this.chatService.prepareAttachmentMessages(attachments, conversation);
    const userMsg = this.chatService.processMessage({role: 'user', content: question, display: true}, conversation);
    if(this.attachmentsHiddenPrompt) {
      attachmentMessages.push(
        this.chatService.processMessage({role: 'user', content: this.attachmentsHiddenPrompt, display: false}, conversation)
      );
    }
    const messages = this.textBeforeAttachments?
        [...conversation, userMsg, ...attachmentMessages]
      : [...conversation, ...attachmentMessages, userMsg];
    this.fetch(messages);
    this.scrollDown();
  }

  private fetch(messages: ChatMessage[]) {
    this.chatService.fetch(messages, 'GPT35Turbo', this.temperature, this.maxTokens, this.topP)
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
      this.chatService.saveChat(this.messages$.value, this.tokens);
    }
  }

  openChat(messages: RawMessage[], tokens?: OpenAITokens, attachments$?: Observable<ChatAttachmentWithTokens>[]) {
    this.loading = true;
    this.resetChat();
    this.chatService.restoreAttachments(messages)
      .pipe(
        delay(0), // In case the observer completes synchronously, the delay forces async update and prevents "change after checked" error
        switchMap(messages => {
          if(!attachments$) return of(messages);
          return forkJoin(attachments$).pipe(
            map(attachments => [
              ...messages,
              ...this.chatService.prepareAttachmentMessages(attachments, messages)
            ])
          )
        })
      )
      .subscribe(messages => {
        if(messages.at(-1)?.role === 'user') {
          this.fetch(messages); // If the last message if from a user, an answer from ChatGPT is expected
        }
        else if(tokens) {
          this.updateData(messages, tokens); // If the last message if from the assistant, we can load the conversation right away
        }
      });
  }
}
