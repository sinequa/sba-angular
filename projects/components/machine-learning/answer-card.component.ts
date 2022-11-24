import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { AbstractFacet } from '@sinequa/components/facet';
import { AppService } from "@sinequa/core/app-utils";
import { NotificationsService } from "@sinequa/core/notification";
import { Answer, AuditEvent, AuditEventType, AuditWebService, Results } from "@sinequa/core/web-services";
import { map, Observable, of } from "rxjs";

@Component({
  selector: 'sq-answer-card',
  templateUrl: 'answer-card.component.html',
  styles: [`
.card-body {
  cursor: pointer;

  &:hover {
    background-color: rgb(0,0,0,0.03);
  }
}

.passage-text {
  font-size: 0.875em;
}
  `]
})
export class AnswerCardComponent extends AbstractFacet implements OnChanges {
  @Input() results: Results;
  @Input() collapsed: boolean;
  @Input() showLikeButtons: boolean;
  @Output() previewOpened = new EventEmitter<Answer>();
  @Output() titleClicked = new EventEmitter<{ item: Answer, isLink: boolean }>();
  selectedAnswer: number;

  answer$: Observable<Answer>;

  get answers(): Answer[] {
    return this.results?.answers?.answers || [];
  }

  constructor(
    public searchService: SearchService,
    public appService: AppService,
    public auditService: AuditWebService,
    public notificationsService: NotificationsService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedAnswer = 0;
    this.setAnswer();
    const answers = changes.results?.currentValue?.answers?.answers;
    if (answers?.length) {
      this.notifyAnswerResult(answers);
    }
  }

  openPreview(answer: Answer) {
    this.notifyAnswerClick(answer);
    this.previewOpened.next(answer);
  }

  onTitleClicked(isLink: boolean, answer: Answer) {
    this.notifyAnswerClick(answer);
    this.titleClicked.next({ item: answer, isLink });
  }

  previous() {
    this.selectedAnswer = (this.selectedAnswer + this.answers.length - 1) % this.answers.length;
    this.setAnswer();
  }

  next() {
    this.selectedAnswer = (this.selectedAnswer + 1) % this.answers.length;
    this.setAnswer();
  }

  setAnswer() {
    const answer = this.answers[this.selectedAnswer];
    this.notifyAnswerDisplay(answer);
    if (!!answer.$record) {
      this.answer$ = of(answer);
    } else {
      // Get the missing record
      this.answer$ = this.searchService.getRecords([answer.recordId]).pipe(map(records => {
        answer.$record = records[0];
        return answer;
      }));
    }
  }

  likeAnswer(answer: Answer) {
    this.setLiked(answer, true);
  }

  dislikeAnswer(answer: Answer) {
    this.setLiked(answer, false);
  }

  private setLiked(answer: Answer, liked: boolean) {
    const type = liked ? AuditEventType.Answer_Liked : AuditEventType.Answer_Disliked;
    if (answer.$liked === liked) {
      answer.$liked = undefined;
      this.auditService.notify(this.makeAuditEvent(type + "_Cancelled", answer))
        .subscribe();
    }
    else {
      answer.$liked = liked;
      this.auditService.notify(this.makeAuditEvent(type, answer))
        .subscribe(() => this.notificationsService.success("Thank you for your feedback!"));
    }
  }

  private notifyAnswerClick(answer: Answer) {
    const auditEvent: AuditEvent = this.makeAuditEvent(AuditEventType.Answer_Click, answer);
    this.auditService.notify(auditEvent)
      .subscribe();
  }

  private notifyAnswerDisplay(answer: Answer) {
    const auditEvent: AuditEvent = this.makeAuditEvent(AuditEventType.Answer_Display, answer);
    this.auditService.notify(auditEvent)
      .subscribe();
  }

  private notifyAnswerResult(answers: Answer[]) {
    const auditEvents: AuditEvent[] = answers
      .map((answer: Answer, index) => this.makeAuditEvent(AuditEventType.Answer_Result, answer));
    this.auditService.notify(auditEvents)
      .subscribe();
  }

  private makeAuditEvent(type: string, answer: Answer): AuditEvent {
    const rank = this.answers.indexOf(answer);
    return {
      type,
      detail: {
        text: this.searchService.query.text,
        "answer.text": answer.text,
        "record.id": answer.recordId,
        "passage.id": answer.passage.id,
        "af.score": answer["af.score"],
        "rm.score": answer["rm.score"],
        rank
      }
    };
  }
}