import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { JsonMethodPluginService, TopPassage } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { BehaviorSubject, map, Observable } from "rxjs";

export interface SummarizerConfig {
  modelTemperature: number;
  modelTopP: number;
  modelMaxTokens: number;

  promptProtection: boolean;

  summarizationModel: OpenAIModel;
  promptInsertBeforePassages: string;
  extendBefore: number;
  extendAfter: number;
  top: number;
}

export const defaultSummarizerConfig: SummarizerConfig = {
  modelTemperature: 1.0,
  modelTopP: 1.0,
  modelMaxTokens: 800,
  promptProtection: true,
  summarizationModel: 'Davinci3',
  promptInsertBeforePassages: `The below documents contains passages extracts returned by a search engine.
  Your job is two perform 3 tasks:
  1 - Try to answer the Query in one short sentence, you must add the reference to the document titles using markdown links. If you can't or don't have enough context or information from any documents to answer the query, just say so.
  2 - Summarize all the documents at once in the context of the Query, using between 6 to 12 sentences. You should always generate a summary, even though there is no reference to the query and add the reference to the document titles using markdown links.
  3 - After the summary, list all the documents in a list of bullet points titles using markdown links.
  Markdown links must use the document title and document URL and follow this syntax: [Document Title](Document URL).
  Query: {queryText}`,
  extendBefore: 0,
  extendAfter: 0,
  top: 10,
}

export type OpenAIModel = "Davinci3" | "GPT35Turbo";

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
  selector: 'sq-summary',
  template: `
  <div class="spinner-grow text-success d-block mx-auto my-5" role="status" *ngIf="loading">
    <span class="visually-hidden">Loading...</span>
  </div>

  <ul *ngIf="messages$ | async as messages" class="list-group list-group-flush">

    <ng-container *ngFor="let message of messages; let i = index">
      <li class="list-group-item border-bottom d-flex" *ngIf="message.display">
        <span class="me-3" [title]="message.role" [ngSwitch]="message.role">
          <i class="fas fa-2x fa-user-circle text-muted" *ngSwitchCase="'user'"></i>
          <i class="sq-chatgpt" [style.--sq-size.px]="28" *ngSwitchCase="'assistant'"></i>
        </span>
        <div [innerHTML]="message.content | sqMarkdown"></div>
      </li>
    </ng-container>

    <li class="d-block">
      <div class="progress" style="height: 3px;" *ngIf="!loadingAnswer">
        <div class="progress-bar" role="progressbar" [ngStyle]="{'width.%': tokensPercentage}" title="Tokens used {{tokensAbsolute}}/{{tokens?.model}}"></div>
      </div>
      <div class="list-group-item d-flex" [ngClass]="{'align-items-center': !loadingAnswer, 'border-bottom': loadingAnswer}">
        <span class="me-3">
          <i class="fas fa-2x fa-user-circle text-muted"></i>
        </span>
        <input type="text" class="form-control" placeholder="Your answer" autofocus
          [(ngModel)]="question"
          (ngModelChange)="updateTokensPercentage()"
          (keyup.enter)="submitQuestion()"
          (keyup.shift.enter)="submitQuestion()"
          [disabled]="tokensPercentage >= 100"
          *ngIf="!loadingAnswer">
        <span *ngIf="loadingAnswer">{{question}}</span>
      </div>
    </li>

    <li class="list-group-item" *ngIf="loadingAnswer">
      <div class="spinner-grow text-success d-block mx-auto my-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </li>
  </ul>
  `,
  styles: [`
  ul.list-group {
    max-height: 100vh;
    font-size: 0.875rem;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnChanges {
  @Input() passages?: TopPassage[];
  @Input() config = defaultSummarizerConfig;

  @Output() data = new EventEmitter<OpenAIModelMessage>();

  loading = false;
  loadingAnswer = false;
  messages$ = new BehaviorSubject<OpenAIModelMessage[]|undefined>(undefined);

  question = '';
  tokensPercentage = 0;
  tokensAbsolute = 0;
  tokens?: OpenAIModelTokens;

  constructor(
    public jsonMethodWebService: JsonMethodPluginService,
    public searchService: SearchService
  ){}

  ngOnChanges() {
    // Auto-migrate from older versions
    if(!this.config.summarizationModel) {
      Object.assign(this.config, defaultSummarizerConfig);
    }

    if(this.passages) {
      this.loading = true;
      this.messages$.next(undefined);
      this.summarize(this.passages);
    }
    else {
      this.messages$.next(undefined);
      this.loading = false;
    }
  }

  submitQuestion() {
    if(this.question.trim() && this.messages$.value) {
      this.loadingAnswer = true;
      this.chat(this.messages$.value, this.question.trim());
    }
  }

  updateTokensPercentage() {
    if(this.tokens) {
      const questionTokens = Math.floor(this.question.trim().length / 3.5);
      this.tokensAbsolute = (this.tokens.used || 0) + questionTokens + this.config.modelMaxTokens;
      this.tokensPercentage = Math.min(100, 100 * this.tokensAbsolute / this.tokens.model);
    }
  }

  updateData(res: OpenAIResponse) {
    this.messages$.next(res.messagesHistory);
    this.data.emit(res.messagesHistory.at(-1));
    this.loading = false;
    this.loadingAnswer = false;
    this.question = '';
    this.tokens = res.tokens;
    this.updateTokensPercentage();
  }

  public summarize(topPassages: TopPassage[]) {
    const queryText = this.searchService.query.text || '';
    const model = {
      model: this.config.summarizationModel,
      temperature: this.config.modelTemperature,
      generateTokens: this.config.modelMaxTokens,
      topP: this.config.modelTopP
    };
    const passages = {
      list: topPassages.map(p => ({docId: p.recordId, passageIndex: p.id, index: p.index})),
      extendBefore: this.config.extendBefore,
      extendAfter: this.config.extendAfter,
      top: this.config.top
    };
    const data = { action: 'summarize', model, queryText, passages, prompt: this.config.promptInsertBeforePassages };

    this.jsonMethodWebService.post('OpenAI', data)
      .subscribe(res => this.updateData(res));
  }

  public chat(messages: OpenAIModelMessage[], question: string) {
    const model = {
      model: this.config.summarizationModel,
      temperature: this.config.modelTemperature,
      generateTokens: this.config.modelMaxTokens,
      topP: this.config.modelTopP
    };
    const messagesHistory = [
      ...messages,
      {role: 'user', content: question, display: true}
    ];
    const data = { action: 'chat', model, promptProtection: this.config.promptProtection, messagesHistory };

    this.jsonMethodWebService.post('OpenAI', data)
      .subscribe(res => this.updateData(res));
  }

  public countTokens(text: string, model: OpenAIModel): Observable<number> {
    return this.jsonMethodWebService.post('OpenAI', {action: 'TokenCount', model, text}).pipe(
      map(res => res.tokens)
    )
  }
}
