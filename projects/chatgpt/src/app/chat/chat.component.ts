import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChatAttachment, ChatService } from "./chat.service";
import { SavedChat } from "./saved-chat.service";

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
  left: number;
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
export class ChatComponent implements OnInit {
  @Input() config = defaultChatConfig;
  @Input() savedChat: SavedChat;

  @Output() data = new EventEmitter<OpenAIModelMessage>();
  @Output() messages = new EventEmitter<OpenAIModelMessage[]>();

  @ViewChild('questionInput') questionInput?: ElementRef<HTMLInputElement>;

  loading = false;
  loadingAnswer = false;
  messages$ = new BehaviorSubject<OpenAIModelMessage[] | undefined>(undefined);

  question = '';
  tokensPercentage = 0;
  tokensAbsolute = 0;
  tokens?: OpenAIModelTokens;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.fetchInitial();
    this.chatService.attachments$.subscribe(attachments => {
      this.updateTokensPercentage();
      this.questionInput?.nativeElement.focus();
      this.question = this.suggestQuestion(attachments);
    })
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
    let previousMessages = defaultHistory;
    if (this.savedChat) {
      previousMessages = [...this.savedChat.messages];
      previousMessages.pop();
    }
    const data = {
      ...this.config,
      previousMessages,
      promptInsertBeforePassages: this.savedChat ? undefined : this.config.initialPrompt,
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
    return this.chatService.fetch(data).subscribe(res => {
      this.setAttachments(res.messagesHistory);
      this.messages$.next(res.messagesHistory);
      this.data.emit(res.messagesHistory.at(-1));
      this.messages.emit(res.messagesHistory);
      this.loading = false;
      this.loadingAnswer = false;
      this.question = '';
      this.tokens = res.tokens;
      this.chatService.attachments$.next([]); // This updates the tokensPercentage
    });
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
}
