import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { BehaviorSubject, delay, Subscription } from "rxjs";
import { ChatAttachment, ChatMessage, ChatService, OpenAIModelTokens, SavedChat } from "./chat.service";


@Component({
  selector: 'sq-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() chat?: SavedChat;
  @Input() searchMode = true;
  @Input() textBeforeAttachments = false;
  @Input() displayAttachments = true;
  @Input() temperature = 1.0;
  @Input() topP = 1.0;
  @Input() maxTokens = 800;
  @Input() initialSystemPrompt = "You are a helpful assistant";
  @Input() initialUserPrompt = "Hello, I am a user of the Sinequa search engine";
  @Input() addAttachmentPrompt = "Summarize this document";
  @Input() addAttachmentsPrompt = "Summarize these documents";
  @Output() data = new EventEmitter<ChatMessage[]>();

  @ViewChild('messageList') messageList?: ElementRef<HTMLUListElement>;
  @ViewChild('questionInput') questionInput?: ElementRef<HTMLInputElement>;

  loading = false;
  loadingAnswer = false;
  loadingAttachments = false;
  messages$ = new BehaviorSubject<ChatMessage[] | undefined>(undefined);

  question = '';
  searchBeforeSend = true;

  tokensPercentage = 0;
  tokensAbsolute = 0;
  tokens?: OpenAIModelTokens;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.searchBeforeSend = this.searchMode;
    if(this.chat) {
      this.openChat(this.chat);
    }
    else {
      this.fetchInitial();
    }
    this.sub.add(
      this.chatService.attachments$.subscribe(attachments => {
        this.loadingAttachments = false;
        this.updateTokensPercentage();
        this.question = this.suggestQuestion(attachments);
        setTimeout(() => this.questionInput?.nativeElement.focus());
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
      if(this.searchBeforeSend && attachments.length === 0) {
        this.loadingAttachments = true;
        this.searchBeforeSend = false;
        this.chatService.searchAttachments(this.question);
      }
      else {
        this.fetchAnswer(this.question.trim(), this.messages$.value, attachments);
      }
    }
  }

  updateTokensPercentage() {
    if (this.tokens) {
      const questionTokens = Math.floor(this.question.trim().length / 3.5);
      const attachments = this.chatService.attachments$.value;
      const attachmentTokens = attachments.reduce((prev, cur) => prev + cur.tokenCount, 0);
      this.tokensAbsolute = (this.tokens.used || 0) + questionTokens + attachmentTokens;
      this.tokensPercentage = Math.min(100, 100 * this.tokensAbsolute / (this.tokens.model - this.maxTokens));
    }
  }

  fetchInitial() {
    if (this.loading) return;
    this.loading = true;
    if(this.messages$.value) {
      this.messages$.next(undefined); // Reset chat
    }
    const messages: ChatMessage[] = [];
    if(this.initialSystemPrompt) {
      messages.push({role: 'assistant', display: false, content: this.initialSystemPrompt});
    }
    if(this.initialUserPrompt) {
      messages.push({role: 'user', display: true, content: this.initialUserPrompt});
    }
    this.fetch(messages);
  }

  private fetchAnswer(question: string, messages: ChatMessage[], attachments: ChatAttachment[]) {
    this.loadingAnswer = true;

    const attachmentMsg: ChatMessage[] = attachments.map($attachment => ({
      role: 'user',
      content: $attachment.$payload,
      display: true,
      $attachment
    }));

    const message = {role: 'user', content: question, display: true};
    if(this.textBeforeAttachments) {
      attachmentMsg.unshift(message);
    }
    else {
      attachmentMsg.push(message);
    }

    messages = [...messages, ...attachmentMsg];

    this.fetch(messages);
  }

  private fetch(messages: ChatMessage[]) {
    this.chatService.fetch(messages, 'GPT35Turbo', this.temperature, this.maxTokens, this.topP)
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

  saveChat() {
    if(this.messages$.value && this.tokens) {
      const messages = this.chatService.cleanAttachments(this.messages$.value);
      this.chatService.saveChat(messages, this.tokens);
    }
  }

  openChat(chat: SavedChat) {
    let tokens = chat.tokens;
    this.chatService.restoreAttachments(chat.messages)
      .pipe(delay(0)) // In case the observer completes synchronously, the delay forces async update and prevents "change after checked" error
      .subscribe(messages => this.updateData(messages, tokens))
  }

  onSearchBeforeSendChange(value: boolean) {
    setTimeout(() => this.questionInput?.nativeElement.focus());
  }
}
