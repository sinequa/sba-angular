import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { JsonMethodPluginService, TopPassage } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { BehaviorSubject, map, tap } from "rxjs";

export interface SummarizerConfig {
  modelTemperature: number;
  modelTopP: number;
  modelMaxTokens: number;

  removeOverlap: boolean;
  removeDuplicates: boolean;
  promptInsertBeforePassages: string;
  promptInsertAfterPassages: string;
  extendBefore: number;
  extendAfter: number;
  topPassages: number;
}

export const defaultSummarizerConfig: SummarizerConfig = {
  extendBefore: 0,
  extendAfter: 0,
  removeOverlap: true,
  removeDuplicates: true,
  topPassages: 10,
  modelTemperature: 0.7,
  modelTopP: 1.0,
  modelMaxTokens: 512,
  promptInsertBeforePassages: "The below passages are extracts from documents returned by a search engine. Your job is to summarize these passages in order to provide an answer to the following query: {queryText}",
  promptInsertAfterPassages: ""
}

export type OpenAIModel = "OpenAITextDavinci3" | "OpenAIgpt35Turbo";

export type OpenAIModelMessage = {
  role: string;
  content: string;
  display: boolean;
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
        <p [innerHTML]="message.content | sqMarkdown" class="mb-0"></p>
      </li>
    </ng-container>

    <li class="list-group-item d-flex" [ngClass]="{'align-items-center': !loadingAnswer, 'border-bottom': loadingAnswer}">
      <span class="me-3">
        <i class="fas fa-2x fa-user-circle text-muted"></i>
      </span>
      <input type="text" class="form-control" placeholder="Your answer" autofocus
        [(ngModel)]="question"
        (keyup.enter)="submitQuestion()"
        (keyup.shift.enter)="submitQuestion()"
        *ngIf="!loadingAnswer">
      <span *ngIf="loadingAnswer">{{question}}</span>
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
  @Input() model: OpenAIModel = "OpenAIgpt35Turbo";

  @Output() data = new EventEmitter<OpenAIModelMessage>();

  loading = false;
  loadingAnswer = false;
  messages$ = new BehaviorSubject<OpenAIModelMessage[]|undefined>(undefined);

  question = '';

  constructor(
    public jsonMethodWebService: JsonMethodPluginService,
    public searchService: SearchService
  ){}

  ngOnChanges() {
    // Auto-migrate from older versions
    if(!this.config.modelMaxTokens) {
      Object.assign(this.config, defaultSummarizerConfig);
    }

    if(this.passages) {
      this.fetchData(this.passages);
    }
    else {
      this.messages$.next(undefined);
      this.loading = false;
    }
  }

  submitQuestion() {
    if(this.question.trim() && this.messages$.value) {
      this.fetchAnswer(this.question.trim(), this.messages$.value);
    }
  }

  private fetchData(passages: TopPassage[]): void {
    this.loading = true;
    const queryText = this.searchService.query.text || '';
    const data = {
      ...this.config,
      promptInsertBeforePassages: this.config.promptInsertBeforePassages.replace(/{queryText}/g, queryText),
      promptInsertAfterPassages: this.config.promptInsertAfterPassages.replace(/{queryText}/g, queryText),

      queryText,
      passages: passages.map(p => ({docId: p.recordId, passageIndex: p.id, index: p.index}))
    }
    this.jsonMethodWebService.post(this.model, data).pipe(
      map((res: {messagesHistory: OpenAIModelMessage[]}) => res.messagesHistory),
      tap(res => this.messages$.next(res)),
      tap(res => this.data.emit(res.at(-1))),
      tap(() => this.loading = false)
    ).subscribe();
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
    this.jsonMethodWebService.post(this.model, data).pipe(
      map((res: {messagesHistory: OpenAIModelMessage[]}) => res.messagesHistory.filter(m => m.display)),
      tap(res => this.messages$.next(res)),
      tap(res => this.data.emit(res.at(-1))),
      tap(() => this.loadingAnswer = false),
      tap(() => this.question = '')
    ).subscribe();
  }
}
