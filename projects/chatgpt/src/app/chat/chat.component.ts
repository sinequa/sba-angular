import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { JsonMethodPluginService } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ChatAttachment, ChatService } from "./chat.service";

export interface ChatConfig {
  modelTemperature: number;
  modelTopP: number;
  modelMaxTokens: number;
  initialPrompt: string;
}

export const defaultChatConfig: ChatConfig = {
  modelTemperature: 0.7,
  modelTopP: 1.0,
  modelMaxTokens: 512,
  initialPrompt: "Hello, I am a user of the Sinequa search engine"
}

export const defaultHistory: OpenAIModelMessage[] = [
  {role: 'system', display: false, content: 'You are a helpful assistant'},
]

export type OpenAIModel = "OpenAITextDavinci3" | "OpenAIgpt35Turbo";

export type OpenAIModelMessage = {
  role: string;
  content: string;
  display: boolean;
  $attachments?: ChatAttachment[]
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
  @Input() model: OpenAIModel = "OpenAIgpt35Turbo";

  @Output() data = new EventEmitter<OpenAIModelMessage>();

  @ViewChild('questionInput') questionInput?: ElementRef<HTMLInputElement>;

  loading = false;
  loadingAnswer = false;
  messages$ = new BehaviorSubject<OpenAIModelMessage[]|undefined>(undefined);

  question = '';
  tokensPercentage = 0;
  tokensAbsolute = 0;
  tokens?: OpenAIModelTokens;

  constructor(
    public chatService: ChatService,
    public jsonMethodWebService: JsonMethodPluginService,
    public searchService: SearchService
  ){}

  ngOnInit() {
    this.fetchInitial();
    this.chatService.attachments$.subscribe(() => this.updateTokensPercentage())
  }

  submitQuestion() {
    if(this.question.trim() && this.messages$.value) {
      const attachments = this.chatService.attachments$.value;
      this.fetchAnswer(this.question.trim(), this.messages$.value, attachments);
    }
  }

  updateTokensPercentage() {
    if(this.tokens) {
      const questionTokens = Math.floor(this.question.trim().length / 3.5);
      const attachments = this.chatService.attachments$.value;
      const attachmentTokens = attachments.reduce((prev, cur) => prev + cur.tokenCount, 0);
      this.tokensAbsolute = (this.tokens.used || 0) + questionTokens + attachmentTokens;
      this.tokensPercentage = Math.min(100, 100 * this.tokensAbsolute / this.tokens.model);
    }
  }

  private fetchInitial() {
    this.loading = true;
    const data = {
      ...this.config,
      previousMessages: defaultHistory,
      promptInsertBeforePassages: this.config.initialPrompt,
      passages: [],
      queryText: '...'
    }
    this.fetch(data).subscribe();
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
    this.fetch(data, attachments).subscribe();
  }

  private fetch(data: any, attachments?: ChatAttachment[]): Observable<OpenAIResponse> {
    return this.jsonMethodWebService.post(this.model, data).pipe(
      tap((res: OpenAIResponse) => {
        const lastUserMessage = res.messagesHistory.at(-2);
        if(lastUserMessage) {
          lastUserMessage.$attachments = attachments;
        }
        this.messages$.next(res.messagesHistory);
        this.data.emit(res.messagesHistory.at(-1));
        this.loading = false;
        this.loadingAnswer = false;
        this.question = '';
        this.tokens = res.tokens;
        this.chatService.attachments$.next([]); // This updates the tokensPercentage
      })
    )
  }
}
