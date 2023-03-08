import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { ChatAttachment, ChatService } from "./chat.service";
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
  modelTemperature: 0.7,
  modelTopP: 1.0,
  modelMaxTokens: 512,
  initialPrompt: "Hello, I am a user of the Sinequa search engine",
  addAttachmentPrompt: "Summarize this document",
  addAttachmentsPrompt: "Summarize these documents"
}

export const defaultHistory: OpenAIModelMessage[] = [
  { role: 'system', display: false, content: 'You are a helpful assistant' },
]

export type OpenAIModelMessage = {
  role: string;
  content: string;
  display: boolean;
  $attachments?: OpenAIModelMessage[]
}

export type OpenAIModelTokens = {
  used: number;
  model: number;
}

export type OpenAIResponse = {
  messagesHistory: OpenAIModelMessage[];
  tokens: OpenAIModelTokens;
}

@Component({
  selector: 'sq-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() config = defaultChatConfig;
  @Output() data = new EventEmitter<OpenAIModelMessage[]>();

  @ViewChild('questionInput') questionInput?: ElementRef<HTMLInputElement>;

  loading = false;
  loadingAnswer = false;
  messages$ = new BehaviorSubject<OpenAIModelMessage[] | undefined>(undefined);

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
        this.questionInput?.nativeElement.focus();
        this.question = this.suggestQuestion(attachments);
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

  fetchInitial(previousMessages = defaultHistory, promptInsertBeforePassages = this.config.initialPrompt) {
    if (this.loading) return;
    this.loading = true;
    this.messages$.next(undefined);
    const data = {
      ...this.config,
      previousMessages,
      promptInsertBeforePassages,
      passages: [],
      queryText: '...'
    }
    this.fetch(data);
  }

  private fetchAnswer(question: string, previousMessages: OpenAIModelMessage[], attachments: ChatAttachment[]) {
    this.loadingAnswer = true;
    previousMessages = [
      ...previousMessages,
      ...attachments.map(a => ({
        role: 'user',
        content: a.payload,
        display: false
      }))
    ];
    const data = {
      ...this.config,
      promptInsertBeforePassages: question,
      promptInsertAfterPassages: '',

      previousMessages,
      passages: [],
      queryText: '...'
    }
    this.fetch(data);
  }

  private fetch(data: any) {
    return this.chatService.fetch(data).subscribe(
      res => this.updateData(res.messagesHistory, res.tokens)
    );
  }

  updateData(messages: OpenAIModelMessage[], tokens: OpenAIModelTokens) {
    this.setAttachments(messages);
    this.messages$.next(messages);
    this.data.emit(messages);
    this.loading = false;
    this.loadingAnswer = false;
    this.question = '';
    this.tokens = tokens;
    this.chatService.attachments$.next([]); // This updates the tokensPercentage
  }

  setAttachments(messages: OpenAIModelMessage[]) {
    let attachments: OpenAIModelMessage[] = [];
    for(let i=0; i<messages.length-1; i++) {
      const message = messages[i];
      if(message.role === 'user' && !message.display && !message.content.startsWith('From now on')) {
        attachments.push(message);
      }
      else if(message.role === 'user' && message.display && attachments.length) {
        message.$attachments = attachments;
        attachments = [];
      }
    }
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

  saveChat() {
    if(this.messages$.value && this.tokens) {
      this.savedChatService.saveChat(this.messages$.value, this.tokens);
    }
  }

  openChat(chat: SavedChat) {
    const messagesHistory = chat.messages;
    let tokens = chat.tokens;
    if(!tokens) {
      tokens = {
        model: 4096,
        used: messagesHistory.reduce((prev, cur) => prev+Math.floor(cur.content.length*3/4), 0)
      };
    }
    setTimeout(() => this.updateData(messagesHistory, tokens)); // setTimeout prevents change after checked error, because the (data) event emitters fires immediately during the creation of the component
    delete this.savedChatService.openChat;
  }
}
