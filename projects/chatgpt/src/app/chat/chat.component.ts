import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { BehaviorSubject, delay, Subscription } from "rxjs";
import { ChatAttachment, ChatMessage, ChatService, OpenAIModelTokens } from "./chat.service";
import { SavedChat, SavedChatService } from "./saved-chat.service";

export interface ChatConfig {
  modelTemperature: number;
  modelTopP: number;
  modelMaxTokens: number;
  initialPrompt: string;
  textBeforeAttachments?: boolean; // true = attachments after text, otherwise before
  addAttachmentPrompt: string;
  addAttachmentsPrompt: string;
}

export const defaultChatConfig: ChatConfig = {
  modelTemperature: 1.0,
  modelTopP: 1.0,
  modelMaxTokens: 800,
  initialPrompt: "Hello, I am a user of the Sinequa search engine",
  addAttachmentPrompt: "Summarize this document",
  addAttachmentsPrompt: "Summarize these documents"
}

export const defaultHistory: ChatMessage[] = [
  { role: 'system', display: false, content: 'You are a helpful assistant' },
]


@Component({
  selector: 'sq-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() config = defaultChatConfig;
  @Output() data = new EventEmitter<ChatMessage[]>();

  @ViewChild('messageList') messageList?: ElementRef<HTMLUListElement>;
  @ViewChild('questionInput') questionInput?: ElementRef<HTMLInputElement>;

  loading = false;
  loadingAnswer = false;
  messages$ = new BehaviorSubject<ChatMessage[] | undefined>(undefined);

  question = '';
  tokensPercentage = 0;
  tokensAbsolute = 0;
  tokens?: OpenAIModelTokens;

  constructor(
    public chatService: ChatService,
    public savedChatService: SavedChatService
  ) { }

  ngOnInit() {
    if(this.savedChatService.openChat) {
      this.openChat(this.savedChatService.openChat);
    }
    else {
      this.fetchInitial();
    }
    this.sub.add(
      this.chatService.attachments$.subscribe(attachments => {
        this.updateTokensPercentage();
        this.question = this.suggestQuestion(attachments);
        this.questionInput?.nativeElement.focus();
      })
    );
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

  updateTokensPercentage() {
    if (this.tokens) {
      const questionTokens = Math.floor(this.question.trim().length / 3.5);
      const attachments = this.chatService.attachments$.value;
      const attachmentTokens = attachments.reduce((prev, cur) => prev + cur.tokenCount, 0);
      this.tokensAbsolute = (this.tokens.used || 0) + questionTokens + attachmentTokens;
      this.tokensPercentage = Math.min(100, 100 * this.tokensAbsolute / (this.tokens.model - this.config.modelMaxTokens));
    }
  }

  fetchInitial() {
    if (this.loading) return;
    this.loading = true;
    if(this.messages$.value) {
      this.messages$.next(undefined); // Reset chat
    }
    const messages = [
      ...defaultHistory,
      {role: 'user', content: this.config.initialPrompt, display: true}
    ]
    this.fetch(messages);
  }

  private fetchAnswer(question: string, messages: ChatMessage[], attachments: ChatAttachment[]) {
    this.loadingAnswer = true;

    const attachmentMsg: ChatMessage[] = attachments.map(attachment => ({
      role: 'user',
      content: attachment.$payload,
      display: true,
      attachment
    }));

    const message = {role: 'user', content: question, display: true};
    if(this.config.textBeforeAttachments) {
      attachmentMsg.unshift(message);
    }
    else {
      attachmentMsg.push(message);
    }

    messages = [...messages, ...attachmentMsg];

    this.fetch(messages);
  }

  private fetch(messages: ChatMessage[]) {
    this.chatService.fetch(messages, this.config.modelTemperature, this.config.modelMaxTokens, this.config.modelTopP)
      .subscribe(res => this.updateData(res.messagesHistory, res.tokens));
    this.scrollDown();
  }

  updateData(messages: ChatMessage[], tokens: OpenAIModelTokens) {
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
      return this.config.addAttachmentPrompt || defaultChatConfig.addAttachmentPrompt;
    }
    else if(attachments.length > 1 && (this.question === '' || this.question === this.config.addAttachmentPrompt)) {
      return this.config.addAttachmentsPrompt || defaultChatConfig.addAttachmentsPrompt;
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

  saveChat() {
    if(this.messages$.value && this.tokens) {
      const messages = this.chatService.cleanAttachments(this.messages$.value);
      this.savedChatService.saveChat(messages, this.tokens);
    }
  }

  openChat(chat: SavedChat) {
    let tokens = chat.tokens;
    this.chatService.restoreAttachments(chat.messages)
      .pipe(delay(0)) // In case the observer completes synchronously, the delay forces async update and prevents "change after checked" error
      .subscribe(messages => this.updateData(messages, tokens))
    delete this.savedChatService.openChat;
  }
}
