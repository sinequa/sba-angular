import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { JsonMethodPluginService, TopPassage } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { BehaviorSubject, map, tap } from "rxjs";

export interface SummarizerConfig {
  extendBefore: number;
  extendAfter: number;
  modelTemperature: number;
  promptBefore: string;
  promptAfter: string;
}

export const defaultConfig: SummarizerConfig = {
  extendBefore: 0,
  extendAfter: 0,
  modelTemperature: 0.7,
  promptBefore: "The below passages are extracts from documents returned by a search engine. Your job is to summarize these passages in order to provide an answer to the following query: {queryText}",
  promptAfter: ""
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
        <span class="col-2 fw-bold text-end pe-3">{{message.role | titlecase}}</span>
        <p [innerHTML]="message.content" class="col-10 mb-0"></p>
      </li>
    </ng-container>

    <li class="list-group-item d-flex" [ngClass]="{'align-items-center': !loadingAnswer, 'border-bottom': loadingAnswer}">
      <span class="col-2 fw-bold text-end pe-3">User</span>
      <input type="text" class="form-control" placeholder="Your answer" autofocus
        [(ngModel)]="question"
        (keyup.enter)="submitQuestion()"
        (keyup.shift.enter)="submitQuestion()"
        *ngIf="!loadingAnswer">
      <span class="col-10" *ngIf="loadingAnswer">{{question}}</span>
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
  @Input() config = defaultConfig;
  @Input() model: OpenAIModel = "OpenAIgpt35Turbo";

  @Output() data = new EventEmitter<OpenAIModelMessage>();

  loading = false;
  loadingAnswer = false;
  messages$ = new BehaviorSubject<OpenAIModelMessage[]|undefined>([]);

  question = '';

  constructor(
    public jsonMethodWebService: JsonMethodPluginService,
    public searchService: SearchService
  ){}

  ngOnChanges() {
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
    const data = {
      ...this.config,
      removeOverlap: true,
      removeDuplicates: true,
      promptInsertBeforePassages: this.config.promptBefore.replace(/{queryText}/g, this.searchService.query.text || ''),
      promptInsertAfterPassages: this.config.promptAfter.replace(/{queryText}/g, this.searchService.query.text || ''),
      queryText: this.searchService.query.text || '',
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
      promptInsertBeforePassages: question,
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
