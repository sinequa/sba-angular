import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { JsonMethodPluginService } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ChatService } from "./chat.service";

export interface ChatConfig {
  modelTemperature: number;
  modelTopP: number;
  modelMaxTokens: number;
  initialPrompt: string;
  textBeforeAttachments?: boolean; // true = attachments after text, otherwise before
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
  }

  submitQuestion() {
    if(this.question.trim() && this.messages$.value) {
      this.fetchAnswer(this.question.trim(), this.messages$.value);
    }
  }

  updateTokensPercentage() {
    if(this.tokens) {
      const questionTokens = Math.floor(this.question.trim().length / 3.5);
      this.tokensAbsolute = (this.tokens.used || 0) + questionTokens;
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

  private fetchAnswer(question: string, previousMessages: OpenAIModelMessage[]) {
    this.loadingAnswer = true;
    const data = {
      ...this.config,
      promptInsertBeforePassages: question,
      promptInsertAfterPassages: '',

      previousMessages,
      passages: [],
      queryText: '...'
    }
    this.fetch(data).subscribe();
  }

  private fetch(data: any): Observable<OpenAIResponse> {
    return this.jsonMethodWebService.post(this.model, data).pipe(
      tap((res: OpenAIResponse) => {
        this.messages$.next(res.messagesHistory);
        this.data.emit(res.messagesHistory.at(-1));
        this.loading = false;
        this.loadingAnswer = false;
        this.question = '';
        this.tokens = res.tokens;
        this.updateTokensPercentage();
      })
    )
  }
}
